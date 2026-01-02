/**
 * Realistic Graphics Effects System
 * Enhanced visual effects without 3D asset generation
 * Implements techniques from REALISTIC_GRAPHICS_ENHANCEMENT.md
 */

import * as BABYLON from '@babylonjs/core';

/**
 * Atmospheric dust particles for realistic ambiance
 */
export class AtmosphericDust {
  private particleSystem: BABYLON.ParticleSystem;
  private scene: BABYLON.Scene;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.particleSystem = new BABYLON.ParticleSystem('atmosphericDust', 300, scene);
    this.setup();
  }

  private setup(): void {
    // Use a simple circle texture for dust particles
    this.particleSystem.particleTexture = new BABYLON.Texture(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIzIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjgiLz48L3N2Zz4=',
      this.scene
    );

    // Spawn in large area around camera
    this.particleSystem.emitter = new BABYLON.Vector3(0, 2, 0);
    this.particleSystem.minEmitBox = new BABYLON.Vector3(-15, -3, -15);
    this.particleSystem.maxEmitBox = new BABYLON.Vector3(15, 8, 15);

    // Slow, drifting motion
    this.particleSystem.direction1 = new BABYLON.Vector3(-0.05, -0.01, -0.05);
    this.particleSystem.direction2 = new BABYLON.Vector3(0.05, 0.02, 0.05);
    this.particleSystem.minEmitPower = 0.01;
    this.particleSystem.maxEmitPower = 0.03;

    // Long-lived particles
    this.particleSystem.minLifeTime = 6;
    this.particleSystem.maxLifeTime = 12;
    this.particleSystem.emitRate = 20;

    // Tiny particles
    this.particleSystem.minSize = 0.01;
    this.particleSystem.maxSize = 0.025;

    // Subtle coloring with slight teal tint for horror atmosphere
    this.particleSystem.color1 = new BABYLON.Color4(0.4, 0.45, 0.5, 0.25);
    this.particleSystem.color2 = new BABYLON.Color4(0.3, 0.35, 0.4, 0.1);
    this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    this.particleSystem.updateSpeed = 0.004;
    this.particleSystem.gravity = new BABYLON.Vector3(0, -0.01, 0);
  }

  public start(): void {
    this.particleSystem.start();
  }

  public stop(): void {
    this.particleSystem.stop();
  }

  public updateEmitterPosition(position: BABYLON.Vector3): void {
    this.particleSystem.emitter = position.clone();
  }

  public dispose(): void {
    this.particleSystem.dispose();
  }
}

/**
 * Ground fog effect using particles
 */
export class GroundFog {
  private particleSystem: BABYLON.ParticleSystem;
  private scene: BABYLON.Scene;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
    this.particleSystem = new BABYLON.ParticleSystem('groundFog', 100, scene);
    this.setup();
  }

  private setup(): void {
    // Larger, softer fog particles
    this.particleSystem.particleTexture = new BABYLON.Texture(
      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHJhZGlhbEdyYWRpZW50IGlkPSJmb2ciPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IndoaXRlIiBzdG9wLW9wYWNpdHk9IjAuNCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0id2hpdGUiIHN0b3Atb3BhY2l0eT0iMCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjMyIiBjeT0iMzIiIHI9IjMwIiBmaWxsPSJ1cmwoI2ZvZykiLz48L3N2Zz4=',
      this.scene
    );

    this.particleSystem.emitter = new BABYLON.Vector3(0, 0.3, 0);
    this.particleSystem.minEmitBox = new BABYLON.Vector3(-30, 0, -30);
    this.particleSystem.maxEmitBox = new BABYLON.Vector3(30, 0.5, 30);

    this.particleSystem.minSize = 3;
    this.particleSystem.maxSize = 6;
    this.particleSystem.minLifeTime = 8;
    this.particleSystem.maxLifeTime = 15;
    this.particleSystem.emitRate = 8;

    // Dark bluish fog color matching horror atmosphere
    this.particleSystem.color1 = new BABYLON.Color4(0.08, 0.08, 0.12, 0.12);
    this.particleSystem.color2 = new BABYLON.Color4(0.06, 0.06, 0.1, 0.06);
    this.particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

    this.particleSystem.direction1 = new BABYLON.Vector3(-0.3, 0, -0.3);
    this.particleSystem.direction2 = new BABYLON.Vector3(0.3, 0.1, 0.3);

    this.particleSystem.minEmitPower = 0.05;
    this.particleSystem.maxEmitPower = 0.15;

    this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    this.particleSystem.updateSpeed = 0.003;
  }

  public start(): void {
    this.particleSystem.start();
  }

  public stop(): void {
    this.particleSystem.stop();
  }

  public dispose(): void {
    this.particleSystem.dispose();
  }
}

