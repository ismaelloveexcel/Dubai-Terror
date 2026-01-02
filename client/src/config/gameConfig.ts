// Game Configuration - Save Ismael
// Premium Shippable Web Quality

// =============================================================================
// ENVIRONMENT CONFIGURATION
// =============================================================================

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === true;
};

const getEnvString = (key: string, defaultValue: string): string => {
  return import.meta.env[key] || defaultValue;
};

// =============================================================================
// GAME CONFIG
// =============================================================================

export const gameConfig = {
  // Story Configuration
  playerName: getEnvString('VITE_PLAYER_NAME', 'Aidan'),
  rescueTarget: getEnvString('VITE_RESCUE_TARGET', 'Mammoo Ismael'),
  familyMode: getEnvBoolean('VITE_FAMILY_MODE', true),
  
  // Game State
  currentLevel: 1,
  maxLevels: 6,
  
  // Debug
  debug: import.meta.env.DEV,
};

// =============================================================================
// VISUAL DIRECTION - Premium Stylized-Realistic PBR
// =============================================================================

export const visualConfig = {
  // Color Palette - Enhanced for visual impact (IMPROVED)
  colors: {
    // Primary - More vibrant and atmospheric
    shadowDark: '#080810',      // Deeper navy/black shadows for contrast
    infectionPrimary: '#00ffdd', // Brighter teal bioluminescent
    infectionSecondary: '#44ff22', // More vibrant sickly green
    navigationWarm: '#ff7700',   // Brighter orange emergency lights
    dangerRed: '#cc0000',        // More visible boss areas
    
    // Secondary - Better contrast
    metalGunmetal: '#2a2d38',    // Dubai architecture
    concreteWet: '#555555',      // Lighter floors/walls for visibility
    goldTarnished: '#9b8365',    // Brighter corrupted luxury
    waterBlack: '#0c0c0c',       // Standing water with slight visibility
    
    // Enhanced accent colors - More saturated
    vecnaPurple: '#8800aa',      // Brighter Vecna's aura
    portalViolet: '#aa22ff',     // More visible dimensional rifts
    memoryGold: '#ffdd00',       // Warmer memory/evidence glow
    healthGreen: '#00ff77',      // Brighter health pickups
  },
  
  // Atmosphere - Better visibility while maintaining horror feel
  fog: {
    enabled: true,
    color: { r: 0.05, g: 0.05, b: 0.08 }, // Slightly lighter for better visibility
    density: 0.012,              // Reduced fog for clearer gameplay
    start: 15,                   // Fog starts further away
    end: 100,                    // Extended draw distance
  },
  
  // Ambient Light - Slightly brighter for better UX
  ambient: {
    intensity: 0.15,             // Increased from 0.1 for visibility
    color: { r: 0.06, g: 0.06, b: 0.12 }, // Slightly lighter blue
  },
  
  // Post-Processing - Enhanced for cinematic feel (IMPROVED)
  postProcess: {
    bloom: {
      enabled: true,
      threshold: 0.4,       // Lower threshold = more glow on bright objects
      weight: 0.6,          // Stronger bloom for dramatic lighting
      kernel: 64,
      scale: 0.7,           // Larger bloom radius
    },
    vignette: {
      enabled: true,
      weight: 1.2,          // Slightly reduced for better visibility
      color: { r: 0.12, g: 0, b: 0.06 }, // Subtle purple-red tint
    },
    chromaticAberration: {
      enabled: true,
      amount: 12,           // Reduced for less eye strain
    },
    grain: {
      enabled: true,
      intensity: 0.06,      // Reduced for cleaner visuals
    },
    // Enhanced effects
    depthOfField: {
      enabled: false,       // Disable by default for performance
      focalLength: 100,
      fStop: 2.8,
      focusDistance: 5,
    },
    sharpen: {
      enabled: true,
      edge: 0.4,            // Increased for crisper textures
      intensity: 0.25,      // More sharpening for detail
    },
    // NEW: Color correction for cinematic look
    colorCorrection: {
      enabled: true,
      contrast: 1.25,       // Higher contrast for dramatic effect
      exposure: 0.95,       // Slightly darker for horror atmosphere
      saturation: 1.1,      // Slightly more saturated colors
    },
  },
  
  // Mobile-optimized visuals - IMPROVED for better experience
  mobileVisuals: {
    fog: {
      enabled: true,
      density: 0.010,       // Even less fog for mobile visibility
    },
    bloom: {
      enabled: true,        // Keep bloom for atmosphere
      threshold: 0.6,       // Lower threshold for more glow
      weight: 0.4,          // Increased for visual impact
      kernel: 32,
      scale: 0.5,
    },
    // NEW: Enable some post-processing on mobile
    postProcessing: {
      enabled: true,        // Enable limited post-processing
      vignette: true,       // Keep vignette for horror feel
      chromaticAberration: false, // Disable for performance
      grain: false,         // Disable for cleaner mobile look
    },
    reducedParticles: true,
    simplifiedLighting: true,
    // NEW: Quality presets
    qualityPreset: 'balanced', // 'low', 'balanced', 'high'
  },
};

