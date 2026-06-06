import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { plantingService } from '../services/plantingService';
import { theme } from '../styles/theme';
import { RootStackParamList } from '../types';

type PlantingFormScreenRouteProp = RouteProp<RootStackParamList, 'PlantingForm'>;
type PlantingFormScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PlantingForm'
>;

interface Props {
  route: PlantingFormScreenRouteProp;
  navigation: PlantingFormScreenNavigationProp;
}

export default function PlantingFormScreen({ route, navigation }: Props) {
  const planting = route.params?.planting;
  const isEditing = !!planting;

  const [cropName, setCropName] = useState<string>('');
  const [areaSize, setAreaSize] = useState<string>('');
  const [status, setStatus] = useState<string>('Plantado');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing && planting) {
      setCropName(planting.cropName || '');
      setAreaSize(planting.areaSize ? String(planting.areaSize) : '');
      setStatus(planting.status || 'Plantado');
    }
  }, [isEditing, planting]);

  const handleSave = async () => {
    if (!cropName || !areaSize) {
      Alert.alert('Atenção', 'Por favor, preencha os campos obrigatórios (Cultura e Tamanho).');
      return;
    }

    setLoading(true);
    const data = {
      cropName,
      areaSize: parseFloat(areaSize),
      status,
    };

    try {
      if (isEditing && planting) {
        await plantingService.updatePlanting(String(planting.id), data);
        Alert.alert('Sucesso', 'Plantio atualizado com sucesso!');
      } else {
        await plantingService.createPlanting(data);
        Alert.alert('Sucesso', 'Novo plantio cadastrado!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formCard}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cultura (ex: Milho, Soja)*</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="sprout"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da cultura"
              placeholderTextColor={theme.colors.textSecondary}
              value={cropName}
              onChangeText={setCropName}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tamanho da Área (Hectares)*</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="texture-box"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: 5.5"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              value={areaSize}
              onChangeText={setAreaSize}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Status do Plantio</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons
              name="list-status"
              size={20}
              color={theme.colors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Ex: Plantado, Colhido, Preparo"
              placeholderTextColor={theme.colors.textSecondary}
              value={status}
              onChangeText={setStatus}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={handleSave} disabled={loading}>
        <LinearGradient
          colors={
            loading
              ? [theme.colors.textSecondary, theme.colors.border]
              : [theme.colors.primary, theme.colors.primaryLight]
          }
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          {loading ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={24}
                color={theme.colors.surface}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Atualizar Registro' : 'Salvar Plantio'}
              </Text>
            </>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.large,
    borderRadius: theme.borderRadius.large,
    ...theme.shadows.soft,
    marginBottom: theme.spacing.xlarge,
  },
  inputContainer: {
    marginBottom: theme.spacing.large,
  },
  label: {
    ...theme.typography.subtitle,
    fontSize: 14,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.medium,
    backgroundColor: theme.colors.background,
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingRight: 12,
    fontSize: 16,
    color: theme.colors.text,
  },
  saveButton: {
    flexDirection: 'row',
    padding: 18,
    borderRadius: theme.borderRadius.large,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  saveButtonText: {
    color: theme.colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
