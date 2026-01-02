// Demogorgon.ts - Elite Enemy with 2D Billboard Sprites
// Save Ismael

import { Scene, Vector3 } from '@babylonjs/core';
import { SpriteEnemy } from './SpriteEnemy';
import { EnemyType } from '../types';

export class Demogorgon extends SpriteEnemy {
  private chargeTimer: number = 0;
  private isCharging: boolean = false;
  private chargeDirection: Vector3 = Vector3.Zero();
  private chargeDuration: number = 0.5;
  private chargeSpeed: number = 15;
  
  constructor(scene: Scene, position: Vector3) {
    super(scene, EnemyType.DEMOGORGON, position);
  }
  
  protected updateMovement(deltaTime: number): void {
    if (this.isCharging) {
      this.chargeTimer -= deltaTime;
      const velocity = this.chargeDirection.scale(this.chargeSpeed * deltaTime);
      this.mesh.moveWithCollisions(velocity);
      
      if (this.chargeTimer <= 0) {
        this.isCharging = false;
        this.chargeTimer = 3;
        this.playAnimation('idle');
      }
      return;
    }
    
    if (this.target) {
      const distance = Vector3.Distance(this.position, this.target);
      
      if (distance < 10 && distance > this.attackRange && this.chargeTimer <= 0) {
        this.startCharge();
        return;
      }
      
      if (distance > this.attackRange) {
        this.moveToward(this.target, deltaTime);
      }
      
      if (this.chargeTimer > 0) {
        this.chargeTimer -= deltaTime;
      }
    }
    
    const time = performance.now() / 1000;
    this.mesh.rotation.y += Math.sin(time * 2) * 0.01;
  }
  
  private startCharge(): void {
    if (!this.target) return;
    
    this.isCharging = true;
    this.chargeTimer = this.chargeDuration;
    this.playAnimation('chargeWindup');
    
    this.chargeDirection = this.target.subtract(this.position);
    this.chargeDirection.y = 0;
    this.chargeDirection.normalize();
    
    this.mesh.lookAt(new Vector3(
      this.target.x,
      this.mesh.position.y,
      this.target.z
    ));
    
    setTimeout(() => {
      if (this.isCharging) {
        this.playAnimation('charge');
      }
    }, 300);
  }
  
  protected attack(): void {
    this.playAnimation('roar');
    super.attack();
  }
}

export default Demogorgon;