/**
 * Flickering light effect with deterministic noise
 */
export class FlickeringLight {
  private light: BABYLON.PointLight;
  private scene: BABYLON.Scene;
  private baseIntensity: number;
  private seed: number;
  private observer: BABYLON.Nullable<BABYLON.Observer<BABYLON.Scene>> = null;
  private time: number = 0;

  constructor(
    scene: BABYLON.Scene,
    name: string,
    position: BABYLON.Vector3,
    color: BABYLON.Color3 = new BABYLON.Color3(1, 0.4, 0),
    intensity: number = 1.5,
    range: number = 15
  ) {
    this.scene = scene;
    this.baseIntensity = intensity;
    this.seed = position.x * 1000 + position.z;

    this.light = new BABYLON.PointLight(name, position, scene);
    this.light.diffuse = color;
    this.light.intensity = 0;
    this.light.range = range;
    
    this.startFlickering();
  }

  private seededNoise(t: number): number {
    return Math.sin(t * 17.3 + this.seed) * 0.5 + 0.5;
  }

  private startFlickering(): void {
    this.observer = this.scene.onBeforeRenderObservable.add(() => {
      this.time += this.scene.getEngine().getDeltaTime() * 0.001;

      // Complex deterministic flicker pattern
      const flicker1 = Math.sin(this.time * 8) > 0 ? 1 : 0;
      const flicker2 = Math.sin(this.time * 3.7 + 1) > 0.3 ? 1 : 0.3;
      const flicker3 = this.seededNoise(this.time * 20) > 0.92 ? 0 : 1;

      this.light.intensity = this.baseIntensity * flicker1 * flicker2 * flicker3;
    });
  }

  public getLight(): BABYLON.PointLight {
    return this.light;
  }

  public dispose(): void {
    if (this.observer) {
      this.scene.onBeforeRenderObservable.remove(this.observer);
    }
    this.light.dispose();
  }
}

/**
 * Fire/torch light with organic flickering
 */
export class FireLight {
  private light: BABYLON.PointLight;
  private scene: BABYLON.Scene;
  private baseIntensity: number;
  private observer: BABYLON.Nullable<BABYLON.Observer<BABYLON.Scene>> = null;
  private time: number = 0;

  constructor(
    scene: BABYLON.Scene,
    name: string,
    position: BABYLON.Vector3,
    intensity: number = 1.0,
    range: number = 10
  ) {
    this.scene = scene;
    this.baseIntensity = intensity;

    this.light = new BABYLON.PointLight(name, position, scene);
    this.light.diffuse = new BABYLON.Color3(1, 0.6, 0.2);
    this.light.intensity = intensity;
    this.light.range = range;

    this.startFlickering();
  }

  private startFlickering(): void {
    this.observer = this.scene.onBeforeRenderObservable.add(() => {
      this.time += this.scene.getEngine().getDeltaTime() * 0.001;

      // Organic flickering using multiple sine waves
      const noise1 = Math.sin(this.time * 5) * 0.5 + 0.5;
      const noise2 = Math.sin(this.time * 7.3 + 2) * 0.5 + 0.5;
      const noise3 = Math.sin(this.time * 11.7 + 4) * 0.3 + 0.7;

      this.light.intensity = this.baseIntensity * (0.8 + (noise1 * noise2 * noise3) * 0.4);
    });
  }

