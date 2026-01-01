/**
 * Premium Sprite Visual Effects System
 * Screen effects, glow, distortion, and "game juice" for sprites
 */

import * as BABYLON from '@babylonjs/core';

export interface ScreenShakeConfig {
  intensity: number;
  duration: number;
  frequency: number;
}

export interface ImpactEffectConfig {
  color: BABYLON.Color3;
  size: number;
  duration: number;
  particleCount: number;
}

/**
 * Premium visual effects for sprite-based gameplay
 */
export class SpriteEffectsSystem {
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;
  private originalCameraPosition: BABYLON.Vector3;
  private shakeActive: boolean = false;

  // Effect pools for performance
  private impactParticleSystems: Map<string, BABYLON.ParticleSystem> = new Map();

  constructor(scene: BABYLON.Scene, camera: BABYLON.Camera) {
    this.scene = scene;
    this.camera = camera;
    this.originalCameraPosition = camera.position.clone();
  }

  /**
   * Screen shake effect (on hit, boss attack, etc.)
   */
  public async screenShake(config: ScreenShakeConfig): Promise<void> {
    if (this.shakeActive) return;

    this.shakeActive = true;
    const startTime = Date.now();
    const { intensity, duration, frequency } = config;

    return new Promise((resolve) => {
      const shakeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        if (elapsed >= duration) {
          clearInterval(shakeInterval);
          this.camera.position = this.originalCameraPosition.clone();
          this.shakeActive = false;
          resolve();
          return;
        }

        // Decay intensity over time
        const decay = 1 - elapsed / duration;
        const currentIntensity = intensity * decay;

        // Random shake
        const offsetX = (Math.random() - 0.5) * currentIntensity;
        const offsetY = (Math.random() - 0.5) * currentIntensity;
        const offsetZ = (Math.random() - 0.5) * currentIntensity;

        this.camera.position.x = this.originalCameraPosition.x + offsetX;
        this.camera.position.y = this.originalCameraPosition.y + offsetY;
        this.camera.position.z = this.originalCameraPosition.z + offsetZ;
      }, 1000 / frequency);
    });
  }

  /**
   * Impact effect (when hitting enemy or getting hit)
   */
  public createImpactEffect(
    position: BABYLON.Vector3,
    config: ImpactEffectConfig
  ): void {
    const particleSystem = new BABYLON.ParticleSystem(
      'impact',
      config.particleCount,
      this.scene
    );

    // Particle texture (simple circle)
    particleSystem.particleTexture = new BABYLON.Texture(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
      this.scene
    );

    // Particle properties
    particleSystem.color1 = new BABYLON.Color4(
      config.color.r,
      config.color.g,
      config.color.b,
      1
    );
    particleSystem.color2 = new BABYLON.Color4(
      config.color.r,
      config.color.g,
      config.color.b,
      0
    );
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    particleSystem.minSize = config.size * 0.5;
    particleSystem.maxSize = config.size;
    particleSystem.minLifeTime = config.duration * 0.5;
    particleSystem.maxLifeTime = config.duration;

    particleSystem.emitter = position;
    particleSystem.emitRate = config.particleCount / config.duration;
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    particleSystem.minEmitPower = 2;
    particleSystem.maxEmitPower = 5;
    particleSystem.updateSpeed = 0.01;

    particleSystem.direction1 = new BABYLON.Vector3(-1, 0, -1);
    particleSystem.direction2 = new BABYLON.Vector3(1, 2, 1);

    particleSystem.start();

    // Auto-dispose after duration
    setTimeout(() => {
      particleSystem.stop();
      setTimeout(() => particleSystem.dispose(), 1000);
    }, config.duration);
  }

  /**
   * Death explosion effect (when enemy dies)
   */
  public createDeathExplosion(
    position: BABYLON.Vector3,
    color: BABYLON.Color3
  ): void {
    this.createImpactEffect(position, {
      color,
      size: 0.3,
      duration: 800,
      particleCount: 50,
    });

    // Add screen shake
    this.screenShake({
      intensity: 0.1,
      duration: 200,
      frequency: 60,
    });
  }

  /**
   * Damage flash effect (screen flash red when hit)
   */
  public damageFlash(): void {
    // Create fullscreen overlay
    const overlay = BABYLON.MeshBuilder.CreatePlane(
      'damageFlash',
      { size: 10 },
      this.scene
    );

    const mat = new BABYLON.StandardMaterial('flashMat', this.scene);
    mat.diffuseColor = new BABYLON.Color3(0.8, 0, 0); // Red
    mat.emissiveColor = new BABYLON.Color3(0.8, 0, 0);
    mat.alpha = 0.3;
    mat.disableLighting = true;
    overlay.material = mat;

    // Position in front of camera
    overlay.position = this.camera.position.add(
      this.camera
        .getDirection(BABYLON.Vector3.Forward())
        .scale(2)
    );
    overlay.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

    // Fade out and dispose
    let alpha = 0.3;
    const fadeInterval = setInterval(() => {
      alpha -= 0.03;
      mat.alpha = alpha;
      if (alpha <= 0) {
        clearInterval(fadeInterval);
        overlay.dispose();
      }
    }, 16); // 60 FPS
  }

  /**
   * Boss entrance effect (dramatic entrance)
   */
  public async bossEntrance(
    bossPosition: BABYLON.Vector3,
    color: BABYLON.Color3
  ): Promise<void> {
    // Screen shake
    await this.screenShake({
      intensity: 0.5,
      duration: 1000,
      frequency: 30,
    });

    // Particle burst
    this.createImpactEffect(bossPosition, {
      color,
      size: 0.5,
      duration: 2000,
      particleCount: 200,
    });
  }

  /**
   * Hit stop effect (brief pause on critical hit for impact)
   */
  public async hitStop(duration: number = 100): Promise<void> {
    const originalTimeScale = (this.scene as any).timeScale || 1;
    (this.scene as any).timeScale = 0.1; // Slow motion

    await new Promise((resolve) => setTimeout(resolve, duration));

    (this.scene as any).timeScale = originalTimeScale;
  }

  /**
   * Muzzle flash effect (weapon firing)
   */
  public muzzleFlash(position: BABYLON.Vector3): void {
    const light = new BABYLON.PointLight(
      'muzzleFlash',
      position,
      this.scene
    );
    light.intensity = 3;
    light.range = 10;
    light.diffuse = new BABYLON.Color3(1, 0.8, 0.4); // Orange flash

    // Quick fade and dispose
    let intensity = 3;
    const fadeInterval = setInterval(() => {
      intensity -= 0.5;
      light.intensity = intensity;
      if (intensity <= 0) {
        clearInterval(fadeInterval);
        light.dispose();
      }
    }, 16);
  }

  /**
   * Glow pulse effect (for objectives, evidence, etc.)
   */
  public createGlowPulse(
    mesh: BABYLON.AbstractMesh,
    color: BABYLON.Color3,
    speed: number = 2
  ): void {
    let time = 0;
    const pulseObserver = this.scene.onBeforeRenderObservable.add(() => {
      time += this.scene.getEngine().getDeltaTime() * 0.001 * speed;
      const pulse = Math.sin(time) * 0.5 + 0.5; // 0 to 1

      const material = mesh.material as BABYLON.StandardMaterial;
      if (material && material.emissiveColor) {
        material.emissiveColor = color.scale(pulse);
      }
    });

    // Store observer for cleanup
    (mesh as any).glowPulseObserver = pulseObserver;
  }

  /**
   * Remove glow pulse
   */
  public removeGlowPulse(mesh: BABYLON.AbstractMesh): void {
    if ((mesh as any).glowPulseObserver) {
      this.scene.onBeforeRenderObservable.remove(
        (mesh as any).glowPulseObserver
      );
      (mesh as any).glowPulseObserver = null;
    }
  }

  /**
   * Trail effect (for fast-moving sprites)
   */
  public createTrailEffect(
    position: BABYLON.Vector3,
    direction: BABYLON.Vector3,
    color: BABYLON.Color3
  ): void {
    // Create stretched particle trail
    const trail = BABYLON.MeshBuilder.CreatePlane(
      'trail',
      { width: 0.5, height: 2 },
      this.scene
    );

    const mat = new BABYLON.StandardMaterial('trailMat', this.scene);
    mat.diffuseColor = color;
    mat.emissiveColor = color;
    mat.alpha = 0.4;
    mat.disableLighting = true;
    trail.material = mat;

    trail.position = position.clone();
    trail.lookAt(position.add(direction));
    trail.billboardMode = BABYLON.Mesh.BILLBOARDMODE_Y;

    // Fade and shrink
    let alpha = 0.4;
    let scale = 1;
    const fadeInterval = setInterval(() => {
      alpha -= 0.04;
      scale -= 0.1;
      mat.alpha = alpha;
      trail.scaling = new BABYLON.Vector3(scale, scale, scale);

      if (alpha <= 0) {
        clearInterval(fadeInterval);
        trail.dispose();
      }
    }, 16);
  }

  /**
   * Slow motion effect (for dramatic moments)
   */
  public slowMotion(duration: number, timeScale: number = 0.3): void {
    const originalTimeScale = (this.scene as any).timeScale || 1;
    (this.scene as any).timeScale = timeScale;

    setTimeout(() => {
      (this.scene as any).timeScale = originalTimeScale;
    }, duration);
  }

  /**
   * Update camera position reference (call when camera moves)
   */
  public updateCameraReference(): void {
    if (!this.shakeActive) {
      this.originalCameraPosition = this.camera.position.clone();
    }
  }

  /**
   * Dispose all effects
   */
  public dispose(): void {
    this.impactParticleSystems.forEach((ps) => ps.dispose());
    this.impactParticleSystems.clear();
  }
}

