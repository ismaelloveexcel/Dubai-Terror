/**
 * Temporary Sprite Assets - SVG-based placeholders
 * Use these to preview the sprite system before creating final art
 */

/**
 * Generate a simple Demodog frame as SVG
 */
function createDemodogFrame(variant: 'idle' | 'walk' | 'attack' | 'hurt' | 'death' = 'idle'): string {
  // Adjust appearance based on variant
  const mouthHeight = variant === 'attack' ? 14 : 8;
  const opacity = variant === 'death' ? 0.3 : 1;
  const legOffset = variant === 'walk' ? 5 : 0;

  return `
    <svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g opacity="${opacity}">
        <!-- Body (dark silhouette) -->
        <ellipse cx="64" cy="70" rx="35" ry="25" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="2"/>

        <!-- Head -->
        <ellipse cx="64" cy="45" rx="25" ry="22" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="2"/>

        <!-- Legs -->
        <line x1="48" y1="85" x2="48" y2="${105 + legOffset}" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="58" y1="85" x2="58" y2="${105 - legOffset}" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="70" y1="85" x2="70" y2="${105 + legOffset}" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>
        <line x1="80" y1="85" x2="80" y2="${105 - legOffset}" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/>

        <!-- Eyes (glowing teal) -->
        <circle cx="54" cy="40" r="8" fill="#00ffcc" opacity="0.3" filter="url(#glow)"/>
        <circle cx="54" cy="40" r="5" fill="#00ffcc"/>
        <circle cx="74" cy="40" r="8" fill="#00ffcc" opacity="0.3" filter="url(#glow)"/>
        <circle cx="74" cy="40" r="5" fill="#00ffcc"/>

        <!-- Mouth (glowing) -->
        <ellipse cx="64" cy="55" rx="12" ry="${mouthHeight}" fill="#00ffcc" opacity="0.3" filter="url(#glow)"/>
        <ellipse cx="64" cy="55" rx="8" ry="${mouthHeight * 0.6}" fill="#00ffcc"/>
      </g>
    </svg>
  `;
}

/**
 * Generate a complete 512x512 sprite sheet (4x4 grid)
 * Layout:
 * Row 1: Idle (2) + Walk (2)
 * Row 2: Walk (2) + Attack (2)
 * Row 3: Attack (2) + Hurt (2)
 * Row 4: Death (4)
 */
export function generateDemodogSpriteSheet(): string {
  const frames = [
    // Row 1
    createDemodogFrame('idle'),
    createDemodogFrame('idle'),
    createDemodogFrame('walk'),
    createDemodogFrame('walk'),
    // Row 2
    createDemodogFrame('walk'),
    createDemodogFrame('walk'),
    createDemodogFrame('attack'),
    createDemodogFrame('attack'),
    // Row 3
    createDemodogFrame('attack'),
    createDemodogFrame('attack'),
    createDemodogFrame('hurt'),
    createDemodogFrame('hurt'),
    // Row 4
    createDemodogFrame('death'),
    createDemodogFrame('death'),
    createDemodogFrame('death'),
    createDemodogFrame('death'),
  ];

  // Create 512x512 SVG with 4x4 grid
  let spriteSheet = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="transparent"/>
  `;

  frames.forEach((frame, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    const x = col * 128;
    const y = row * 128;

    // Extract the inner content of the frame SVG
    const innerContent = frame
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '');

    spriteSheet += `
      <g transform="translate(${x}, ${y})">
        ${innerContent}
      </g>
    `;
  });

  spriteSheet += `</svg>`;

  return spriteSheet;
}

/**
 * Convert SVG to data URI
 */
export function getSpriteSheetDataURI(): string {
  const svgContent = generateDemodogSpriteSheet();
  const base64 = btoa(svgContent);
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Temporary sprite URLs (use these until you create real PNGs)
 */
export const tempSpriteAssets = {
  demodog: getSpriteSheetDataURI(),
};
