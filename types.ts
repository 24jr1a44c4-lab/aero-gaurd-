
export enum FogCondition {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH'
}

export enum TemperatureLevel {
  LOW = 'LOW',
  MODERATE = 'MODERATE',
  HIGH = 'HIGH'
}

export enum AccuracyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum EfficiencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum EnvironmentMode {
  HIGHWAY = 'HIGHWAY',
  FIELD = 'FIELD',
  URBAN = 'URBAN'
}

export enum PlantType {
  ROOT_CROP = 'ROOT_CROP',
  SUCCULENT = 'SUCCULENT',
  TROPICAL_FERN = 'TROPICAL_FERN'
}

export enum SensorTier {
  BUDGET = 'BUDGET',
  PREMIUM = 'PREMIUM'
}

export interface SensorData {
  humidity: number;
  visibility: number;
  pm25: number;
  temperature: number;
  fogDensity: number;
}

export interface DeviceStats {
  powerConsumption: number; 
  renewableOffset: number; 
  waterCollected: number; 
  filtrationEfficiency: number; 
  soilMineralSafety: number; 
  filterClogLevel: number; 
  meshNodes: number; 
}

export interface SafetyStatus {
  level: 'Safe' | 'Warning' | 'Critical';
  message: string;
}