/**
 * Preset effect configurations
 */
export const EffectPresets = {
  // Enemy hit
  enemyHit: {
    screenShake: { intensity: 0.05, duration: 100, frequency: 60 },
    impact: {
      color: new BABYLON.Color3(0, 1, 0.8), // Teal
      size: 0.2,
      duration: 300,
      particleCount: 20,
    },
  },

  // Enemy death
  enemyDeath: {
    screenShake: { intensity: 0.1, duration: 200, frequency: 60 },
    impact: {
      color: new BABYLON.Color3(0, 1, 0.8),
      size: 0.3,
      duration: 600,
      particleCount: 50,
    },
  },

  // Boss hit
  bossHit: {
    screenShake: { intensity: 0.15, duration: 150, frequency: 60 },
    impact: {
      color: new BABYLON.Color3(0.8, 0, 0), // Red
      size: 0.4,
      duration: 400,
      particleCount: 40,
    },
    hitStop: 120,
  },

  // Boss death
  bossDeath: {
    screenShake: { intensity: 0.5, duration: 1000, frequency: 30 },
    impact: {
      color: new BABYLON.Color3(0.8, 0, 0),
      size: 1.0,
      duration: 2000,
      particleCount: 200,
    },
  },

  // Player damage
  playerDamage: {
    screenShake: { intensity: 0.2, duration: 200, frequency: 60 },
  },

  // Evidence collected
  evidenceCollected: {
    impact: {
      color: new BABYLON.Color3(1, 0.84, 0), // Gold
      size: 0.3,
      duration: 800,
      particleCount: 30,
    },
  },
};
