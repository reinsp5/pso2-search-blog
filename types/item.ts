import { Timestamp } from "firebase/firestore";

export class Item {
  // 共通項目
  id: string = "";
  name: string = "";
  category: string = "";
  rarity: number = 0;
  tradeable: boolean = false;
  pso2_revival: boolean = false;
  available_at: string[] = [];
  tags: string[] = [];
  create_user: string = "";
  update_user: string = "";
  created_at: Timestamp = Timestamp.now();
  updated_at: Timestamp = Timestamp.now();
  // 個別項目
  sub_category: string = "";
  weapon_type: string = "";
  element: string = "";
  requirement: Requirement = new Requirement();
  atk_power_min: number = 0;
  atk_power_max: number = 0;
  def_power_min: number = 0;
  def_power_max: number = 0;
  attribute: Attribute = new Attribute();
  special_abilities: string[] = [];
  potentials: string[] = [];
  mountable_weapon_types: string[] = [];
  melodies: string[] = [];
  hidden_decoration: boolean = false;
  color_variant: boolean = false;
}

/**
 * オプション項目の型定義
 * @packageDocumentation
 * @module Optional
 * @category Type
 */

// 装備条件
export class Requirement {
  min_level: number = 1;
}

// 特性
export class Attribute {
  atk_up: number = 0;
  s_atk_up: number = 0;
  r_atk_up: number = 0;
  t_atk_up: number = 0;
  hp_up: number = 0;
  pp_up: number = 0;
  atk_correct: number = 0;
  critical_up: number = 0;
  damage_resist: number = 0;
  burn_resist: number = 0;
  freeze_resist: number = 0;
  shock_resist: number = 0;
  mirage_resist: number = 0;
  panick_resist: number = 0;
  poison_resist: number = 0;
  pain_resist: number = 0;
  env_resist: number = 0;
}
