import { Timestamp } from "firebase/firestore";

export class Item {
  // 共通項目
  id: string = "";
  name: string = "";
  category: string = "";
  rarity: number = 1;
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
  //melodies: string[] = [];
  hidden_decoration: boolean = false;
  color_variant: boolean = false;
  cover_image_url: ImageInfo = new ImageInfo();
  other_image_urls: ImageInfo[] = [];

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

// イメージ
export class ImageInfo {
  id: string = "";
  url: string = "";
}

export const mapItem = (item: Item): Item => {
  return {
    id: item.id,
    name: item.name,
    category: item.category,
    rarity: item.rarity,
    tradeable: item.tradeable,
    pso2_revival: item.pso2_revival,
    available_at: item.available_at,
    tags: item.tags,
    create_user: item.create_user,
    update_user: item.update_user,
    created_at: item.created_at,
    updated_at: item.updated_at,
    sub_category: item.sub_category,
    weapon_type: item.weapon_type,
    element: item.element,
    requirement: item.requirement,
    atk_power_min: item.atk_power_min,
    atk_power_max: item.atk_power_max,
    def_power_min: item.def_power_min,
    def_power_max: item.def_power_max,
    attribute: item.attribute,
    special_abilities: item.special_abilities,
    potentials: item.potentials,
    mountable_weapon_types: item.mountable_weapon_types,
    hidden_decoration: item.hidden_decoration,
    color_variant: item.color_variant,
    cover_image_url: item.cover_image_url,
    other_image_urls: item.other_image_urls,
  };
};