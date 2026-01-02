// Demodog.ts - Swarm Enemy with 2D Billboard Sprites
// Save Ismael

import { Scene, Vector3 } from '@babylonjs/core';
import { SpriteEnemy } from './SpriteEnemy';
import { EnemyType } from '../types';

export class Demodog extends SpriteEnemy {
  private wanderTarget: Vector3 | null = null;
  private wanderTimer: number = 0;
  
  constructor(scene: Scene, position: Vector3) {
    super(scene, EnemyType.DEMODOG, position);
  }
  
  protected updateMovement(deltaTime: number): void {
    if (this.target) {
      const distance = Vector3.Distance(this.position, this.target);
      
      if (distance > this.attackRange) {
        this.moveToward(this.target, deltaTime);
      }
    } else {
      this.wander(deltaTime);
    }
    
    const time = performance.now() / 1000;
    this.mesh.position.y = this.position.y + Math.sin(time * 5) * 0.05;
  }
  
  private wander(deltaTime: number): void {
    this.wanderTimer -= deltaTime;
    
    if (this.wanderTimer <= 0 || !this.wanderTarget) {
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
  }
}

export default Demodog;
