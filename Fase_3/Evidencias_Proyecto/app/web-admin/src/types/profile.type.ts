export type Profile = {
  id: string;
  updated_at: string;
  full_name: string;
  medical_role: ProfileMedicalRoleEnum;
  building_id: number;
  sex: ProfileSexEnum;
  is_active: boolean
};

export enum ProfileSexEnum {
  male = "male",
  female = "female"
}

export enum ProfileMedicalRoleEnum {
  doctor = "doctor",
  nurse = "nurse",
  tens = "tens"
}