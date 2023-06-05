/**
 * オプション項目の型定義
 * @packageDocumentation
 * @module Optional
 * @category Type
 */

// 装備条件
export interface Requirement {
  minLevel: number;
}

// 特殊能力
export interface SpecialAbility {
  name: string;
  description: string;
}

// 潜在能力
export interface Potential {
  name: string;
  description: string;
}

// 特性
export interface Attribute {
  atk_up?: number;
  s_atk_up?: number;
  r_atk_up?: number;
  t_atk_up?: number;
  hp_up?: number;
  pp_up?: number;
  atk_correct?: number;
  critical_up?: number;
  damage_resist?: number;
  burn_resist?: number;
  freeze_resist?: number;
  shock_resist?: number;
  mirage_resist?: number;
  panick_resist?: number;
  poison_resist?: number;
  pain_resist?: number;
  env_resist?: number;
  special_abilities?: string[];
  potentials?: string[];
}