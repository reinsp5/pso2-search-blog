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
  atkUp?: number;
  sAtkUp?: number;
  rAtkUp?: number;
  tAtkUp?: number;
  hpUp?: number;
  ppUp?: number;
  atkCorrect?: number;
  criticalUp?: number;
  damageResist?: number;
  burnResist?: number;
  freezeResist?: number;
  shockResist?: number;
  mirageResist?: number;
  panickResist?: number;
  poisonResist?: number;
  painResist?: number;
  envResist?: number;
  specialAbilities?: string[];
  potentials?: string[];
}