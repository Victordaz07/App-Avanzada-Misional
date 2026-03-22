import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { StorageService } from '../utils/storage';
import { UserRoleKey, normalizeStoredRole, isValidRole, userRoleFromMemberStatus } from '../config/roles';
import {
  signUp,
  signIn,
  signOut as firebaseSignOut,
  signInWithGoogle as firebaseSignInWithGoogle,
  SignUpOptions,
} from '../services/firebase/authService';
import { getOrCreateProfile, getProfileByUid, sanitizeUniversalProfile } from '../services/firebase/userService';
import { syncPublicUserCard } from '../services/firebase/publicUserCardService';
import { UniversalUserProfile, XtgAppKey } from '../types/user';

// Try to get Firebase auth, but don't crash if not available
let firebaseAuth: any = null;
try {
  const { getFirebaseAuth } = require('../services/firebase/firebaseApp');
  firebaseAuth = getFirebaseAuth();
} catch (error) {
  console.warn('Firebase not initialized, running in offline mode');
}

interface AuthContextType {
  // Legacy role-based auth
  userRole: UserRoleKey | null;
  login: (role: UserRoleKey) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  
  // Firebase auth
  user: User | null;
  profile: UniversalUserProfile | null;
  
  // New auth methods with Firebase
  signUpWithEmail: (email: string, password: string, displayName?: string, isMember?: boolean) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  /** Reload profile from Firestore and sync local role from memberStatus */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRoleKey | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UniversalUserProfile | null>(null);

  const syncRoleFromProfile = (userProfile: UniversalUserProfile | null): void => {
    if (!userProfile) return;
    const role = userRoleFromMemberStatus(userProfile.memberStatus);
    StorageService.setItem('userRole', role);
    setUserRole(role);
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    try {
      const next = await getProfileByUid(user.uid);
      if (next) {
        const sanitized = sanitizeUniversalProfile(next);
        setProfile(sanitized);
        syncRoleFromProfile(sanitized);
      }
    } catch (e) {
      console.error('refreshProfile failed:', e);
    }
  };

  useEffect(() => {
    if (!profile) return;
    void syncPublicUserCard(profile).catch((e) => console.warn('syncPublicUserCard:', e));
  }, [profile]);

  // Listen for Firebase auth state changes
  useEffect(() => {
    if (!firebaseAuth) {
      loadStoredRole();
      return;
    }

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (!firebaseUser) {
        setProfile(null);
        await loadStoredRole();
        return;
      }

      try {
        const stored = StorageService.getItem('userRole');
        const hint = normalizeStoredRole(stored);
        const userProfile = await getOrCreateProfile(firebaseUser, mapRoleToApp(hint));
        const sanitized = sanitizeUniversalProfile(userProfile);
        setProfile(sanitized);
        syncRoleFromProfile(sanitized);
        console.log('✅ Profile loaded:', sanitized.xthegospelId);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Map role to app key
  const mapRoleToApp = (role: UserRoleKey | null): XtgAppKey => {
    switch (role) {
      case 'investigator':
        return 'investigator';
      case 'member':
        return 'member';
      default:
        return 'member';
    }
  };

  const clearDeprecatedMissionStorage = (): void => {
    StorageService.removeItem('@missionaryLeadershipRole');
    StorageService.removeItem('@missionaryLeadershipRoleChangeDate');
  };

  const loadStoredRole = async () => {
    try {
      setIsLoading(true);
      console.log('🔐 AuthContext: Cargando rol almacenado...');
      clearDeprecatedMissionStorage();
      const storedRoleRaw = StorageService.getItem('userRole');
      
      const normalizedRole = normalizeStoredRole(storedRoleRaw);
      
      if (normalizedRole) {
        if (normalizedRole !== storedRoleRaw) {
          console.log(`🔐 AuthContext: Migrando rol "${storedRoleRaw}" → "${normalizedRole}"`);
          StorageService.setItem('userRole', normalizedRole);
        }
        setUserRole(normalizedRole);
      }
    } catch (error) {
      console.error('❌ Error loading stored role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Legacy login (role selection only)
  const login = async (role: UserRoleKey) => {
    try {
      setIsLoading(true);
      if (!isValidRole(role)) {
        throw new Error(`Invalid role: ${role}`);
      }
      StorageService.setItem('userRole', role);
      setUserRole(role);
      
      // If user is logged in, update their profile with this app
      if (user && profile) {
        try {
          const { enableApp } = await import('../services/firebase/userService');
          await enableApp(user.uid, mapRoleToApp(role));
        } catch (error) {
          console.warn('Could not update user apps:', error);
        }
      }
    } catch (error) {
      console.error('Error saving role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email - creates Firebase account AND xTheGospel profile
  const signUpWithEmail = async (email: string, password: string, displayName?: string, isMember?: boolean) => {
    try {
      setIsLoading(true);
      
      // Determine member status based on isMember flag
      // isMember = true -> 'active' (but unverified)
      // isMember = false/undefined -> 'investigator'
      const memberStatus = isMember ? 'active' : 'investigator';
      const initialApp = isMember ? 'member' : 'investigator';
      
      const options: SignUpOptions = {
        email,
        password,
        displayName,
        initialApp,
        memberStatus,
      };
      
      const result = await signUp(options);
      setUser(result.user);
      const sanitized = sanitizeUniversalProfile(result.profile);
      setProfile(sanitized);
      syncRoleFromProfile(sanitized);

      console.log('🎉 Registro exitoso! xTheGospel ID:', result.profile.xthegospelId);
      console.log(`📋 Status: ${memberStatus}, App: ${initialApp}`);
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with email
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const result = await signIn(email, password);
      setUser(result.user);
      if (result.profile) {
        const sanitized = sanitizeUniversalProfile(result.profile);
        setProfile(sanitized);
        syncRoleFromProfile(sanitized);
      }

      console.log('👋 Login exitoso!');
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await firebaseSignInWithGoogle();
      setUser(result.user);
      const sanitized = sanitizeUniversalProfile(result.profile);
      setProfile(sanitized);
      syncRoleFromProfile(sanitized);
    } catch (error: unknown) {
      console.error('Error en login con Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout - clears both Firebase and role
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Firebase sign out
      if (firebaseAuth) {
        await firebaseSignOut();
      }
      
      // Clear local storage
      StorageService.removeItem('userRole');
      setUserRole(null);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      userRole, 
      login, 
      logout, 
      isLoading,
      user,
      profile,
      signUpWithEmail,
      signInWithEmail,
      signInWithGoogle,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
