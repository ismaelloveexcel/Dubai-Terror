/**
 * Temporary Sprite Assets - SVG-based placeholders
 * Premium quality placeholder sprites until final art is ready
 */

// Color palette matching Stranger Things aesthetic
const COLORS = {
  teal: '#00ffcc',
  red: '#cc0000',
  purple: '#8800cc',
  darkRed: '#8b0000',
  sicklyGreen: '#39ff14',
  orange: '#ff6600',
  darkGray: '#1a1a1a',
  black: '#0a0a0a',
};

/**
 * Generate a Demodog frame SVG
 */
function createDemodogFrame(variant: 'idle' | 'walk' | 'attack' | 'hurt' | 'death' = 'idle'): string {
  const mouthHeight = variant === 'attack' ? 14 : 8;
  const opacity = variant === 'death' ? 0.3 : 1;
  const legOffset = variant === 'walk' ? 5 : 0;
  const bodyScale = variant === 'attack' ? 1.1 : 1;
  const glowIntensity = variant === 'hurt' ? 6 : 4;

  return `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="${glowIntensity}" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="bodyGrad">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </radialGradient>
      </defs>
      <g opacity="${opacity}" transform="scale(${bodyScale}) translate(${bodyScale > 1 ? -6 : 0}, 0)">
        <ellipse cx="64" cy="70" rx="35" ry="25" fill="url(#bodyGrad)" stroke="${COLORS.darkGray}" stroke-width="2"/>
        <ellipse cx="64" cy="45" rx="25" ry="22" fill="url(#bodyGrad)" stroke="${COLORS.darkGray}" stroke-width="2"/>
        <line x1="48" y1="85" x2="48" y2="${105 + legOffset}" stroke="${COLORS.darkGray}" stroke-width="4" stroke-linecap="round"/>
        <line x1="58" y1="85" x2="58" y2="${105 - legOffset}" stroke="${COLORS.darkGray}" stroke-width="4" stroke-linecap="round"/>
        <line x1="70" y1="85" x2="70" y2="${105 + legOffset}" stroke="${COLORS.darkGray}" stroke-width="4" stroke-linecap="round"/>
        <line x1="80" y1="85" x2="80" y2="${105 - legOffset}" stroke="${COLORS.darkGray}" stroke-width="4" stroke-linecap="round"/>
        <circle cx="54" cy="40" r="8" fill="${COLORS.teal}" opacity="0.4" filter="url(#glow)"/>
        <circle cx="54" cy="40" r="5" fill="${COLORS.teal}"/>
        <circle cx="74" cy="40" r="8" fill="${COLORS.teal}" opacity="0.4" filter="url(#glow)"/>
        <circle cx="74" cy="40" r="5" fill="${COLORS.teal}"/>
        <ellipse cx="64" cy="55" rx="12" ry="${mouthHeight}" fill="${COLORS.teal}" opacity="0.4" filter="url(#glow)"/>
        <ellipse cx="64" cy="55" rx="8" ry="${mouthHeight * 0.6}" fill="${COLORS.teal}"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Demobat frame SVG
 */
function createDemobatFrame(variant: 'idle' | 'fly' | 'attack' | 'death' = 'idle'): string {
  const wingAngle = variant === 'fly' ? 20 : 10;
  const opacity = variant === 'death' ? 0.3 : 1;
  const mouthOpen = variant === 'attack' ? 12 : 6;

  return `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g opacity="${opacity}">
        <ellipse cx="64" cy="64" rx="18" ry="16" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="2"/>
        <path d="M46 64 Q 20 ${44 - wingAngle} 15 ${64 - wingAngle} Q 25 64 46 64" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="1"/>
        <path d="M82 64 Q 108 ${44 - wingAngle} 113 ${64 - wingAngle} Q 103 64 82 64" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="1"/>
        <circle cx="56" cy="58" r="4" fill="${COLORS.teal}" opacity="0.5" filter="url(#glow2)"/>
        <circle cx="56" cy="58" r="2" fill="${COLORS.teal}"/>
        <circle cx="72" cy="58" r="4" fill="${COLORS.teal}" opacity="0.5" filter="url(#glow2)"/>
        <circle cx="72" cy="58" r="2" fill="${COLORS.teal}"/>
        <ellipse cx="64" cy="70" rx="6" ry="${mouthOpen}" fill="${COLORS.teal}" opacity="0.4" filter="url(#glow2)"/>
        <ellipse cx="64" cy="70" rx="4" ry="${mouthOpen * 0.6}" fill="${COLORS.teal}"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Demogorgon frame SVG (256x256 for detail)
 */
function createDemogorgonFrame(variant: 'idle' | 'walk' | 'attack' | 'roar' | 'death' = 'idle'): string {
  const opacity = variant === 'death' ? 0.3 : 1;
  const petalOpen = variant === 'roar' || variant === 'attack' ? 40 : 20;
  const scale = variant === 'attack' ? 1.1 : 1;

  return `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow3">
          <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="demoGrad">
          <stop offset="0%" stop-color="#2a2a2a"/>
          <stop offset="100%" stop-color="#0a0a0a"/>
        </radialGradient>
      </defs>
      <g opacity="${opacity}" transform="scale(${scale}) translate(${scale > 1 ? -12 : 0}, 0)">
        <ellipse cx="128" cy="160" rx="50" ry="70" fill="url(#demoGrad)" stroke="${COLORS.black}" stroke-width="3"/>
        <ellipse cx="128" cy="80" rx="40" ry="50" fill="url(#demoGrad)" stroke="${COLORS.black}" stroke-width="3"/>
        ${[0, 72, 144, 216, 288].map(angle => `
          <ellipse cx="128" cy="60" rx="8" ry="${petalOpen}" 
            fill="${COLORS.darkGray}" stroke="${COLORS.teal}" stroke-width="2"
            transform="rotate(${angle}, 128, 80)" filter="url(#glow3)"/>
        `).join('')}
        <circle cx="128" cy="80" r="20" fill="${COLORS.teal}" opacity="0.5" filter="url(#glow3)"/>
        <circle cx="128" cy="80" r="12" fill="${COLORS.teal}"/>
        <line x1="100" y1="200" x2="85" y2="240" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
        <line x1="156" y1="200" x2="171" y2="240" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Mind Flayer frame SVG
 */
function createMindFlayerFrame(variant: 'idle' | 'attack' | 'summon' | 'death' = 'idle'): string {
  const opacity = variant === 'death' ? 0.3 : 1;
  const tentacleWave = variant === 'attack' ? 15 : 5;

  return `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowMF">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g opacity="${opacity}">
        <ellipse cx="128" cy="100" rx="80" ry="60" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="3"/>
        ${[0, 60, 120, 180, 240, 300].map((angle, i) => `
          <path d="M128 130 Q ${128 + Math.sin(i) * tentacleWave} 180 ${100 + (i * 10)} 240" 
            stroke="${COLORS.red}" stroke-width="6" fill="none" opacity="0.8" filter="url(#glowMF)"/>
        `).join('')}
        <circle cx="100" cy="85" r="12" fill="${COLORS.red}" opacity="0.6" filter="url(#glowMF)"/>
        <circle cx="100" cy="85" r="6" fill="${COLORS.red}"/>
        <circle cx="156" cy="85" r="12" fill="${COLORS.red}" opacity="0.6" filter="url(#glowMF)"/>
        <circle cx="156" cy="85" r="6" fill="${COLORS.red}"/>
        <ellipse cx="128" cy="110" rx="15" ry="10" fill="${COLORS.red}" opacity="0.4" filter="url(#glowMF)"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Vecna frame SVG
 */
function createVecnaFrame(variant: 'idle' | 'attack' | 'psychic' | 'teleport' | 'death' = 'idle'): string {
  const opacity = variant === 'death' ? 0.3 : variant === 'teleport' ? 0.6 : 1;
  const armRaise = variant === 'psychic' || variant === 'attack' ? -30 : 0;
  const glowIntensity = variant === 'psychic' ? 12 : 6;

  return `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowV">
          <feGaussianBlur stdDeviation="${glowIntensity}" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <radialGradient id="vecnaGrad">
          <stop offset="0%" stop-color="#2a1a1a"/>
          <stop offset="100%" stop-color="#0a0505"/>
        </radialGradient>
      </defs>
      <g opacity="${opacity}">
        <ellipse cx="128" cy="60" rx="30" ry="35" fill="url(#vecnaGrad)" stroke="${COLORS.black}" stroke-width="2"/>
        <rect x="108" y="95" width="40" height="80" rx="5" fill="url(#vecnaGrad)" stroke="${COLORS.black}" stroke-width="2"/>
        <line x1="108" y1="110" x2="70" y2="${140 + armRaise}" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
        <line x1="148" y1="110" x2="186" y2="${140 + armRaise}" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
        <line x1="118" y1="175" x2="105" y2="235" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
        <line x1="138" y1="175" x2="151" y2="235" stroke="${COLORS.darkGray}" stroke-width="8" stroke-linecap="round"/>
        <circle cx="118" cy="50" r="8" fill="${COLORS.darkRed}" opacity="0.7" filter="url(#glowV)"/>
        <circle cx="118" cy="50" r="4" fill="${COLORS.darkRed}"/>
        <circle cx="138" cy="50" r="8" fill="${COLORS.darkRed}" opacity="0.7" filter="url(#glowV)"/>
        <circle cx="138" cy="50" r="4" fill="${COLORS.darkRed}"/>
        ${variant === 'psychic' ? `<circle cx="128" cy="30" r="20" fill="${COLORS.darkRed}" opacity="0.3" filter="url(#glowV)"/>` : ''}
        <path d="M108 70 Q 100 75 95 70 Q 100 85 108 78" fill="${COLORS.darkGray}"/>
        <path d="M148 70 Q 156 75 161 70 Q 156 85 148 78" fill="${COLORS.darkGray}"/>
        <ellipse cx="128" cy="75" rx="8" ry="6" fill="${COLORS.darkRed}" opacity="0.4"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Swarm creature frame SVG (smaller, 64x64)
 */
function createSwarmFrame(variant: 'idle' | 'move' | 'attack' = 'idle'): string {
  const tentacleWave = variant === 'move' ? 5 : 2;

  return `
    <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowS">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="32" cy="28" rx="18" ry="14" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="1"/>
      ${[0, 1, 2, 3].map(i => `
        <line x1="${20 + i * 8}" y1="38" x2="${18 + i * 8 + (i % 2 ? tentacleWave : -tentacleWave)}" y2="55" 
          stroke="${COLORS.sicklyGreen}" stroke-width="2" opacity="0.8"/>
      `).join('')}
      <circle cx="26" cy="24" r="4" fill="${COLORS.sicklyGreen}" opacity="0.5" filter="url(#glowS)"/>
      <circle cx="26" cy="24" r="2" fill="${COLORS.sicklyGreen}"/>
      <circle cx="38" cy="24" r="4" fill="${COLORS.sicklyGreen}" opacity="0.5" filter="url(#glowS)"/>
      <circle cx="38" cy="24" r="2" fill="${COLORS.sicklyGreen}"/>
    </svg>
  `;
}

/**
 * Generate a Flying enemy frame SVG
 */
function createFlyingFrame(variant: 'idle' | 'fly' | 'attack' | 'death' = 'idle'): string {
  const wingAngle = variant === 'fly' ? 25 : 15;
  const opacity = variant === 'death' ? 0.3 : 1;

  return `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowF">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g opacity="${opacity}">
        <ellipse cx="64" cy="64" rx="22" ry="20" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="2"/>
        <path d="M42 64 Q 10 ${40 - wingAngle} 5 ${60 - wingAngle} Q 20 70 42 64" fill="${COLORS.darkGray}" stroke="${COLORS.purple}" stroke-width="2" filter="url(#glowF)"/>
        <path d="M86 64 Q 118 ${40 - wingAngle} 123 ${60 - wingAngle} Q 108 70 86 64" fill="${COLORS.darkGray}" stroke="${COLORS.purple}" stroke-width="2" filter="url(#glowF)"/>
        <circle cx="54" cy="58" r="6" fill="${COLORS.purple}" opacity="0.6" filter="url(#glowF)"/>
        <circle cx="54" cy="58" r="3" fill="${COLORS.purple}"/>
        <circle cx="74" cy="58" r="6" fill="${COLORS.purple}" opacity="0.6" filter="url(#glowF)"/>
        <circle cx="74" cy="58" r="3" fill="${COLORS.purple}"/>
        <line x1="58" y1="80" x2="54" y2="100" stroke="${COLORS.darkGray}" stroke-width="3"/>
        <line x1="70" y1="80" x2="74" y2="100" stroke="${COLORS.darkGray}" stroke-width="3"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a Elite enemy frame SVG
 */
function createEliteFrame(variant: 'idle' | 'walk' | 'attack' | 'death' = 'idle'): string {
  const opacity = variant === 'death' ? 0.3 : 1;
  const armRaise = variant === 'attack' ? -20 : 0;

  return `
    <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glowE">
          <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g opacity="${opacity}">
        <ellipse cx="128" cy="70" rx="35" ry="40" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="3"/>
        <polygon points="128,25 115,50 141,50" fill="${COLORS.darkGray}" stroke="${COLORS.red}" stroke-width="2"/>
        <rect x="103" y="110" width="50" height="90" rx="5" fill="${COLORS.darkGray}" stroke="${COLORS.black}" stroke-width="2"/>
        <line x1="103" y1="130" x2="60" y2="${160 + armRaise}" stroke="${COLORS.darkGray}" stroke-width="10" stroke-linecap="round"/>
        <line x1="153" y1="130" x2="196" y2="${160 + armRaise}" stroke="${COLORS.darkGray}" stroke-width="10" stroke-linecap="round"/>
        <line x1="115" y1="200" x2="100" y2="250" stroke="${COLORS.darkGray}" stroke-width="10" stroke-linecap="round"/>
        <line x1="141" y1="200" x2="156" y2="250" stroke="${COLORS.darkGray}" stroke-width="10" stroke-linecap="round"/>
        <circle cx="115" cy="60" r="10" fill="${COLORS.red}" opacity="0.6" filter="url(#glowE)"/>
        <circle cx="115" cy="60" r="5" fill="${COLORS.red}"/>
        <circle cx="141" cy="60" r="10" fill="${COLORS.red}" opacity="0.6" filter="url(#glowE)"/>
        <circle cx="141" cy="60" r="5" fill="${COLORS.red}"/>
      </g>
    </svg>
  `;
}

/**
 * Generate complete sprite sheet
 */
function generateSpriteSheet<T extends string>(
  createFrame: (variant: T) => string,
  variants: T[],
  frameSize: number,
  columns: number
): string {
  const rows = Math.ceil(variants.length / columns);
  const width = columns * frameSize;
  const height = rows * frameSize;

  let spriteSheet = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="${width}" height="${height}" fill="transparent"/>`;

  variants.forEach((variant, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    const x = col * frameSize;
    const y = row * frameSize;
    const frameContent = createFrame(variant).replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
    spriteSheet += `<g transform="translate(${x}, ${y})">${frameContent}</g>`;
  });

  spriteSheet += `</svg>`;
  return spriteSheet;
}

function svgToDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Demodog: 16 frames (4x4 grid, 128px)
const demodogVariants = [
  'idle', 'idle', 'walk', 'walk',
  'walk', 'walk', 'attack', 'attack',
  'attack', 'attack', 'hurt', 'hurt',
  'death', 'death', 'death', 'death'
];

// Demobat: 12 frames (4x3 grid, 128px)
const demobatVariants = [
  'idle', 'idle', 'fly', 'fly',
  'fly', 'fly', 'attack', 'attack',
  'death', 'death', 'death', 'death'
];

// Demogorgon: 16 frames (4x4 grid, 256px)
const demogorgonVariants = [
  'idle', 'idle', 'walk', 'walk',
  'walk', 'walk', 'attack', 'attack',
  'attack', 'attack', 'roar', 'roar',
  'death', 'death', 'death', 'death'
];

// Mind Flayer: 16 frames (4x4 grid, 256px)
const mindFlayerVariants = [
  'idle', 'idle', 'idle', 'idle',
  'attack', 'attack', 'attack', 'attack',
  'summon', 'summon', 'summon', 'summon',
  'death', 'death', 'death', 'death'
];

// Vecna: 24 frames (4x6 grid, 256px)
const vecnaVariants = [
  'idle', 'idle', 'idle', 'idle',
  'attack', 'attack', 'attack', 'attack',
  'psychic', 'psychic', 'psychic', 'psychic',
  'teleport', 'teleport', 'teleport', 'teleport',
  'death', 'death', 'death', 'death',
  'idle', 'idle', 'attack', 'psychic'
];

// Swarm: 8 frames (4x2 grid, 64px)
const swarmVariants = [
  'idle', 'idle', 'move', 'move',
  'move', 'attack', 'attack', 'idle'
];

// Flying: 16 frames (4x4 grid, 128px)
const flyingVariants = [
  'idle', 'idle', 'fly', 'fly',
  'fly', 'fly', 'attack', 'attack',
  'attack', 'attack', 'death', 'death',
  'death', 'death', 'idle', 'fly'
];

// Elite: 16 frames (4x4 grid, 256px)
const eliteVariants = [
  'idle', 'idle', 'walk', 'walk',
  'walk', 'walk', 'attack', 'attack',
  'attack', 'attack', 'attack', 'attack',
  'death', 'death', 'death', 'death'
];

export const tempSpriteAssets = {
  demodog: svgToDataUri(generateSpriteSheet(createDemodogFrame, demodogVariants, 128, 4)),
  demobat: svgToDataUri(generateSpriteSheet(createDemobatFrame, demobatVariants, 128, 4)),
  demogorgon: svgToDataUri(generateSpriteSheet(createDemogorgonFrame, demogorgonVariants, 256, 4)),
  mindFlayer: svgToDataUri(generateSpriteSheet(createMindFlayerFrame, mindFlayerVariants, 256, 4)),
  vecna: svgToDataUri(generateSpriteSheet(createVecnaFrame, vecnaVariants, 256, 4)),
  swarm: svgToDataUri(generateSpriteSheet(createSwarmFrame, swarmVariants, 64, 4)),
  flying: svgToDataUri(generateSpriteSheet(createFlyingFrame, flyingVariants, 128, 4)),
  elite: svgToDataUri(generateSpriteSheet(createEliteFrame, eliteVariants, 256, 4)),
};

export function getSpriteSheetDataURI(): string {
  return tempSpriteAssets.demodog;
}

export function generateDemodogSpriteSheet(): string {
  return generateSpriteSheet(createDemodogFrame, demodogVariants, 128, 4);
}
