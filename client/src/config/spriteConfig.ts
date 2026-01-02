/**
 * Sprite Configuration - Premium Quality Asset Definitions
 * Enter the Gungeon-style sprite system for Save Ismael
 */

import { SpriteConfig } from '../utils/SpriteRenderer';
import { tempSpriteAssets } from './tempSpriteAssets';

/**
 * Sprite asset configurations
 *
 * IMPORTANT: Create sprite sheets in this format:
 * - Size: 512x512 or 1024x1024 PNG with transparency
 * - Frame size: 128x128 pixels per frame (or 256x256 for bosses)
 * - Layout: Grid format (4x4 = 16 frames, 4x3 = 12 frames, etc.)
 * - Color: Dark silhouettes + bright emissive colors for glow
 * - Style: Clean, crisp edges like Enter the Gungeon
 */

export const spriteConfigs: { [key: string]: SpriteConfig } = {
  // ==========================================================================
  // BASIC ENEMIES
  // ==========================================================================

  /**
   * DEMODOG - Small quadrupedal horror
   * Sprite sheet layout (512x512, 4x4 grid, 128px frames):
   * Row 1: Idle (2 frames) + Walk (4 frames)
   * Row 2: Attack (4 frames)
   * Row 3: Hurt (2 frames) + Death (4 frames)
   * Row 4: Special/Glow variations
   */
  demodog: {
    spriteSheetUrl: tempSpriteAssets.demodog,
    frameWidth: 128,
    frameHeight: 128,
    totalFrames: 16,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 1, loop: true, fps: 4 },
      walk: { startFrame: 2, endFrame: 5, loop: true, fps: 8 },
      attack: { startFrame: 6, endFrame: 9, loop: false, fps: 12 },
      hurt: { startFrame: 10, endFrame: 11, loop: false, fps: 8 },
      death: { startFrame: 12, endFrame: 15, loop: false, fps: 10 },
    },
  },

  /**
   * DEMOBAT - Flying terror
   * Uses temporary SVG sprites - replace with PNG when ready
   */
  demobat: {
    spriteSheetUrl: tempSpriteAssets.demobat,
    frameWidth: 128,
    frameHeight: 128,
    totalFrames: 12,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 3, loop: true, fps: 6 },
      fly: { startFrame: 4, endFrame: 7, loop: true, fps: 10 },
      attack: { startFrame: 8, endFrame: 9, loop: false, fps: 12 },
      death: { startFrame: 10, endFrame: 11, loop: false, fps: 8 },
    },
  },

  /**
   * SWARM - Small swarming creatures
   */
  swarm: {
    spriteSheetUrl: tempSpriteAssets.swarm,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 8,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 1, loop: true, fps: 6 },
      move: { startFrame: 2, endFrame: 5, loop: true, fps: 10 },
      attack: { startFrame: 5, endFrame: 7, loop: false, fps: 12 },
    },
  },

  /**
   * FLYING - Flying enemies with wings
   */
  flying: {
    spriteSheetUrl: tempSpriteAssets.flying,
    frameWidth: 128,
    frameHeight: 128,
    totalFrames: 16,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 3, loop: true, fps: 6 },
      fly: { startFrame: 4, endFrame: 7, loop: true, fps: 10 },
      attack: { startFrame: 8, endFrame: 11, loop: false, fps: 12 },
      death: { startFrame: 12, endFrame: 15, loop: false, fps: 8 },
    },
  },

  /**
   * ELITE - Larger armored enemies
   */
  elite: {
    spriteSheetUrl: tempSpriteAssets.elite,
    frameWidth: 256,
    frameHeight: 256,
    totalFrames: 16,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 1, loop: true, fps: 4 },
      walk: { startFrame: 2, endFrame: 5, loop: true, fps: 8 },
      attack: { startFrame: 6, endFrame: 11, loop: false, fps: 10 },
      death: { startFrame: 12, endFrame: 15, loop: false, fps: 8 },
    },
  },

  // ==========================================================================
  // ELITE ENEMIES
  // ==========================================================================

  /**
   * DEMOGORGON - Level 2 Boss
   * Uses temporary SVG sprites - replace with PNG when ready
   */
  demogorgon: {
    spriteSheetUrl: tempSpriteAssets.demogorgon,
    frameWidth: 256,
    frameHeight: 256,
    totalFrames: 16,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 1, loop: true, fps: 4 },
      walk: { startFrame: 2, endFrame: 5, loop: true, fps: 8 },
      chargeWindup: { startFrame: 6, endFrame: 8, loop: false, fps: 6 },
      charge: { startFrame: 9, endFrame: 11, loop: true, fps: 12 },
      attack: { startFrame: 6, endFrame: 9, loop: false, fps: 10 },
      roar: { startFrame: 10, endFrame: 11, loop: false, fps: 6 },
      hurt: { startFrame: 14, endFrame: 15, loop: false, fps: 8 },
      death: { startFrame: 12, endFrame: 15, loop: false, fps: 6 },
    },
  },

  // ==========================================================================
  // MAJOR BOSSES (High Detail, 256px frames)
  // ==========================================================================

  /**
   * MIND FLAYER - Level 4 Boss
   * Uses temporary SVG sprites - replace with PNG when ready
   */
  mindFlayer: {
    spriteSheetUrl: tempSpriteAssets.mindFlayer,
    frameWidth: 256,
    frameHeight: 256,
    totalFrames: 16,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 3, loop: true, fps: 4 },
      float: { startFrame: 0, endFrame: 3, loop: true, fps: 6 },
      psychicAttack: { startFrame: 4, endFrame: 7, loop: false, fps: 10 },
      aoeAttack: { startFrame: 4, endFrame: 7, loop: false, fps: 8 },
      summon: { startFrame: 8, endFrame: 11, loop: false, fps: 6 },
      hurt: { startFrame: 12, endFrame: 13, loop: false, fps: 8 },
      death: { startFrame: 12, endFrame: 15, loop: false, fps: 4 },
    },
  },

  /**
   * VECNA - Final Boss
   * Uses temporary SVG sprites - replace with PNG when ready
   */
  vecna: {
    spriteSheetUrl: tempSpriteAssets.vecna,
    frameWidth: 256,
    frameHeight: 256,
    totalFrames: 24,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 3, loop: true, fps: 4 },
      telekinesis: { startFrame: 4, endFrame: 7, loop: false, fps: 8 },
      mindInvasion: { startFrame: 8, endFrame: 11, loop: false, fps: 6 },
      fearProjection: { startFrame: 8, endFrame: 11, loop: true, fps: 8 },
      summonEcho: { startFrame: 8, endFrame: 11, loop: false, fps: 6 },
      desperationAttack: { startFrame: 4, endFrame: 7, loop: false, fps: 10 },
      clockMechanic: { startFrame: 0, endFrame: 3, loop: true, fps: 5 },
      teleport: { startFrame: 12, endFrame: 15, loop: false, fps: 8 },
      psychic: { startFrame: 8, endFrame: 11, loop: false, fps: 8 },
      attack: { startFrame: 4, endFrame: 7, loop: false, fps: 10 },
      hurt: { startFrame: 16, endFrame: 17, loop: false, fps: 8 },
      death: { startFrame: 16, endFrame: 19, loop: false, fps: 4 },
    },
  },

  // ==========================================================================
  // SWARM TYPES (Spawner enemies)
  // ==========================================================================

  swarmCreature: {
    spriteSheetUrl: tempSpriteAssets.swarm,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 8,
    framesPerRow: 4,
    animations: {
      idle: { startFrame: 0, endFrame: 1, loop: true, fps: 6 },
      move: { startFrame: 2, endFrame: 5, loop: true, fps: 10 },
      attack: { startFrame: 6, endFrame: 7, loop: false, fps: 12 },
    },
  },
};

