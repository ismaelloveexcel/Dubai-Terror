/**
 * Premium Sprite Rendering System
 * Enter the Gungeon-style billboard sprites with effects
 */

import * as BABYLON from '@babylonjs/core';

export interface SpriteConfig {
  spriteSheetUrl: string;
  frameWidth: number;
  frameHeight: number;
  totalFrames: number;
  framesPerRow: number;
  animations: {
    [key: string]: {
      startFrame: number;
      endFrame: number;
      loop: boolean;
      fps: number;
    };
  };
}

export interface SpriteEffects {
  glowColor?: BABYLON.Color3;
  glowIntensity?: number;
  shadowEnabled?: boolean;
  particleTrail?: boolean;
  outlineColor?: BABYLON.Color3;
  outlineWidth?: number;
}

const spriteManagerCache = new Map<string, BABYLON.SpriteManager>();
let sharedGlowLayer: BABYLON.GlowLayer | null = null;
const glowMeshRegistry = new Map<BABYLON.Mesh, { color: BABYLON.Color3; intensity: number }>();

function getOrCreateSpriteManager(
  key: string,
  config: SpriteConfig,
  scene: BABYLON.Scene
): BABYLON.SpriteManager {
  const cacheKey = `${key}_${config.spriteSheetUrl}`;
  let manager = spriteManagerCache.get(cacheKey);
  
  if (!manager || manager.isDisposed()) {
    manager = new BABYLON.SpriteManager(
      `shared_${key}_manager`,
      config.spriteSheetUrl,
      200,
      { width: config.frameWidth, height: config.frameHeight },
      scene
    );
    spriteManagerCache.set(cacheKey, manager);
  }
  
  return manager;
}

function getSharedGlowLayer(scene: BABYLON.Scene): BABYLON.GlowLayer {
  if (!sharedGlowLayer || sharedGlowLayer.isDisposed()) {
    sharedGlowLayer = new BABYLON.GlowLayer('sharedGlow', scene, {
      mainTextureSamples: 2,
      blurKernelSize: 32,
    });
    sharedGlowLayer.intensity = 0.5;
    
    sharedGlowLayer.customEmissiveColorSelector = (mesh, subMesh, material, result) => {
      const glowData = glowMeshRegistry.get(mesh as BABYLON.Mesh);
      if (glowData) {
        result.set(
          glowData.color.r * glowData.intensity,
          glowData.color.g * glowData.intensity,
          glowData.color.b * glowData.intensity,
          1
        );
      }
    };
  }
  return sharedGlowLayer;
}

function registerGlowMesh(mesh: BABYLON.Mesh, color: BABYLON.Color3, intensity: number): void {
  glowMeshRegistry.set(mesh, { color, intensity });
}

function unregisterGlowMesh(mesh: BABYLON.Mesh): void {
  glowMeshRegistry.delete(mesh);
}

export class SpriteRenderer {
  private sprite: BABYLON.Sprite;
  private spriteManager: BABYLON.SpriteManager;
  private currentAnimation: string = 'idle';
  private shadowPlane: BABYLON.Mesh | null = null;
  private particleSystem: BABYLON.ParticleSystem | null = null;
  private glowMesh: BABYLON.Mesh | null = null;
  private config: SpriteConfig;
  private scene: BABYLON.Scene;
  private spriteKey: string;

  constructor(
    name: string,
    config: SpriteConfig,
    scene: BABYLON.Scene,
    effects?: SpriteEffects
  ) {
    this.scene = scene;
    this.config = config;
    this.spriteKey = name.split('_')[0];

    this.spriteManager = getOrCreateSpriteManager(this.spriteKey, config, scene);

    this.sprite = new BABYLON.Sprite(name, this.spriteManager);
    this.sprite.cellIndex = 0;
    this.sprite.size = 1.5;

    this.enableBillboard();

    if (effects) {
      this.applyEffects(effects);
    }
  }

  /**
   * Enable billboard mode - sprite always faces camera
   */
  private enableBillboard(): void {
    // Babylon.js sprites are automatically billboarded
    // But we can add custom rotation if needed
    this.sprite.angle = 0;
  }

