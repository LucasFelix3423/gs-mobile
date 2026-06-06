import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../types';
import { theme } from '../styles/theme';

type DashboardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

interface Props {
  navigation: DashboardScreenNavigationProp;
}

export default function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryLight]}
        style={styles.headerBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>AgroGestão</Text>
        <Text style={styles.headerSubtitle}>O que você deseja fazer hoje?</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PlantingsList')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E8F5E9' }]}>
              <MaterialCommunityIcons name="sprout" size={32} color={theme.colors.primary} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Meus Plantios</Text>
              <Text style={styles.cardDesc}>Visualizar e gerenciar áreas cadastradas</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PlantingForm')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
              <MaterialCommunityIcons name="plus-circle-outline" size={32} color={theme.colors.secondary} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Novo Plantio</Text>
              <Text style={styles.cardDesc}>Cadastrar uma nova área de safra</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="account-circle-outline" size={32} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Meu Perfil</Text>
              <Text style={styles.cardDesc}>Configurações e dados da sua conta</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerBackground: {
    paddingTop: theme.spacing.xxlarge,
    paddingBottom: theme.spacing.xlarge,
    paddingHorizontal: theme.spacing.large,
    borderBottomLeftRadius: theme.borderRadius.large,
    borderBottomRightRadius: theme.borderRadius.large,
    ...theme.shadows.soft,
  },
  headerTitle: {
    ...theme.typography.header,
    color: theme.colors.surface,
  },
  headerSubtitle: {
    ...theme.typography.subtitle,
    color: theme.colors.surface,
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: theme.spacing.large,
    marginTop: -theme.spacing.medium,
  },
  cardContainer: {
    gap: theme.spacing.medium,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    ...theme.shadows.soft,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.medium,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    ...theme.typography.title,
  },
  cardDesc: {
    ...theme.typography.body,
    marginTop: 2,
  }
});