// =============================================================================
// PLAYER CONFIGURATION
// =============================================================================

export const playerConfig = {
  // Movement
  walkSpeed: 5,
  sprintSpeed: 8,
  crouchSpeed: 2.5,
  
  // Physics
  height: 1.8,
  radius: 0.4,
  mass: 80,
  jumpForce: 8,
  
  // Camera
  fov: 75,
  sensitivity: 0.002,
  
  // Health
  maxHealth: 100,
  healthRegenDelay: 5, // seconds before regen starts
  healthRegenRate: 5,  // HP per second
  
  // Stamina
  maxStamina: 100,
  staminaDrainRate: 20, // per second while sprinting
  staminaRegenRate: 15, // per second
};

// =============================================================================
// WEAPON CONFIGURATION
// =============================================================================

export const weaponConfig = {
  pistol: {
    name: 'Service Pistol',
    damage: 25,
    fireRate: 0.15,    // seconds between shots
    range: 100,
    recoil: 0.02,
    magazineSize: 15,
    reloadTime: 1.5,
    spread: 0.01,
  },
};

// =============================================================================
// ENEMY TYPES - Constants for type-safe enemy references
// =============================================================================

export const ENEMY_TYPES = {
  DEMODOG: 'demodog',
  DEMOBAT: 'demobat',
  DEMOGORGON: 'demogorgon',
  SWARM: 'swarm',
  FLYING: 'flying',
  ELITE: 'elite',
  BOSS: 'boss',
  MIND_FLAYER: 'mindFlayer',
  VECNA: 'vecna',
} as const;

// =============================================================================
// ENEMY CONFIGURATION
// =============================================================================

export const enemyConfig = {
  demodog: {
    name: 'Demodog',
    health: 50,
    damage: 10,
    speed: 4,
    attackRange: 2,
    attackCooldown: 1.5,
    detectionRange: 20,
    points: 100,
  },
  demobat: {
    name: 'Demobat',
    health: 30,
    damage: 8,
    speed: 6,
    attackRange: 1.5,
    attackCooldown: 1,
    detectionRange: 25,
    flyHeight: 2.5,
    points: 75,
  },
  demogorgon: {
    name: 'Demogorgon',
    health: 150,
    damage: 25,
    speed: 3,
    attackRange: 3,
    attackCooldown: 2,
    detectionRange: 30,
    points: 500,
  },
  mindFlayer: {
    name: 'Mind Flayer',
    health: 1000,
    damage: 30,
    speed: 2,
    attackRange: 25,
    attackCooldown: 3,
    detectionRange: 50,
    phases: 3,
    points: 2000,
  },
  vecna: {
    name: 'Vecna',
    health: 2000,
    damage: 40,
    speed: 3,
    attackRange: 40,
    attackCooldown: 2.5,
    detectionRange: 100,
    phases: 4,
    points: 5000,
  },
  // New enemy types for spawners
  swarm: {
    name: 'Swarm Creature',
    health: 25,
    damage: 5,
    speed: 5,
    attackRange: 1.5,
    attackCooldown: 1,
    detectionRange: 15,
    points: 50,
  },
  flying: {
    name: 'Flying Terror',
    health: 35,
    damage: 8,
    speed: 6,
    attackRange: 2,
    attackCooldown: 2,
    detectionRange: 25,
    points: 75,
  },
  elite: {
    name: 'Elite Horror',
    health: 200,
    damage: 30,
    speed: 2.5,
    attackRange: 3,
    attackCooldown: 1.5,
    detectionRange: 35,
    points: 300,
  },
  boss: {
    name: 'Boss',
    health: 500,
    damage: 25,
    speed: 2,
    attackRange: 5,
    attackCooldown: 3,
    detectionRange: 50,
    points: 1000,
  },
};

