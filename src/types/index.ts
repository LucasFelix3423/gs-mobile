export interface Planting {
  id: string; // ou number, dependendo da sua MockAPI
  cropName: string;
  areaSize: number;
  status: string;
}

export type RootStackParamList = {
  Dashboard: undefined;
  PlantingsList: undefined;
  PlantingForm: { planting?: Planting } | undefined;
  PlantingDetails: { planting: Planting };
  Profile: undefined;
};
