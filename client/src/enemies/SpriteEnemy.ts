/**
 * SpriteEnemy - Base class for sprite-based enemies
 * Uses 2D billboard sprites instead of 3D models
 */

import * as BABYLON from '@babylonjs/core';
import { IEnemy, EnemyType, IDamageable } from '../types';
import { enemyConfig } from '../config/gameConfig';
import { spriteConfigs, getSpriteEffectsForEnemy } from '../config/spriteConfig';
import { SpriteRenderer, SpriteEffects } from '../utils/SpriteRenderer';

export abstract class SpriteEnemy implements IEnemy, IDamageable {
  protected scene: BABYLON.Scene;
  protected spriteRenderer: SpriteRenderer | null = null;
  protected collisionMesh: BABYLON.Mesh;
  
  public mesh: BABYLON.Mesh;
  public position: BABYLON.Vector3;
  
  public type: EnemyType;
  public health: number;
  public maxHealth: number;
  public damage: number;
  public speed: number;
  public attackRange: number;
  public detectionRange: number;
  public isAlerted: boolean = false;
  public target: BABYLON.Vector3 | null = null;
  
  protected isAttacking: boolean = false;
  protected attackCooldown: number = 0;
  protected attackCooldownMax: number;
  protected isDying: boolean = false;
  protected points: number;
  protected currentAnimation: string = 'idle';
  
  public onDeath?: () => void;
  public onAttack?: (damage: number) => void;
  
  constructor(scene: BABYLON.Scene, type: EnemyType, position: BABYLON.Vector3) {
    this.scene = scene;
    this.type = type;
    this.position = position.clone();
    
    const config = enemyConfig[type as keyof typeof enemyConfig];
    if (config) {
      this.maxHealth = config.health;
      this.health = config.health;
      this.damage = config.damage;
      this.speed = config.speed;
      this.attackRange = config.attackRange;
      this.attackCooldownMax = config.attackCooldown;
      this.detectionRange = config.detectionRange;
      this.points = config.points;
    } else {
      this.maxHealth = 50;
      this.health = 50;
      this.damage = 10;
      this.speed = 3;
      this.attackRange = 2;
      this.attackCooldownMax = 1.5;
      this.detectionRange = 20;
      this.points = 100;
    }
    
    this.attackCooldown = 0;
    
    this.collisionMesh = this.createCollisionMesh();
    this.mesh = this.collisionMesh;
    this.mesh.position = position.clone();
    
    this.initializeSprite();
  }
  
  private createCollisionMesh(): BABYLON.Mesh {
    const mesh = BABYLON.MeshBuilder.CreateBox(
      `enemy_${this.type}_collision`,
      { width: 1, height: 2, depth: 1 },
      this.scene
    );
    
    mesh.isVisible = false;
    mesh.checkCollisions = true;
    mesh.isPickable = true;
    
    return mesh;
  }
  
  protected initializeSprite(): void {
    const spriteType = this.getSpriteType();
    const config = spriteConfigs[spriteType];
    
    if (!config) {
      console.warn(`No sprite config for ${spriteType}, using fallback`);
      return;
    }
    
    const effectPreset = getSpriteEffectsForEnemy(spriteType);
    const effects: SpriteEffects = {
      glowColor: new BABYLON.Color3(
        effectPreset.glowColor.r,
        effectPreset.glowColor.g,
        effectPreset.glowColor.b
      ),
      glowIntensity: effectPreset.glowIntensity,
      shadowEnabled: effectPreset.shadowEnabled,
      particleTrail: effectPreset.particleTrail,
    };
    
    this.spriteRenderer = new SpriteRenderer(
      `${this.type}_sprite`,
      config,
      this.scene,
      effects
    );
    
    this.spriteRenderer.setPosition(this.position);
    this.spriteRenderer.setSize(this.getSize());
    this.spriteRenderer.playAnimation('idle');
    
    if (effects.particleTrail) {
      this.spriteRenderer.startParticles();
    }
  }
  
