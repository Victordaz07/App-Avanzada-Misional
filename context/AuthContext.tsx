import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userRole: string | null;
  availableRoles: string[];
  login: (role: string) => Promise<void>;
  switchRole: (role: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/** Legacy RN: solo investigador y miembro (flujo unificado en web). */
const AVAILABLE_ROLES = [
  { key: 'investigator', label: '👤 Investigador', description: 'Estoy aprendiendo sobre el evangelio' },
  { key: 'member', label: '🤝 Miembro', description: 'Soy miembro y uso la app en modo simplificado' },
];

function normalizeRnRole(raw: string | null): string | null {
  if (!raw) return null;
  const n = raw.toLowerCase().trim();
  if (n === 'investigator' || n === 'member') return n;
  if (
    n === 'missionary' ||
    n === 'misionero' ||
    n === 'district_leader' ||
    n === 'zone_leader' ||
    n === 'assistant_to_president'
  ) {
    return 'member';
  }
  return 'investigator';
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [availableRoles, setAvailableRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadStoredRole();
  }, []);

  const loadStoredRole = async () => {
    try {
      setIsLoading(true);
      const storedRole = await AsyncStorage.getItem('userRole');
      const normalized = normalizeRnRole(storedRole);
      if (normalized && normalized !== storedRole) {
        await AsyncStorage.setItem('userRole', normalized);
      }
      if (normalized) {
        setUserRole(normalized);
      }

      const defaultKeys = AVAILABLE_ROLES.map((r) => r.key);
      setAvailableRoles(defaultKeys);
      await AsyncStorage.setItem('availableRoles', JSON.stringify(defaultKeys));
    } catch (error) {
      console.error('Error loading stored role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (role: string) => {
    const normalized = normalizeRnRole(role);
    if (!normalized) {
      throw new Error('Invalid role');
    }
    try {
      setIsLoading(true);
      await AsyncStorage.setItem('userRole', normalized);
      setUserRole(normalized);
      const defaultKeys = AVAILABLE_ROLES.map((r) => r.key);
      setAvailableRoles(defaultKeys);
      await AsyncStorage.setItem('availableRoles', JSON.stringify(defaultKeys));
    } catch (error) {
      console.error('Error saving role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = async (role: string) => {
    await login(role);
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem('userRole');
      await AsyncStorage.removeItem('availableRoles');
      setUserRole(null);
      setAvailableRoles([]);
    } catch (error) {
      console.error('Error removing role:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ userRole, availableRoles, login, switchRole, logout, isLoading }}>
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