// Type-safe alias for enemy configs
export const enemyConfigs = enemyConfig;

// =============================================================================
// LEVEL CONFIGURATION
// =============================================================================

export const levelConfig = {
  1: {
    id: 'ibn-battuta-mall',
    name: 'Ibn Battuta Mall',
    subtitle: 'The Entry',
    duration: '8-10 min',
    enemies: { demodogs: 15, demobats: 8 },
    objectives: ['Find Mammoo\'s car', 'Destroy 3 Hives', 'Reach the Metro'],
    evidence: { item: 'Car Keys + Parking Ticket', location: 'Persia Court' },
  },
  2: {
    id: 'dubai-metro',
    name: 'Dubai Metro',
    subtitle: 'The Tunnels',
    duration: '10-12 min',
    enemies: { demodogs: 20, demobats: 15, demogorgons: 1 },
    objectives: ['Navigate the tunnels', 'Defeat the Demogorgon', 'Reach the surface'],
    evidence: { item: 'Wallet', location: 'Abandoned Train Car' },
    hasBoss: true,
    bossType: 'demogorgon',
  },
  3: {
    id: 'dubai-frame',
    name: 'Dubai Frame',
    subtitle: 'The Window',
    duration: '12-15 min',
    enemies: { demodogs: 25, demobats: 20, demogorgons: 2 },
    objectives: ['Climb the Frame', 'Find the phone', 'Escape before collapse'],
    evidence: { item: 'Cracked Phone', location: 'Observation Deck' },
    hasEscapeSequence: true,
  },
  4: {
    id: 'dubai-marina',
    name: 'Dubai Marina',
    subtitle: 'The Trap',
    duration: '15-18 min',
    enemies: { demodogs: 30, demobats: 20, shadowClones: 10 },
    objectives: ['Navigate the Marina', 'Defeat the Mind Flayer', 'Find Mammoo\'s watch'],
    evidence: { item: 'Watch', location: 'Yacht Deck' },
    hasBoss: true,
    bossType: 'mindFlayer',
  },
  5: {
    id: 'downtown-dubai',
    name: 'Downtown Dubai',
    subtitle: 'The Heart',
    duration: '12-15 min',
    enemies: { demodogs: 40, demobats: 25, demogorgons: 3 },
    objectives: ['Cross Dubai Mall', 'Find Mammoo Ismael', 'Free him from Vecna\'s grip'],
    evidence: { item: 'Gift Bag', location: 'Fountain Base' },
    hasGauntlet: true,
  },
  6: {
    id: 'burj-khalifa',
    name: 'Burj Khalifa',
    subtitle: 'The Throne',
    duration: '18-22 min',
    enemies: { demodogs: 50, demobats: 30, demogorgons: 4 },
    objectives: ['Ascend the tower', 'Defeat Vecna', 'Escape with Mammoo'],
    evidence: { item: 'His Phone', location: 'Observation Deck' },
    hasBoss: true,
    bossType: 'vecna',
    isFinalLevel: true,
  },
};

// =============================================================================
// PERFORMANCE CONFIGURATION - Enhanced for better visuals
// =============================================================================

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

// Detect high-performance mobile devices
const isHighEndMobile = isMobile && (
  navigator.hardwareConcurrency >= 4 || 
  /iPhone\s*(1[2-9]|[2-9][0-9])|iPad\s*Pro|Pixel\s*[6-9]/i.test(navigator.userAgent)
);