  protected getSpriteType(): string {
    switch (this.type) {
      case EnemyType.DEMODOG: return 'demodog';
      case EnemyType.DEMOBAT: return 'demobat';
      case EnemyType.DEMOGORGON: return 'demogorgon';
      case EnemyType.MIND_FLAYER: return 'mindFlayer';
      case EnemyType.VECNA: return 'vecna';
      case EnemyType.SWARM: return 'swarm';
      case EnemyType.FLYING: return 'flying';
      case EnemyType.ELITE: return 'elite';
      default: return 'demodog';
    }
  }
  
  protected getSize(): number {
    switch (this.type) {
      case EnemyType.DEMOBAT: return 1.0;
      case EnemyType.DEMODOG: return 1.5;
      case EnemyType.SWARM: return 0.6;
      case EnemyType.FLYING: return 1.2;
      case EnemyType.DEMOGORGON: return 2.5;
      case EnemyType.ELITE: return 2.0;
      case EnemyType.MIND_FLAYER: return 5.0;
      case EnemyType.VECNA: return 2.2;
      default: return 1.5;
    }
  }
  
  public setSize(size: number): void {
    if (this.spriteRenderer) {
      this.spriteRenderer.setSize(size);
    }
  }
  
  public update(deltaTime: number): void {
    if (this.isDying || this.isDead()) return;
    
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }
    
    this.updateMovement(deltaTime);
    this.checkAttack();
    
    this.position = this.mesh.position.clone();
    
    if (this.spriteRenderer) {
      this.spriteRenderer.setPosition(this.position);
      this.spriteRenderer.update(deltaTime);
    }
  }
  
  protected abstract updateMovement(deltaTime: number): void;
  
  protected checkAttack(): void {
    if (!this.target || this.isAttacking || this.attackCooldown > 0) return;
    
    const distance = BABYLON.Vector3.Distance(this.position, this.target);
    if (distance <= this.attackRange) {
      this.attack();
    }
  }
  
  protected attack(): void {
    this.isAttacking = true;
    this.attackCooldown = this.attackCooldownMax;
    
    this.playAnimation('attack');
    
    this.onAttack?.(this.damage);
    
    setTimeout(() => {
      this.isAttacking = false;
      if (!this.isDead()) {
        this.playAnimation('idle');
      }
    }, 500);
  }
  
  protected playAnimation(animName: string): void {
    if (this.currentAnimation === animName) return;
    this.currentAnimation = animName;
    
    if (this.spriteRenderer) {
      this.spriteRenderer.playAnimation(animName);
    }
  }
  
  public takeDamage(amount: number): void {
    if (this.isDying) return;
    
    this.health -= amount;
    
    this.playAnimation('hurt');
    setTimeout(() => {
      if (!this.isDead() && !this.isDying) {
        this.playAnimation('idle');
      }
    }, 200);
    
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }
  
  public heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
  
  public isDead(): boolean {
    return this.health <= 0;
  }
  
  public get isAlive(): boolean {
    return !this.isDead() && !this.isDying;
  }
  
  protected die(): void {
    if (this.isDying) return;
    this.isDying = true;
    
    this.playAnimation('death');
    
    setTimeout(() => {
      this.onDeath?.();
      this.dispose();
    }, 1000);
  }
  
  public setTarget(target: BABYLON.Vector3): void {
    this.target = target;
    this.isAlerted = true;
  }
  
  public clearTarget(): void {
    this.target = null;
    this.isAlerted = false;
  }
  
  protected moveToward(target: BABYLON.Vector3, deltaTime: number): void {
    const direction = target.subtract(this.position);
    direction.y = 0;
    direction.normalize();
    
    const velocity = direction.scale(this.speed * deltaTime);
    this.mesh.moveWithCollisions(velocity);
    
    this.mesh.lookAt(new BABYLON.Vector3(target.x, this.mesh.position.y, target.z));
    
    if (this.currentAnimation !== 'attack' && this.currentAnimation !== 'hurt') {
      this.playAnimation('walk');
    }
  }
  
  public dispose(): void {
    if (this.spriteRenderer) {
      this.spriteRenderer.dispose();
    }
    this.mesh.dispose();
  }
}

export default SpriteEnemy;
