import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import PlantingsListScreen from '../screens/PlantingsListScreen';
import PlantingFormScreen from '../screens/PlantingFormScreen';
import PlantingDetailsScreen from '../screens/PlantingDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: theme.colors.surface,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'AgroGestão' }} />
        <Stack.Screen name="PlantingsList" component={PlantingsListScreen} options={{ title: 'Meus Plantios' }} />
        <Stack.Screen name="PlantingForm" component={PlantingFormScreen} options={{ title: 'Formulário de Plantio' }} />
        <Stack.Screen name="PlantingDetails" component={PlantingDetailsScreen} options={{ title: 'Detalhes da Área' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Meu Perfil' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
