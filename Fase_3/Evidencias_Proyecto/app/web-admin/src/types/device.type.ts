export type Device = {
  id: number;
  created_at: string;
  name: string;
  type: string;
  room_id: number;
  status: DeviceStatusEnum;
  in_or_out: DeviceInOrOutEnum;
  user_id?: number;
};

export enum DeviceStatusEnum {
  available= "available", 
  occupied = "occupied", 
  unavailable = "unavailable",
  deleted = "deleted"
}

export enum DeviceInOrOutEnum {
  in = "in",
  out = "out"
}

export enum DeviceTypeEnum {
  diagnostic = "diagnostic",
  therapeutic = "therapeutic",
  surgical = "surgical",
  lifeSupport = "life_support",
  rehabilitation = "rehabilitation",
  homeCare = "home_care",
  sterilizationDisinfection = "sterilization_disinfection",
  medicalFurniture = "medical_furniture",
  communicationManagement = "communication_management"
}