  /**
   * Apply premium visual effects
   */
  private applyEffects(effects: SpriteEffects): void {
    if (effects.glowColor && effects.glowIntensity) {
      this.createGlowEffect(effects.glowColor, effects.glowIntensity);
    }

    if (effects.shadowEnabled) {
      this.createShadowPlane();
    }

    if (effects.particleTrail) {
      this.createParticleTrail();
    }
  }

  /**
   * Create glow effect using shared GlowLayer
   */
  private createGlowEffect(color: BABYLON.Color3, intensity: number): void {
    const glowLayer = getSharedGlowLayer(this.scene);
    
    this.glowMesh = BABYLON.MeshBuilder.CreatePlane(
      `${this.spriteKey}_glow`,
      { size: this.sprite.size * 1.2 },
      this.scene
    );
    
    this.glowMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
    this.glowMesh.isPickable = false;
    
    const glowMat = new BABYLON.StandardMaterial(`${this.spriteKey}_glowMat`, this.scene);
    glowMat.emissiveColor = color;
    glowMat.disableLighting = true;
    glowMat.alpha = 0.01;
    this.glowMesh.material = glowMat;
    
    glowLayer.addIncludedOnlyMesh(this.glowMesh);
    registerGlowMesh(this.glowMesh, color, intensity);
  }

  /**
   * Create a ground shadow beneath the sprite
   */
  private createShadowPlane(): void {
    this.shadowPlane = BABYLON.MeshBuilder.CreatePlane(
      'spriteShadow',
      { size: 1.5 },
      this.scene
    );
    this.shadowPlane.rotation.x = Math.PI / 2;
    this.shadowPlane.position.y = 0.01; // Just above ground

    // Shadow material
    const shadowMat = new BABYLON.StandardMaterial('shadowMat', this.scene);
    shadowMat.diffuseColor = new BABYLON.Color3(0, 0, 0);
    shadowMat.alpha = 0.3;
    shadowMat.disableLighting = true;
    this.shadowPlane.material = shadowMat;
  }

  /**
   * Create particle trail effect (infection spores, etc.)
   */
  private createParticleTrail(): void {
    this.particleSystem = new BABYLON.ParticleSystem(
      'spriteParticles',
      100,
      this.scene
    );

    // Particle texture (use a simple circle)
    this.particleSystem.particleTexture = new BABYLON.Texture(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMGZmY2MiLz48L3N2Zz4=',
      this.scene
    );

    // Particle properties
    this.particleSystem.color1 = new BABYLON.Color4(0, 1, 0.8, 1); // Teal
    this.particleSystem.color2 = new BABYLON.Color4(0, 1, 0.8, 0);
    this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    this.particleSystem.minSize = 0.05;
    this.particleSystem.maxSize = 0.15;
    this.particleSystem.minLifeTime = 0.3;
    this.particleSystem.maxLifeTime = 0.8;
    this.particleSystem.emitRate = 15;

    this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    this.particleSystem.gravity = new BABYLON.Vector3(0, -0.5, 0);
    this.particleSystem.direction1 = new BABYLON.Vector3(-0.2, 0, -0.2);
    this.particleSystem.direction2 = new BABYLON.Vector3(0.2, 0.5, 0.2);

    this.particleSystem.minEmitPower = 0.2;
    this.particleSystem.maxEmitPower = 0.5;
    this.particleSystem.updateSpeed = 0.01;
  }

  /**
   * Play animation with smooth transitions
   */
  public playAnimation(animationName: string, force: boolean = false): void {
    if (this.currentAnimation === animationName && !force) return;

    const anim = this.config.animations[animationName];
    if (!anim) {
      console.warn(`Animation ${animationName} not found`);
      return;
    }

    this.currentAnimation = animationName;
    this.sprite.playAnimation(
      anim.startFrame,
      anim.endFrame,
      anim.loop,
      1000 / anim.fps // Delay in ms
    );
  }

  /**
   * Set sprite position
   */
  public setPosition(position: BABYLON.Vector3): void {
    this.sprite.position = position;

    if (this.shadowPlane) {
      this.shadowPlane.position.x = position.x;
      this.shadowPlane.position.z = position.z;
    }

    if (this.glowMesh) {
      this.glowMesh.position = position.clone();
    }

    if (this.particleSystem) {
      this.particleSystem.emitter = position;
    }
  }

