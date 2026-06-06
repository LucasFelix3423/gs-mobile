import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';

type PlantingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PlantingDetails'>;
type PlantingDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PlantingDetails'
>;

interface Props {
  route: PlantingDetailsScreenRouteProp;
  navigation: PlantingDetailsScreenNavigationProp;
}

export default function PlantingDetailsScreen({ route, navigation }: Props) {
  const planting = route.params?.planting;

  if (!planting) {
    return (
      <View style={styles.errorContainer}>
        <MaterialCommunityIcons name="alert-circle-outline" size={64} color={theme.colors.error} />
        <Text style={styles.errorText}>Nenhum plantio selecionado.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primaryLight, theme.colors.primary]}
        style={styles.headerBackground}
      >
        <MaterialCommunityIcons name="sprout" size={64} color={theme.colors.surface} />
        <Text style={styles.headerTitle}>{planting.cropName}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{planting.status}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Informações da Área</Text>

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <MaterialCommunityIcons name="texture-box" size={24} color={theme.colors.secondary} />
            </View>
            <View>
              <Text style={styles.detailLabel}>Tamanho Registrado</Text>
              <Text style={styles.detailValue}>{planting.areaSize} Hectares</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <MaterialCommunityIcons
                name="identifier"
                size={24}
                color={theme.colors.textSecondary}
              />
            </View>
            <View>
              <Text style={styles.detailLabel}>ID no Sistema</Text>
              <Text style={styles.detailValue}>#{planting.id}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PlantingForm', { planting })}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color={theme.colors.surface}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.actionButtonText}>Editar este registro</Text>
        </TouchableOpacity>
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
    alignItems: 'center',
    paddingTop: theme.spacing.xlarge,
    paddingBottom: theme.spacing.xxlarge,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    ...theme.typography.header,
    color: theme.colors.surface,
    marginTop: theme.spacing.small,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.round,
    marginTop: theme.spacing.medium,
  },
  badgeText: {
    color: theme.colors.surface,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    padding: theme.spacing.large,
    marginTop: -theme.spacing.xlarge,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.medium,
    marginBottom: theme.spacing.large,
  },
  sectionTitle: {
    ...theme.typography.title,
    marginBottom: theme.spacing.medium,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.small,
  },
  detailIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.medium,
  },
  detailLabel: {
    ...theme.typography.caption,
    fontSize: 14,
  },
  detailValue: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.medium,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.soft,
  },
  actionButtonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
  },
  errorText: {
    ...theme.typography.title,
    color: theme.colors.textSecondary,
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    padding: 12,
    backgroundColor: theme.colors.border,
    borderRadius: 8,
  },
  backButtonText: {
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});
