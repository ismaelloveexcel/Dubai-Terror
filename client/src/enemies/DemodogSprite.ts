/**
 * DemodogSprite - Premium Sprite-Based Enemy
 * Enter the Gungeon-style sprite rendering
 *
 * This is a proof-of-concept showing how the sprite system works.
 * Once tested, this approach can replace the mesh-based Demodog.ts
 */

import { Scene, Vector3 } from '@babylonjs/core';
import { Enemy } from './Enemy';
import { EnemyType } from '../types';
import { SpriteRenderer } from '../utils/SpriteRenderer';
import {
  spriteConfigs,
  getSpriteEffectsForEnemy,
  fallbackSpriteConfig
} from '../config/spriteConfig';

export class DemodogSprite extends Enemy {
  private spriteRenderer: SpriteRenderer | null = null;
  private wanderTarget: Vector3 | null = null;
  private wanderTimer: number = 0;
  private currentAnimState: string = 'idle';

  constructor(scene: Scene, position: Vector3) {
    super(scene, EnemyType.DEMODOG, position);
    this.initializeSprite();
  }

  /**
   * Initialize sprite renderer instead of mesh
   */
  private initializeSprite(): void {
    const config = spriteConfigs.demodog || fallbackSpriteConfig;
    const effects = getSpriteEffectsForEnemy('demodog');

    this.spriteRenderer = new SpriteRenderer(
      `demodog_${Date.now()}`,
      config,
      this.scene,
      effects
    );

    this.spriteRenderer.setPosition(this.position);
    this.spriteRenderer.setSize(1.5); // Adjust size as needed
    this.spriteRenderer.playAnimation('idle');
    this.spriteRenderer.startParticles(); // Infection spore trail
  }

  /**
   * Override createMesh to do nothing (we use sprites now!)
   */
  protected createMesh(): any {
    // Return a dummy mesh reference
    // The actual rendering is handled by SpriteRenderer
    return { position: this.position, dispose: () => {} };
  }

  /**
   * Update movement with sprite animations
   */
  protected updateMovement(deltaTime: number): void {
    // Update attack cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
    }

    if (this.target) {
      // Chase player
      const distance = Vector3.Distance(this.position, this.target);

      if (distance <= this.attackRange && this.attackCooldown <= 0) {
        // Attack animation
        this.playAnimation('attack');
        this.attackCooldown = 1.5; // Match attackCooldown from config
      } else if (distance > this.attackRange) {
        // Move toward player
        this.moveToward(this.target, deltaTime);
        this.playAnimation('walk');
      } else {
        // In range but on cooldown - idle
        this.playAnimation('idle');
      }
    } else {
      // Wander
      this.wander(deltaTime);
    }

    // Update sprite position
    if (this.spriteRenderer) {
      this.spriteRenderer.setPosition(this.position);
      this.spriteRenderer.update(deltaTime);
    }

    // Subtle bobbing for idle state
    if (this.currentAnimState === 'idle') {
      const time = performance.now() / 1000;
      const bobOffset = Math.sin(time * 5) * 0.05;
      const newPos = this.position.clone();
      newPos.y += bobOffset;
      if (this.spriteRenderer) {
        this.spriteRenderer.setPosition(newPos);
      }
    }
  }

  /**
   * Wander behavior (when no target)
   */
  private wander(deltaTime: number): void {
    this.wanderTimer -= deltaTime;

    if (this.wanderTimer <= 0 || !this.wanderTarget) {
      // Pick new random target nearby
      const angle = Math.random() * Math.PI * 2;
      const distance = 3 + Math.random() * 5;
      this.wanderTarget = new Vector3(
        this.position.x + Math.cos(angle) * distance,
        this.position.y,
        this.position.z + Math.sin(angle) * distance
      );
      this.wanderTimer = 2 + Math.random() * 3;
    }

    this.moveToward(this.wanderTarget, deltaTime * 0.5);
    this.playAnimation('walk');
  }

  /**
   * Play animation with state management
   */
  private playAnimation(animName: string): void {
    if (this.currentAnimState === animName) return;

    this.currentAnimState = animName;
    if (this.spriteRenderer) {
      this.spriteRenderer.playAnimation(animName);
    }
  }

  /**
   * Override takeDamage to show hurt animation
   */
  public takeDamage(amount: number): void {
    super.takeDamage(amount);

    if (this.isDead()) {
      this.playAnimation('death');
      if (this.spriteRenderer) {
        this.spriteRenderer.stopParticles();
      }
      // Dispose after death animation completes
      setTimeout(() => this.dispose(), 600); // Match death animation duration
    } else {
      // Show hurt flash
      this.playAnimation('hurt');
      // Return to previous state after hurt animation
      setTimeout(() => {
        if (this.currentAnimState === 'hurt') {
          this.currentAnimState = 'idle'; // Reset to idle
        }
      }, 200);
    }
  }

  /**
   * Dispose sprite renderer
   */
  public dispose(): void {
    if (this.spriteRenderer) {
      this.spriteRenderer.dispose();
      this.spriteRenderer = null;
    }
    super.dispose();
  }

  /**
   * Get current animation state (for debugging)
   */
  public getAnimationState(): string {
    return this.currentAnimState;
  }

  /**
   * Get sprite renderer (for advanced effects)
   */
  public getSpriteRenderer(): SpriteRenderer | null {
    return this.spriteRenderer;
  }
}

export default DemodogSprite;