export const performanceConfig = {
  isMobile,
  isHighEndMobile,
  
  // Rendering - Better quality
  renderScale: isMobile ? (isHighEndMobile ? 0.9 : 0.8) : 1.0,
  targetFPS: isMobile ? (isHighEndMobile ? 45 : 30) : 60,
  
  // Shadows - Enable on high-end mobile
  shadowsEnabled: !isMobile || isHighEndMobile,
  shadowMapSize: isMobile ? (isHighEndMobile ? 768 : 512) : 1024,
  
  // Particles - More particles for better effects
  particlesEnabled: true,
  particleLimit: isMobile ? (isHighEndMobile ? 100 : 60) : 250,
  
  // Post-Processing - Enable on mobile for atmosphere
  postProcessEnabled: true, // Now enabled for all devices
  bloomEnabled: true,       // Bloom enabled for atmosphere
  
  // LOD - Extended draw distance
  lodEnabled: true,
  lodDistance: isMobile ? (isHighEndMobile ? 45 : 35) : 60,
  
  // Draw Calls - Increased for better visuals
  maxDrawCalls: isMobile ? (isHighEndMobile ? 120 : 90) : 180,
  
  // Enemies
  maxEnemies: isMobile ? 10 : 20,
};

// =============================================================================
// AUDIO CONFIGURATION (Legacy - see audioConfig.ts for full system)
// =============================================================================

export const audioConfig = {
  enabled: true,
  masterVolume: 0.8,
  musicVolume: 0.6,
  sfxVolume: 0.8,
  voiceVolume: 0.9,
  
  // Use procedural audio when files not available
  useProcedural: true,
  
  // Music (placeholder file names - use audioConfig.ts for full config)
  music: {
    menu: 'menu-theme.mp3',
    ambient: 'ambient-drone.mp3',
    combat: 'combat-theme.mp3',
    boss: 'boss-theme.mp3',
    victory: 'victory.mp3',
    credits: 'never-ending-story.mp3', // Never Ending Story dedication for Aidan!
    gameOver: 'game-over.mp3',
  },
  
  // SFX (placeholder file names)
  sfx: {
    // Weapons
    gunshot: 'gunshot.wav',
    reload: 'reload.wav',
    empty: 'empty-click.wav',
    meleeSwing: 'melee-swing.wav',
    meleeHit: 'melee-hit.wav',
    
    // Enemies  
    enemyHit: 'enemy-hit.wav',
    enemyDeath: 'enemy-death.wav',
    demodogGrowl: 'demodog-growl.wav',
    demobatScreech: 'demobat-screech.wav',
    demogorgonRoar: 'demogorgon-roar.wav',
    
    // Player
    playerDamage: 'player-damage.wav',
    playerHeal: 'player-heal.wav',
    playerDeath: 'player-death.wav',
    footstep: 'footstep.wav',
    
    // Environment
    portalOpen: 'portal-open.wav',
    portalHum: 'portal-hum.wav',
    hiveSpawn: 'hive-spawn.wav',
    hiveDestroy: 'hive-destroy.wav',
    
    // UI/Pickups
    pickup: 'pickup.wav',
    evidenceFound: 'evidence-found.wav',
    weaponPickup: 'weapon-pickup.wav',
    objectiveComplete: 'objective-complete.wav',
    
    // Vecna/Horror
    clockTick: 'clock-tick.wav',
    clockChime: 'clock-chime.wav',
    vecnaTeleport: 'vecna-teleport.wav',
    vecnaWhisper: 'vecna-whisper.wav',
    mindFlayerPsychic: 'mindflayer-psychic.wav',
  },
  
  // Voice (placeholder - see audioConfig.ts for full voice clip system)
  voice: {
    mammooVoicemail: 'mammoo-voicemail.mp3',
    vecnaTaunts: 'vecna-taunts.mp3',
  },
  
  // Level-specific music keys
  levelMusic: {
    1: { ambient: 'level1-ambient', combat: 'level1-combat' },
    2: { ambient: 'level2-ambient', combat: 'level2-combat', boss: 'level2-boss' },
    3: { ambient: 'level3-ambient', combat: 'level3-combat' },
    4: { ambient: 'level4-ambient', combat: 'level4-combat', boss: 'level4-boss' },
    5: { ambient: 'level5-ambient', combat: 'level5-combat' },
    6: { ambient: 'level6-ambient', combat: 'level6-combat', boss: 'level6-boss' },
  },
};

// =============================================================================
// UI CONFIGURATION
// =============================================================================