  public getLight(): BABYLON.PointLight {
    return this.light;
  }

  public dispose(): void {
    if (this.observer) {
      this.scene.onBeforeRenderObservable.remove(this.observer);
    }
    this.light.dispose();
  }
}

/**
 * Enhanced ambient lighting for GI approximation
 */
export class AmbientGI {
  private skyLight: BABYLON.HemisphericLight;
  private bounceLight: BABYLON.HemisphericLight;
  private leftFill: BABYLON.DirectionalLight;
  private rightFill: BABYLON.DirectionalLight;
  private scene: BABYLON.Scene;

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;

    // Main hemisphere (sky/ceiling) - cool blue
    this.skyLight = new BABYLON.HemisphericLight(
      'skyLight',
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    this.skyLight.intensity = 0.08;
    this.skyLight.diffuse = new BABYLON.Color3(0.05, 0.08, 0.15);
    this.skyLight.groundColor = new BABYLON.Color3(0.02, 0.02, 0.05);
    this.skyLight.specular = BABYLON.Color3.Black();

    // Floor bounce (bottom-up) - warm
    this.bounceLight = new BABYLON.HemisphericLight(
      'bounceLight',
      new BABYLON.Vector3(0, -1, 0),
      scene
    );
    this.bounceLight.intensity = 0.03;
    this.bounceLight.diffuse = new BABYLON.Color3(0.03, 0.02, 0.02);
    this.bounceLight.specular = BABYLON.Color3.Black();

    // Left fill - cool teal
    this.leftFill = new BABYLON.DirectionalLight(
      'leftFill',
      new BABYLON.Vector3(1, -0.5, 0),
      scene
    );
    this.leftFill.intensity = 0.04;
    this.leftFill.diffuse = new BABYLON.Color3(0, 0.05, 0.08);
    this.leftFill.specular = BABYLON.Color3.Black();

    // Right fill - warm orange
    this.rightFill = new BABYLON.DirectionalLight(
      'rightFill',
      new BABYLON.Vector3(-1, -0.5, 0),
      scene
    );
    this.rightFill.intensity = 0.02;
    this.rightFill.diffuse = new BABYLON.Color3(0.08, 0.03, 0);
    this.rightFill.specular = BABYLON.Color3.Black();
  }

  public setIntensityMultiplier(multiplier: number): void {
    this.skyLight.intensity = 0.08 * multiplier;
    this.bounceLight.intensity = 0.03 * multiplier;
    this.leftFill.intensity = 0.04 * multiplier;
    this.rightFill.intensity = 0.02 * multiplier;
  }

  public dispose(): void {
    this.skyLight.dispose();
    this.bounceLight.dispose();
    this.leftFill.dispose();
    this.rightFill.dispose();
  }
}

/**
 * Animated vignette effect
 */
export class AnimatedVignette {
  private pipeline: BABYLON.DefaultRenderingPipeline;
  private scene: BABYLON.Scene;
  private baseWeight: number;
  private observer: BABYLON.Nullable<BABYLON.Observer<BABYLON.Scene>> = null;
  private time: number = 0;

  constructor(
    scene: BABYLON.Scene,
    pipeline: BABYLON.DefaultRenderingPipeline,
    baseWeight: number = 1.2
  ) {
    this.scene = scene;
    this.pipeline = pipeline;
    this.baseWeight = baseWeight;
  }

  public startPulsing(speed: number = 0.5, amplitude: number = 0.1): void {
    this.observer = this.scene.onBeforeRenderObservable.add(() => {
      this.time += this.scene.getEngine().getDeltaTime() * 0.001;
      const pulse = Math.sin(this.time * speed) * amplitude;
      this.pipeline.imageProcessing.vignetteWeight = this.baseWeight + pulse;
    });
  }

  public stopPulsing(): void {
    if (this.observer) {
      this.scene.onBeforeRenderObservable.remove(this.observer);
      this.observer = null;
    }
    this.pipeline.imageProcessing.vignetteWeight = this.baseWeight;
  }