  /**
   * Get current position
   */
  public getPosition(): BABYLON.Vector3 {
    return this.sprite.position;
  }

  /**
   * Set sprite size (scale)
   */
  public setSize(size: number): void {
    this.sprite.size = size;
    if (this.shadowPlane) {
      this.shadowPlane.scaling = new BABYLON.Vector3(size, size, 1);
    }
    if (this.glowMesh) {
      this.glowMesh.scaling = new BABYLON.Vector3(size * 1.2, size * 1.2, 1);
    }
  }

  /**
   * Show/hide sprite
   */
  public setVisible(visible: boolean): void {
    this.sprite.isVisible = visible;
    if (this.shadowPlane) {
      this.shadowPlane.isVisible = visible;
    }
  }

  /**
   * Start particle effects
   */
  public startParticles(): void {
    if (this.particleSystem) {
      this.particleSystem.start();
    }
  }

  /**
   * Stop particle effects
   */
  public stopParticles(): void {
    if (this.particleSystem) {
      this.particleSystem.stop();
    }
  }

  /**
   * Update sprite (call every frame)
   */
  public update(deltaTime: number): void {
    // Update particle emitter position to follow sprite
    if (this.particleSystem && this.sprite.position) {
      this.particleSystem.emitter = this.sprite.position.clone();
    }

    // Update shadow opacity based on height
    if (this.shadowPlane && this.sprite.position) {
      const height = this.sprite.position.y;
      const shadowMat = this.shadowPlane.material as BABYLON.StandardMaterial;
      if (shadowMat) {
        shadowMat.alpha = Math.max(0, 0.3 - height * 0.05);
      }
    }
  }

  /**
   * Dispose sprite and all effects
   */
  public dispose(): void {
    this.sprite.dispose();
    if (this.glowMesh) {
      if (sharedGlowLayer && !sharedGlowLayer.isDisposed()) {
        sharedGlowLayer.removeIncludedOnlyMesh(this.glowMesh);
      }
      unregisterGlowMesh(this.glowMesh);
      this.glowMesh.dispose();
    }
    if (this.shadowPlane) {
      this.shadowPlane.dispose();
    }
    if (this.particleSystem) {
      this.particleSystem.dispose();
    }
  }

  /**
   * Get underlying sprite (for advanced manipulation)
   */
  public getSprite(): BABYLON.Sprite {
    return this.sprite;
  }
}

/**
 * Sprite Asset Manager - Handles sprite sheet loading and caching
 */
export class SpriteAssetManager {
  private static configs: Map<string, SpriteConfig> = new Map();
  private static managers: Map<string, BABYLON.SpriteManager> = new Map();

  /**
   * Register a sprite configuration
   */
  public static registerSprite(name: string, config: SpriteConfig): void {
    this.configs.set(name, config);
  }

  /**
   * Get sprite configuration
   */
  public static getConfig(name: string): SpriteConfig | undefined {
    return this.configs.get(name);
  }

  /**
   * Create sprite instance
   */
  public static createSprite(
    name: string,
    scene: BABYLON.Scene,
    effects?: SpriteEffects
  ): SpriteRenderer | null {
    const config = this.configs.get(name);
    if (!config) {
      console.warn(`Sprite config ${name} not found`);
      return null;
    }

    return new SpriteRenderer(name, config, scene, effects);
  }

  /**
   * Preload sprite sheets
   */
  public static async preloadSprites(
    spriteNames: string[],
    scene: BABYLON.Scene
  ): Promise<void> {
    const promises = spriteNames.map((name) => {
      const config = this.configs.get(name);
      if (!config) return Promise.resolve();

      return new Promise<void>((resolve) => {
        const manager = new BABYLON.SpriteManager(
          `${name}_preload`,
          config.spriteSheetUrl,
          1,
          { width: config.frameWidth, height: config.frameHeight },
          scene
        );
        this.managers.set(name, manager);
        // Wait for texture to load
        manager.texture.onLoadObservable.addOnce(() => {
          resolve();
        });
      });
    });

    await Promise.all(promises);
  }

  /**
   * Clear all cached sprite data
   */
  public static clear(): void {
    this.managers.forEach((manager) => manager.dispose());
    this.managers.clear();
    this.configs.clear();
  }
}
