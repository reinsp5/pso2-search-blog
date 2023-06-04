import type { Requirement, Attribute } from "./optional";

export interface Item {
  // 共通項目
  name: string;
  category: string;
  rarity: number;
  tradeable: boolean;
  pso2Revival: boolean;
  availableAt: string[];
  tags: string[];
  createUser: string;
  updateUser: string;
  createdAt: string;
  updatedAt: string;
  // 個別項目
  subCategory?: string;
  weaponType?: string;
  element?: string;
  requirement?: Requirement;
  atkPowerMin?: number;
  atkPowerMax?: number;
  defPowerMin?: number;
  defPowerMax?: number;
  attribute?: Attribute;
  mountableWeaponTypes?: string[];
  melodies?: string[];
  hiddenDecoration?: boolean;
  colorVariant?: boolean;
}

export interface ItemResponse extends Item {
  id: number;
  uuid: string;
}