  public setDangerMode(healthPercent: number): void {
    if (healthPercent < 0.3) {
      const dangerPulse = Math.sin(this.time * 3) * 0.5 + 0.5;
      const intensity = (1 - healthPercent / 0.3) * dangerPulse;
      this.pipeline.imageProcessing.vignetteWeight = this.baseWeight + intensity;
      this.pipeline.imageProcessing.vignetteColor = new BABYLON.Color4(0.5, 0, 0, 1);
    }
  }

  public dispose(): void {
    this.stopPulsing();
  }
}

/**
 * SSAO (Screen Space Ambient Occlusion) wrapper
 */
export class SSAOEffect {
  private ssao: BABYLON.SSAO2RenderingPipeline | null = null;
  private scene: BABYLON.Scene;

  constructor(scene: BABYLON.Scene, camera: BABYLON.Camera, isMobile: boolean = false) {
    this.scene = scene;

    try {
      const ssaoRatio = {
        ssaoRatio: isMobile ? 0.25 : 0.5,
        blurRatio: isMobile ? 0.25 : 0.5
      };

      this.ssao = new BABYLON.SSAO2RenderingPipeline(
        'ssao',
        scene,
        ssaoRatio,
        [camera]
      );

      // Configure SSAO parameters
      this.ssao.radius = isMobile ? 1.5 : 2.5;
      this.ssao.totalStrength = isMobile ? 1.0 : 1.3;
      this.ssao.base = 0.1;
      this.ssao.expensiveBlur = !isMobile;
      this.ssao.samples = isMobile ? 8 : 16;
      this.ssao.maxZ = 80;
    } catch (e) {
      console.warn('SSAO not supported on this device:', e);
      this.ssao = null;
    }
  }

  public setEnabled(enabled: boolean): void {
    if (this.ssao) {
      // SSAO2RenderingPipeline doesn't have a simple enable/disable
      // We can adjust totalStrength instead
      this.ssao.totalStrength = enabled ? 1.3 : 0;
    }
  }

  public setIntensity(intensity: number): void {
    if (this.ssao) {
      this.ssao.totalStrength = intensity;
    }
  }

  public dispose(): void {
    if (this.ssao) {
      this.ssao.dispose();
    }
  }
}

/**
 * Enhanced shadow configuration
 */
export class RealisticShadows {
  private shadowGenerator: BABYLON.ShadowGenerator | null = null;

  constructor(
    scene: BABYLON.Scene,
    light: BABYLON.DirectionalLight,
    mapSize: number = 1024,
    isMobile: boolean = false
  ) {
    this.shadowGenerator = new BABYLON.ShadowGenerator(mapSize, light);

    if (isMobile) {
      // Mobile-optimized shadows
      this.shadowGenerator.useBlurExponentialShadowMap = true;
      this.shadowGenerator.blurKernel = 16;
      this.shadowGenerator.darkness = 0.4;
    } else {
      // High-quality desktop shadows with contact hardening
      this.shadowGenerator.usePercentageCloserFiltering = true;
      this.shadowGenerator.filteringQuality = BABYLON.ShadowGenerator.QUALITY_MEDIUM;
      this.shadowGenerator.useBlurExponentialShadowMap = true;
      this.shadowGenerator.blurKernel = 32;
      this.shadowGenerator.blurScale = 2;
      this.shadowGenerator.darkness = 0.3;
      this.shadowGenerator.transparencyShadow = true;

      // Contact hardening for realistic shadow edges (if supported)
      try {
        this.shadowGenerator.useContactHardeningShadow = true;
        this.shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
      } catch (e) {
        console.warn('Contact hardening shadows not supported');
      }
    }
  }

  public getShadowGenerator(): BABYLON.ShadowGenerator | null {
    return this.shadowGenerator;
  }

  public addShadowCaster(mesh: BABYLON.Mesh): void {
    if (this.shadowGenerator) {
      this.shadowGenerator.addShadowCaster(mesh);
    }
  }

  public dispose(): void {
    if (this.shadowGenerator) {
      this.shadowGenerator.dispose();
    }
  }
}

