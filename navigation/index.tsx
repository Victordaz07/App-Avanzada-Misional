import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../context/I18nContext';
import AuthScreen from '../app/(auth)/AuthScreen';

// Investigador (learning)
import InvestigatorHome from '../app/(tabs)/learning/index';
import InvestigatorProgress from '../app/(tabs)/learning/progress';
import InvestigatorBaptism from '../app/(tabs)/learning/baptism';
import InvestigatorProfile from '../app/(tabs)/learning/profile';

import LessonsNavigator from './LessonsNavigator';
import TasksScreen from '../screens/TasksScreen';

let LessonDetail: React.ComponentType<any>;

try {
  const lessonDetailModule = require('../screens/LessonDetail');
  LessonDetail = lessonDetailModule.default || lessonDetailModule;
} catch {
  LessonDetail = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pantalla de lección no disponible</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export type RootStackParamList = {
  InvestigatorApp: undefined;
  Auth: undefined;
  LessonDetail: { lessonId: string };
  LessonsNavigator: undefined;
};

const InvestigatorTabs = () => {
  const { t } = useI18n();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InvestigatorHome}
        options={{
          title: t('tabs.home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lecciones"
        component={LessonsNavigator}
        options={{
          title: t('tabs.lessons'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={TasksScreen}
        options={{
          title: t('tabs.tasks'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="format-list-checks"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Progreso"
        component={InvestigatorProgress}
        options={{
          title: t('tabs.progress'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bautismo"
        component={InvestigatorBaptism}
        options={{
          title: t('tabs.baptism'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="water" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={InvestigatorProfile}
        options={{
          title: t('tabs.profile'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const LoadingScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}
  >
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={{ marginTop: 10, color: '#007AFF', fontSize: 16 }}>
      Cargando aplicación...
    </Text>
  </View>
);

/**
 * Legacy RN shell: solo flujo investigador.
 * Roles de misión (misionero, AP, etc.) se migran a web (Vite).
 */
const MainStack = () => {
  const { userRole, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userRole ? (
        <>
          <Stack.Screen name="InvestigatorApp" component={InvestigatorTabs} />
          <Stack.Screen
            name="LessonDetail"
            component={LessonDetail}
            options={{
              headerShown: true,
              title: 'Detalle de Lección',
              headerStyle: {
                backgroundColor: '#007AFF',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ animationEnabled: false }}
        />
      )}
    </Stack.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return <MainStack />;
};

export default AppNavigator;
