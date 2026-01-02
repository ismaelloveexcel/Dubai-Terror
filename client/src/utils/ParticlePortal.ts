/**
 * ParticlePortal - Particle-based portal system
 * Replaces heavy GLB models with lightweight particle effects
 */

import * as BABYLON from '@babylonjs/core';

export interface PortalConfig {
  type: 'blue' | 'standard' | 'large' | 'eruption';
  color1: string;
  color2: string;
  particleCount: number;
  size: number;
  rotationSpeed: number;
}

const portalConfigs: Record<string, PortalConfig> = {
  blue: {
    type: 'blue',
    color1: '#0088ff',
    color2: '#00ffff',
    particleCount: 100,
    size: 2,
    rotationSpeed: 2,
  },
  standard: {
    type: 'standard',
    color1: '#8800ff',
    color2: '#ff00ff',
    particleCount: 150,
    size: 3,
    rotationSpeed: 1.5,
  },
  large: {
    type: 'large',
    color1: '#ff0000',
    color2: '#ff6600',
    particleCount: 200,
    size: 4,
    rotationSpeed: 1,
  },
  eruption: {
    type: 'eruption',
    color1: '#ff0000',
    color2: '#ffff00',
    particleCount: 300,
    size: 5,
    rotationSpeed: 0.5,
  },
};

export class ParticlePortal {
  private scene: BABYLON.Scene;
  private config: PortalConfig;
  private position: BABYLON.Vector3;
  
  private ringMesh: BABYLON.Mesh;
  private innerMesh: BABYLON.Mesh;
  private particleSystem: BABYLON.ParticleSystem;
  private glowParticles: BABYLON.ParticleSystem;
  private rotationAngle: number = 0;
  private isActive: boolean = true;

  constructor(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    type: 'blue' | 'standard' | 'large' | 'eruption' = 'standard'
  ) {
    this.scene = scene;
    this.position = position.clone();
    this.config = portalConfigs[type];
    
    this.ringMesh = this.createRing();
    this.innerMesh = this.createInner();
    this.particleSystem = this.createMainParticles();
    this.glowParticles = this.createGlowParticles();
    
    this.particleSystem.start();
    this.glowParticles.start();
  }

  private hexToColor3(hex: string): BABYLON.Color3 {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return new BABYLON.Color3(r, g, b);
  }

  private hexToColor4(hex: string, alpha: number = 1): BABYLON.Color4 {
    const c3 = this.hexToColor3(hex);
    return new BABYLON.Color4(c3.r, c3.g, c3.b, alpha);
  }

  private createRing(): BABYLON.Mesh {
    const ring = BABYLON.MeshBuilder.CreateTorus(
      'portalRing',
      {
        diameter: this.config.size,
        thickness: 0.15,
        tessellation: 48,
      },
      this.scene
    );
    
    ring.position = this.position.clone();
    ring.rotation.x = Math.PI / 2;
    
    const mat = new BABYLON.StandardMaterial('portalRingMat', this.scene);
    mat.diffuseColor = this.hexToColor3(this.config.color1);
    mat.emissiveColor = this.hexToColor3(this.config.color1).scale(0.5);
    mat.specularColor = BABYLON.Color3.Black();
    mat.alpha = 0.9;
    ring.material = mat;
    
    return ring;
  }

  private createInner(): BABYLON.Mesh {
    const inner = BABYLON.MeshBuilder.CreateDisc(
      'portalInner',
      {
        radius: this.config.size * 0.45,
        tessellation: 32,
      },
      this.scene
    );
    
    inner.position = this.position.clone();
    inner.rotation.x = Math.PI / 2;
    
    const mat = new BABYLON.StandardMaterial('portalInnerMat', this.scene);
    mat.diffuseColor = BABYLON.Color3.Black();
    mat.emissiveColor = this.hexToColor3(this.config.color2).scale(0.3);
    mat.alpha = 0.7;
    mat.backFaceCulling = false;
    inner.material = mat;
    
    return inner;
  }

  private createMainParticles(): BABYLON.ParticleSystem {
    const ps = new BABYLON.ParticleSystem(
      'portalParticles',
      this.config.particleCount,
      this.scene
    );
    
    ps.particleTexture = new BABYLON.Texture(
      this.createParticleTexture(),
      this.scene
    );
    
    ps.emitter = this.position.clone();
    ps.createCylinderEmitter(this.config.size * 0.4, 0.1, 0, 0);
    
    ps.color1 = this.hexToColor4(this.config.color1, 1);
    ps.color2 = this.hexToColor4(this.config.color2, 1);
    ps.colorDead = new BABYLON.Color4(0, 0, 0, 0);
    
    ps.minSize = 0.05;
    ps.maxSize = 0.15;
    ps.minLifeTime = 0.5;
    ps.maxLifeTime = 1.5;
    ps.emitRate = this.config.particleCount;
    
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.gravity = new BABYLON.Vector3(0, 2, 0);
    
    ps.minEmitPower = 0.5;
    ps.maxEmitPower = 1.5;
    ps.updateSpeed = 0.02;
    
    ps.addVelocityGradient(0, 0.5);
    ps.addVelocityGradient(1, 0.1);
    
    return ps;
  }