/**
 * Sprite visual effect presets for different enemy types
 */
export const spriteEffectPresets = {
  // Basic infected enemies
  basicInfected: {
    glowColor: { r: 0, g: 1, b: 0.8 }, // Teal (#00ffcc)
    glowIntensity: 0.5,
    shadowEnabled: true,
    particleTrail: true,
  },

  // Boss enemies
  boss: {
    glowColor: { r: 0.545, g: 0, b: 0 }, // Dark red (#8b0000)
    glowIntensity: 0.8,
    shadowEnabled: true,
    particleTrail: false,
  },

  // Vecna special
  vecna: {
    glowColor: { r: 0.4, g: 0, b: 0.4 }, // Purple (#660066)
    glowIntensity: 1.0,
    shadowEnabled: true,
    particleTrail: false,
  },

  // Flying enemies
  flying: {
    glowColor: { r: 0, g: 1, b: 0.8 }, // Teal
    glowIntensity: 0.4,
    shadowEnabled: false, // No shadow for flying
    particleTrail: true,
  },

  // Swarm (small, numerous)
  swarm: {
    glowColor: { r: 0.22, g: 1, b: 0.08 }, // Sickly green (#39ff14)
    glowIntensity: 0.3,
    shadowEnabled: true,
    particleTrail: false,
  },
};

/**
 * Fallback sprite: Simple colored circle for when sprites aren't loaded
 */
export const fallbackSpriteConfig: SpriteConfig = {
  spriteSheetUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI2NCIgY3k9IjY0IiByPSI1MCIgZmlsbD0iIzFhMWExYSIgc3Ryb2tlPSIjMDBmZmNjIiBzdHJva2Utd2lkdGg9IjQiLz48L3N2Zz4=',
  frameWidth: 128,
  frameHeight: 128,
  totalFrames: 1,
  framesPerRow: 1,
  animations: {
    idle: { startFrame: 0, endFrame: 0, loop: true, fps: 1 },
  },
};

/**
 * Helper: Get sprite config by enemy type
 */
export function getSpriteConfigForEnemy(enemyType: string): SpriteConfig {
  return spriteConfigs[enemyType] || fallbackSpriteConfig;
}

/**
 * Helper: Get sprite effects by enemy type
 */
export function getSpriteEffectsForEnemy(enemyType: string): any {
  switch (enemyType) {
    case 'vecna':
      return spriteEffectPresets.vecna;
    case 'mindFlayer':
    case 'demogorgon':
      return spriteEffectPresets.boss;
    case 'demobat':
      return spriteEffectPresets.flying;
    case 'swarm':
    case 'flying':
      return spriteEffectPresets.swarm;
    default:
      return spriteEffectPresets.basicInfected;
  }
}
