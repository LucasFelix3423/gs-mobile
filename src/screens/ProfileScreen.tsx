import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

export default function ProfileScreen({ navigation }: Props) {
  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja desconectar sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => navigation.navigate('Dashboard'),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <MaterialCommunityIcons name="account-tie" size={64} color={theme.colors.primary} />
        </View>
        <Text style={styles.userName}>João Produtor</Text>
        <Text style={styles.userEmail}>joao.produtor@fazenda.com</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Conta Premium</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Geral</Text>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIconContainer}>
            <MaterialCommunityIcons
              name="account-edit-outline"
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.optionText}>Editar Perfil</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIconContainer}>
            <MaterialCommunityIcons name="bell-outline" size={24} color={theme.colors.secondary} />
          </View>
          <Text style={styles.optionText}>Notificações</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aplicativo</Text>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIconContainer}>
            <MaterialCommunityIcons
              name="help-circle-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
          <Text style={styles.optionText}>Central de Ajuda</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={theme.colors.textSecondary}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <View style={styles.optionIconContainer}>
            <MaterialCommunityIcons
              name="information-outline"
              size={24}
              color={theme.colors.textSecondary}
            />
          </View>
          <Text style={styles.optionText}>Sobre o AgroGestão</Text>
          <Text style={styles.versionText}>v1.0.0</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons
          name="logout"
          size={20}
          color={theme.colors.error}
          style={{ marginRight: 8 }}
        />
        <Text style={styles.logoutButtonText}>Sair da Conta</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xlarge,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
    ...theme.shadows.soft,
  },
  userName: {
    ...theme.typography.header,
    fontSize: 24,
  },
  userEmail: {
    ...theme.typography.body,
    marginTop: 4,
  },
  badge: {
    marginTop: 12,
    backgroundColor: theme.colors.primaryLight + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.round,
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 12,
  },
  section: {
    marginTop: theme.spacing.large,
    paddingHorizontal: theme.spacing.large,
  },
  sectionTitle: {
    ...theme.typography.subtitle,
    marginBottom: theme.spacing.small,
    marginLeft: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.small,
    ...theme.shadows.soft,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.medium,
  },
  optionText: {
    flex: 1,
    ...theme.typography.title,
    fontSize: 16,
  },
  versionText: {
    ...theme.typography.caption,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.large,
    marginTop: theme.spacing.xlarge,
    padding: 16,
    borderRadius: theme.borderRadius.large,
    backgroundColor: theme.colors.error + '10',
    borderWidth: 1,
    borderColor: theme.colors.error + '30',
  },
  logoutButtonText: {
    color: theme.colors.error,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
