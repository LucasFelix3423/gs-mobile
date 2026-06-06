import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { plantingService } from '../services/plantingService';
import { theme } from '../styles/theme';
import { RootStackParamList, Planting } from '../types';

type PlantingsListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlantingsList'>;

interface Props {
  navigation: PlantingsListScreenNavigationProp;
}

export default function PlantingsListScreen({ navigation }: Props) {
  const [plantings, setPlantings] = useState<Planting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const isFocused = useIsFocused();

  const fetchPlantings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await plantingService.getAllPlantings();
      setPlantings(data);
    } catch (err) {
      setError('Não foi possível carregar os dados das áreas de plantio.');
      Alert.alert('Erro de Conexão', 'Falha ao comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchPlantings();
    }
  }, [isFocused]);

  const handleDelete = (id: string) => {
    Alert.alert('Atenção', 'Deseja realmente excluir esta área de plantio?', [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Excluir', 
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);
            await plantingService.deletePlanting(id);
            fetchPlantings(); 
          } catch (err) {
            Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir.');
            setLoading(false);
          }
        }
      }
    ]);
  };

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('plantado') || s.includes('ativo')) return theme.colors.primary;
    if (s.includes('preparo')) return theme.colors.secondary;
    if (s.includes('colhido')) return theme.colors.textSecondary;
    return theme.colors.primaryLight;
  };

  const renderItem = ({ item }: { item: Planting }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="leaf" size={20} color={theme.colors.primary} style={styles.leafIcon} />
          <Text style={styles.cardTitle}>{item.cropName || 'Cultura não definida'}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="texture-box" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.cardText}>Área: {item.areaSize || 0} Hectares</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('PlantingDetails', { planting: item })}
        >
          <MaterialCommunityIcons name="eye-outline" size={22} color={theme.colors.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => navigation.navigate('PlantingForm', { planting: item })}
        >
          <MaterialCommunityIcons name="pencil-outline" size={22} color={theme.colors.secondary} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => handleDelete(String(item.id))}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={22} color={theme.colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading && plantings.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.feedbackText}>Buscando registros...</Text>
      </View>
    );
  }

  if (error && plantings.length === 0) {
    return (
      <View style={styles.centered}>
        <MaterialCommunityIcons name="cloud-off-outline" size={48} color={theme.colors.error} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPlantings}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={plantings}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="sprout-outline" size={64} color={theme.colors.border} />
            <Text style={styles.emptyText}>Nenhuma área cadastrada.</Text>
            <Text style={styles.emptySubtext}>Toque no botão + para adicionar o seu primeiro plantio.</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={fetchPlantings}
      />
      <TouchableOpacity 
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('PlantingForm')}
      >
        <MaterialCommunityIcons name="plus" size={32} color={theme.colors.surface} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.large },
  listContainer: { padding: theme.spacing.medium, paddingBottom: 100 },
  card: { 
    backgroundColor: theme.colors.surface, 
    borderRadius: theme.borderRadius.medium, 
    marginBottom: theme.spacing.medium, 
    padding: theme.spacing.medium,
    ...theme.shadows.soft 
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.small,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leafIcon: {
    marginRight: 6,
  },
  cardTitle: { 
    ...theme.typography.title, 
    fontSize: 18,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.round,
  },
  statusText: {
    ...theme.typography.caption,
    fontWeight: 'bold',
  },
  cardBody: {
    marginBottom: theme.spacing.medium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardText: { 
    ...theme.typography.body, 
    marginLeft: 6,
  },
  actionButtons: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.medium,
  },
  iconButton: { 
    padding: 8, 
    marginLeft: theme.spacing.small,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.round,
  },
  retryButton: { backgroundColor: theme.colors.primary, paddingVertical: 12, paddingHorizontal: 24, borderRadius: theme.borderRadius.small, marginTop: 16 },
  buttonText: { color: theme.colors.surface, fontWeight: 'bold' },
  feedbackText: { marginTop: 12, color: theme.colors.textSecondary, fontSize: 16 },
  errorText: { color: theme.colors.error, fontSize: 16, textAlign: 'center', marginTop: 12, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { ...theme.typography.title, color: theme.colors.textSecondary, marginTop: 16 },
  emptySubtext: { ...theme.typography.body, textAlign: 'center', marginTop: 8, paddingHorizontal: 32 },
  fab: { position: 'absolute', right: 24, bottom: 24, backgroundColor: theme.colors.primary, width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', ...theme.shadows.medium }
});