/**
 * Main Realistic Effects Manager
 */
export class RealisticEffectsManager {
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;
  private isMobile: boolean;

  private atmosphericDust: AtmosphericDust | null = null;
  private groundFog: GroundFog | null = null;
  private ambientGI: AmbientGI | null = null;
  private ssaoEffect: SSAOEffect | null = null;
  private animatedVignette: AnimatedVignette | null = null;
  private flickeringLights: FlickeringLight[] = [];
  private fireLights: FireLight[] = [];

  constructor(scene: BABYLON.Scene, camera: BABYLON.Camera, isMobile: boolean = false) {
    this.scene = scene;
    this.camera = camera;
    this.isMobile = isMobile;
  }

  /**
   * Enable atmospheric dust particles
   */
  public enableAtmosphericDust(): AtmosphericDust {
    if (!this.atmosphericDust) {
      this.atmosphericDust = new AtmosphericDust(this.scene);
    }
    this.atmosphericDust.start();

    // Update dust position with camera
    this.scene.onBeforeRenderObservable.add(() => {
      if (this.atmosphericDust && this.camera) {
        this.atmosphericDust.updateEmitterPosition(this.camera.position);
      }
    });

    return this.atmosphericDust;
  }

  /**
   * Enable ground fog effect
   */
  public enableGroundFog(): GroundFog {
    if (!this.groundFog) {
      this.groundFog = new GroundFog(this.scene);
    }
    this.groundFog.start();
    return this.groundFog;
  }

  /**
   * Enable ambient GI approximation
   */
  public enableAmbientGI(): AmbientGI {
    if (!this.ambientGI) {
      this.ambientGI = new AmbientGI(this.scene);
    }
    return this.ambientGI;
  }

  /**
   * Enable SSAO (Screen Space Ambient Occlusion)
   */
  public enableSSAO(): SSAOEffect | null {
    if (!this.ssaoEffect && !this.isMobile) {
      this.ssaoEffect = new SSAOEffect(this.scene, this.camera, this.isMobile);
    }
    return this.ssaoEffect;
  }

  /**
   * Enable animated vignette
   */
  public enableAnimatedVignette(pipeline: BABYLON.DefaultRenderingPipeline): AnimatedVignette {
    if (!this.animatedVignette) {
      this.animatedVignette = new AnimatedVignette(this.scene, pipeline);
    }
    this.animatedVignette.startPulsing(0.5, 0.08);
    return this.animatedVignette;
  }

  /**
   * Add a flickering emergency light
   */
  public addFlickeringLight(
    name: string,
    position: BABYLON.Vector3,
    color?: BABYLON.Color3,
    intensity?: number
  ): FlickeringLight {
    const light = new FlickeringLight(this.scene, name, position, color, intensity);
    this.flickeringLights.push(light);
    return light;
  }

  /**
   * Add a fire/torch light
   */
  public addFireLight(
    name: string,
    position: BABYLON.Vector3,
    intensity?: number
  ): FireLight {
    const light = new FireLight(this.scene, name, position, intensity);
    this.fireLights.push(light);
    return light;
  }

  /**
   * Enable all recommended effects for realistic graphics
   */
  public enableAllEffects(pipeline?: BABYLON.DefaultRenderingPipeline): void {
    this.enableAtmosphericDust();
    
    if (!this.isMobile) {
      this.enableGroundFog();
      this.enableAmbientGI();
      this.enableSSAO();
    }
    
    if (pipeline) {
      this.enableAnimatedVignette(pipeline);
    }
  }

  /**
   * Dispose all effects
   */
  public dispose(): void {
    this.atmosphericDust?.dispose();
    this.groundFog?.dispose();
    this.ambientGI?.dispose();
    this.ssaoEffect?.dispose();
    this.animatedVignette?.dispose();
    this.flickeringLights.forEach(light => light.dispose());
    this.fireLights.forEach(light => light.dispose());
    this.flickeringLights = [];
    this.fireLights = [];
  }
}

export default RealisticEffectsManager;