  private createGlowParticles(): BABYLON.ParticleSystem {
    const ps = new BABYLON.ParticleSystem(
      'portalGlow',
      Math.floor(this.config.particleCount * 0.3),
      this.scene
    );
    
    ps.particleTexture = new BABYLON.Texture(
      this.createGlowTexture(),
      this.scene
    );
    
    ps.emitter = this.position.clone();
    ps.createCylinderEmitter(this.config.size * 0.5, 0.05, 0, 0);
    
    ps.color1 = this.hexToColor4(this.config.color1, 0.5);
    ps.color2 = this.hexToColor4(this.config.color2, 0.3);
    ps.colorDead = new BABYLON.Color4(0, 0, 0, 0);
    
    ps.minSize = 0.3;
    ps.maxSize = 0.8;
    ps.minLifeTime = 0.3;
    ps.maxLifeTime = 0.8;
    ps.emitRate = this.config.particleCount * 0.2;
    
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    ps.gravity = new BABYLON.Vector3(0, 0.5, 0);
    
    ps.minEmitPower = 0.2;
    ps.maxEmitPower = 0.5;
    ps.updateSpeed = 0.01;
    
    return ps;
  }

  private createParticleTexture(): string {
    return 'data:image/svg+xml;base64,' + btoa(`
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pg">
            <stop offset="0%" stop-color="white" stop-opacity="1"/>
            <stop offset="50%" stop-color="white" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="white" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#pg)"/>
      </svg>
    `);
  }

  private createGlowTexture(): string {
    return 'data:image/svg+xml;base64,' + btoa(`
      <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="gg">
            <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
            <stop offset="30%" stop-color="white" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="white" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#gg)"/>
      </svg>
    `);
  }

  public update(deltaTime: number): void {
    if (!this.isActive) return;
    
    this.rotationAngle += this.config.rotationSpeed * deltaTime;
    
    this.ringMesh.rotation.z = this.rotationAngle;
    this.innerMesh.rotation.z = -this.rotationAngle * 0.5;
    
    const ringMat = this.ringMesh.material as BABYLON.StandardMaterial;
    if (ringMat) {
      const pulse = Math.sin(this.rotationAngle * 2) * 0.2 + 0.8;
      ringMat.emissiveColor = this.hexToColor3(this.config.color1).scale(pulse * 0.5);
    }
  }

  public setPosition(position: BABYLON.Vector3): void {
    this.position = position.clone();
    this.ringMesh.position = position.clone();
    this.innerMesh.position = position.clone();
    this.particleSystem.emitter = position.clone();
    this.glowParticles.emitter = position.clone();
  }

  public getPosition(): BABYLON.Vector3 {
    return this.position.clone();
  }

  public setActive(active: boolean): void {
    this.isActive = active;
    this.ringMesh.isVisible = active;
    this.innerMesh.isVisible = active;
    
    if (active) {
      this.particleSystem.start();
      this.glowParticles.start();
    } else {
      this.particleSystem.stop();
      this.glowParticles.stop();
    }
  }

  public triggerEruption(): void {
    const burstParticles = new BABYLON.ParticleSystem(
      'portalBurst',
      200,
      this.scene
    );
    
    burstParticles.particleTexture = new BABYLON.Texture(
      this.createParticleTexture(),
      this.scene
    );
    
    burstParticles.emitter = this.position.clone();
    burstParticles.createSphereEmitter(this.config.size * 0.3);
    
    burstParticles.color1 = this.hexToColor4(this.config.color1, 1);
    burstParticles.color2 = this.hexToColor4(this.config.color2, 1);
    burstParticles.colorDead = new BABYLON.Color4(0, 0, 0, 0);
    
    burstParticles.minSize = 0.1;
    burstParticles.maxSize = 0.4;
    burstParticles.minLifeTime = 0.3;
    burstParticles.maxLifeTime = 1.0;
    
    burstParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    burstParticles.gravity = new BABYLON.Vector3(0, -2, 0);
    
    burstParticles.minEmitPower = 3;
    burstParticles.maxEmitPower = 6;
    
    burstParticles.manualEmitCount = 200;
    burstParticles.start();
    
    setTimeout(() => {
      burstParticles.dispose();
    }, 2000);
  }

  public dispose(): void {
    this.particleSystem.dispose();
    this.glowParticles.dispose();
    this.ringMesh.dispose();
    this.innerMesh.dispose();
  }
}

export class PortalManager {
  private scene: BABYLON.Scene;
  private portals: Map<string, ParticlePortal> = new Map();

  constructor(scene: BABYLON.Scene) {
    this.scene = scene;
  }

  public createPortal(
    id: string,
    position: BABYLON.Vector3,
    type: 'blue' | 'standard' | 'large' | 'eruption' = 'standard'
  ): ParticlePortal {
    const portal = new ParticlePortal(this.scene, position, type);
    this.portals.set(id, portal);
    return portal;
  }

  public getPortal(id: string): ParticlePortal | undefined {
    return this.portals.get(id);
  }

  public removePortal(id: string): void {
    const portal = this.portals.get(id);
    if (portal) {
      portal.dispose();
      this.portals.delete(id);
    }
  }

  public update(deltaTime: number): void {
    this.portals.forEach(portal => portal.update(deltaTime));
  }

  public dispose(): void {
    this.portals.forEach(portal => portal.dispose());
    this.portals.clear();
  }
}