export const uiConfig = {
  // HUD
  hud: {
    healthBarWidth: 200,
    healthBarHeight: 20,
    ammoFontSize: 24,
    objectiveFontSize: 18,
  },
  
  // Crosshair
  crosshair: {
    size: 20,
    thickness: 2,
    gap: 6,
    color: '#ffffff',
    hitColor: '#ff0000',
  },
  
  // Damage Indicator
  damageIndicator: {
    duration: 0.3,
    color: 'rgba(139, 0, 0, 0.5)',
  },
  
  // Evidence Popup
  evidencePopup: {
    duration: 5,
    fadeTime: 0.5,
  },
};

// =============================================================================
// STORY CONTENT
// =============================================================================

export const storyConfig = {
  // Opening Voicemail
  openingMessage: `Aidan... something's wrong... I'm still in Dubai but it's... not Dubai... everything's dead here... twisted... I tried to leave but the roads loop back... there's something hunting me... I can hear a clock ticking but there's no clock... I'm heading toward the Frame... maybe I can see a way out from up there... find me... please...`,
  
  // Evidence Voice Notes per Level
  voiceNotes: {
    1: `Okay... documenting this. I'm in the mall but something's wrong. The lights went out, then came back, but everything's... off. There's no one here. I'm heading to the exit. If anyone finds this—`,
    2: `Day 2. I think. Hard to tell - there's no sun, no moon, just... red. I made it to the Metro but the trains don't go anywhere. I walked for hours. The tunnels loop. I'm going to try the surface, head for the Frame. If I can get high enough, maybe I can see a way out.`,
    3: `Aidan, if you find this... don't come after me. I mean it. There's something here - not just the creatures. Something that thinks. I saw it. It looked like a man, but it moved wrong. It spoke to me. In my head. It said it's been waiting. That I'm 'interesting.' That my memories of you are 'valuable.' I have to keep moving. I'm heading toward the Marina - there are boats, maybe I can... I don't know. Just... I'm sorry I missed movie night.`,
    4: null, // Watch has no recording, just inscription
    5: `Aidan - Thought we could do a marathon this weekend. Got snacks too (in the car). See you tonight. - Mammoo I`,
    6: `Aidan... if you're hearing this, you found me. Or what's left of me. I don't know how much longer I can hold on. He's taking everything. My memories. My thoughts. But I keep thinking about you. About movie nights. About the stupid jokes. About how you always steal my popcorn. He can't have those. I won't let him. If you made it this far... finish it.`,
  },
  
  // Environmental story hints scattered in levels
  environmentalStory: {
    level1: [
      'Abandoned shopping bags litter the marble floors...',
      'The fountain water has turned black and still.',
      'Vines pulse with an eerie bioluminescent glow.',
    ],
    level2: [
      'Train announcement boards flicker with corrupted text...',
      'Emergency lights cast long shadows down endless tunnels.',
      'The distant rumble isn\'t a train anymore.',
    ],
    level3: [
      'The glass shows two Dubais - one alive, one dead.',
      'Something moves in the reflection that isn\'t there.',
      'The height feels wrong, like gravity is confused.',
    ],
    level4: [
      'Capsized yachts drift in water that doesn\'t ripple.',
      'Restaurant tables still set for dinners never eaten.',
      'The Marina\'s famous lights flicker in patterns... a warning?',
    ],
    level5: [
      'The frozen fountain captures a moment of panic.',
      'Aquarium glass cracked, but nothing escaped - nothing living.',
      'Gift shops display souvenirs from a world that was.',
    ],
    level6: [
      'The elevator shaft descends into infinite darkness.',
      'Every floor holds echoes of Vecna\'s thousand years.',
      'At the top, a throne made of memories waits.',
    ],
  },
  
  // Vecna Dialogue
  vecnaDialogue: {
    firstContact: `Do you see it? Your world. So close. You could almost touch it. But you can't go back. Not until I let you. And I don't let anyone go.`,
    
    bossIntro: [
      `Aidan. Welcome to the top of the world. Or what's left of it.`,
      `I was like you once. Young. Determined. Convinced that the people I cared about mattered.`,
      `They don't. People disappoint. They leave. They die. But memories... memories are forever.`,
      `Your uncle's are among the brightest I've seen.`,
      `Defiance. How predictable. Very well.`,
    ],
    
    // Enhanced boss phases with more dramatic dialogue
    phase1Taunt: [
      `You fight like a child playing at war.`,
      `Is this the best the mortal world can offer?`,
      `Your uncle screamed louder than you shoot.`,
    ],
    
    phase2: `Show me your fears, child...`,
    phase2Fail: `What is this? These memories... they're not fear... they're not pain... what ARE you?`,
    
    phase3: `My shadow! FINISH THIS!`,
    phase3Rage: [
      `IMPOSSIBLE! A mortal cannot resist me!`,
      `The bond between you... it burns...`,
      `Your memories are POISON!`,
    ],
    
    phase4: [
      `A THOUSAND YEARS I'VE EXISTED!`,
      `I'VE CONSUMED MINDS BEYOND COUNTING!`,
      `YOU ARE NOTHING!`,
    ],
    
    defeat: `This isn't... possible... I am ETERNAL... I will return... your minds are MARKED... I'll find you... in your DREAMS...`,
    
    // New: Backstory hints during battle
    backstoryHints: [
      `I was a healer once... before they burned me...`,
      `They called me monster... so I became one...`,
      `Time means nothing in the dark... centuries pass like heartbeats...`,
    ],
  },
  
  // Mind Flayer Dialogue
  mindFlayerDialogue: {
    intro: [
      `THE UNCLE STRUGGLED. HE FOUGHT. IT WAS... ENTERTAINING.`,
      `BUT HE BROKE. LIKE THEY ALL BREAK.`,
      `HIS MIND IS WITH MY MASTER NOW. SOON YOURS WILL JOIN IT.`,
    ],
    // New: Mid-battle taunts
    midBattle: [
      `YOUR WEAPONS ARE PRIMITIVE.`,
      `I FEEL YOUR FEAR. DELICIOUS.`,
      `THE TOWER CALLS TO YOU. YOU CANNOT RESIST.`,
    ],
    defeat: `YOU DELAY THE INEVITABLE. HE WAITS FOR YOU. IN THE TOWER.`,
  },
  
  // Mammoo Ismael Dialogue (when found)
  mammooDialogue: {
    found: [
      `Aidan... you came... why did you...`,
      `...he's in my head... Vecna... he showed me things... his past... he was human once... a long time ago...`,
      `...he's at the top... the Tower... he's waiting for you...`,
      `I can walk... barely... we have to finish this... together...`,
      `He's connected to me... that's his weakness... go... I'll catch up...`,
    ],
    // New: Encouragement during final battle
    encouragement: [
      `You've got this, Aidan!`,
      `Remember our movie nights - fight for those memories!`,
      `He's weakening! Keep going!`,
      `I believe in you!`,
    ],
    finalBattle: `AIDAN! He's still connected to me! His grip is weakest when he's angry! NOW!`,
    escape: `The rift. It's closing. We need to move. NOW.`,
  },
  
  // Credits
  credits: {
    title: 'SAVE ISMAEL',
    dedication: 'For Aidan',
    message: [
      `You walked into the Upside Down and got me out.`,
      `I owe you one.`,
      `(Or several. Lost count around the Mind Flayer.)`,
      ``,
      `See you at movie night.`,
      ``,
      `- Mammoo Ismael, 2025`,
    ],
  },
  
  // Post Credits
  postCredits: {
    clockChimes: 4,
    vecnaWhisper: `I remember every mind I've touched. Every. One. And I have nothing but time.`,
    teaser: [
      `SAVE ISMAEL 2?`,
      `...`,
      `(Sleep tight.)`,
    ],
  },
  
  // New: Mobile gameplay tips
  mobileTips: [
    'Rotate your device for the best experience',
    'Use the left joystick to move',
    'Tap FIRE to shoot enemies',
    'Look for the glowing evidence items',
    'Collect health packs to restore HP',
    'Boss weak points glow red - aim there!',
  ],
};

export default {
  game: gameConfig,
  visual: visualConfig,
  player: playerConfig,
  weapon: weaponConfig,
  enemy: enemyConfig,
  level: levelConfig,
  performance: performanceConfig,
  audio: audioConfig,
  ui: uiConfig,
  story: storyConfig,
};
