import { Timestamp } from "firebase/firestore";

interface IItem {
  id: string;
  name: string;
  category: string;
  rarity: number;
  tradeable: boolean;
  pso2_revival: boolean;
  available_at: string[];
  tags: string[];
  create_user: string;
  update_user: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  sub_category: string;
  weapon_type: string;
  element: string;
  requirement: Requirement;
  atk_power_min: number;
  atk_power_max: number;
  def_power_min: number;
  def_power_max: number;
  attribute: Attribute;
  special_abilities: string[];
  potentials: string[];
  mountable_weapon_types: string[];
  hidden_decoration: boolean;
  color_variant: boolean;
  cover_image_url: ImageInfo;
  other_image_urls: ImageInfo[];
}

interface IRequirement {
  min_level: number;
}

interface IAttribute {
  atk_up: number;
  s_atk_up: number;
  r_atk_up: number;
  t_atk_up: number;
  hp_up: number;
  pp_up: number;
  atk_correct: number;
  critical_up: number;
  damage_resist: number;
  burn_resist: number;
  freeze_resist: number;
  shock_resist: number;
  mirage_resist: number;
  panick_resist: number;
  poison_resist: number;
  pain_resist: number;
  env_resist: number;
}

interface IImageInfo {
  id: string;
  url: string;
}

export class Item implements IItem {
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
  hidden_decoration: boolean = false;
  color_variant: boolean = false;
  cover_image_url: ImageInfo = new ImageInfo();
  other_image_urls: ImageInfo[] = [];
  
  mapItem(item: Item) {
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
    } as Item;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      rarity: this.rarity,
      tradeable: this.tradeable,
      pso2_revival: this.pso2_revival,
      available_at: this.available_at,
      tags: this.tags,
      create_user: this.create_user,
      update_user: this.update_user,
      created_at: this.created_at,
      updated_at: this.updated_at,
      sub_category: this.sub_category,
      weapon_type: this.weapon_type,
      element: this.element,
      requirement: this.requirement.toJSON(),
      atk_power_min: this.atk_power_min,
      atk_power_max: this.atk_power_max,
      def_power_min: this.def_power_min,
      def_power_max: this.def_power_max,
      attribute: this.attribute.toJSON(),
      special_abilities: this.special_abilities,
      potentials: this.potentials,
      mountable_weapon_types: this.mountable_weapon_types,
      hidden_decoration: this.hidden_decoration,
      color_variant: this.color_variant,
      cover_image_url: this.cover_image_url.toJSON(),
      other_image_urls: this.other_image_urls.map((image) => image.toJSON()),
    };
  }
}

/**
 * オプション項目の型定義
 * @packageDocumentation
 * @module Optional
 * @category Type
 */

// 装備条件
export class Requirement implements IRequirement {
  min_level: number = 1;

  toJSON() {
    return {
      min_level: this.min_level,
    };
  }
}

// 特性
export class Attribute implements IAttribute {
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

  toJSON() {
    return {
      atk_up: this.atk_up,
      s_atk_up: this.s_atk_up,
      r_atk_up: this.r_atk_up,
      t_atk_up: this.t_atk_up,
      hp_up: this.hp_up,
      pp_up: this.pp_up,
      atk_correct: this.atk_correct,
      critical_up: this.critical_up,
      damage_resist: this.damage_resist,
      burn_resist: this.burn_resist,
      freeze_resist: this.freeze_resist,
      shock_resist: this.shock_resist,
      mirage_resist: this.mirage_resist,
      panick_resist: this.panick_resist,
      poison_resist: this.poison_resist,
      pain_resist: this.pain_resist,
      env_resist: this.env_resist,
    };
  }
}

// イメージ
export class ImageInfo implements IImageInfo {
  id: string = "";
  url: string = "";

  toJSON() {
    return {
      id: this.id,
      url: this.url,
    };
  }
}