import type { Requirement, Attribute } from "./optional";

export interface Item {
  // 共通項目
  id: number;
  uuid: string;
  name: string;
  category: string;
  subCategory: string;
  rarity: number;
  tradeable: boolean;
  availableAt: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  // 個別項目
  weaponType?: string;
  requirement?: Requirement;
  atkPowerMin?: number;
  atkPowerMax?: number;
  defPowerMin?: number;
  defPowerMax?: number;
  attribute?: Attribute;
  mountableWeaponTypes?: string[];
  melodies?: string[];
  hiddenDecoration: boolean;
}
