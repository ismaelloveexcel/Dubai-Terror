# Premium Sprite Art Guide
## Save Ismael - Enter the Gungeon Style Sprites

**Target Quality:** Enter the Gungeon / Dead Cells / Hades 2D sprite quality
**Art Style:** Stylized dark horror with bioluminescent accents
**File Format:** PNG with transparency

---

## Table of Contents
1. [Quick Start](#quick-start)
2. [Technical Specifications](#technical-specifications)
3. [Art Style Guide](#art-style-guide)
4. [Frame-by-Frame Animation](#animation-guide)
5. [Glow & Effects](#glow-effects)
6. [Tool Recommendations](#tools)
7. [AI-Assisted Workflow](#ai-workflow)
8. [Enemy-Specific Guides](#enemy-guides)

---

## Quick Start

### 5-Minute Sprite Creation (AI-Assisted)

```bash
1. Generate concept: DALL-E prompt
   "demodog enemy sprite, dark horror creature, glowing teal eyes,
    top-down pixel art style, transparent background, 128x128px"

2. Import to Aseprite/Krita

3. Trace and refine (clean edges, add glow)

4. Duplicate frame and add variations (walk cycle)

5. Export as sprite sheet (512x512 PNG)

Total time: 30-60 minutes per enemy
```

---

## Technical Specifications

### File Specifications

| Enemy Type | Canvas Size | Frame Size | Total Frames | Layout |
|-----------|-------------|------------|--------------|--------|
| Basic (Demodog, Demobat) | 512x512 | 128x128 | 16 | 4x4 grid |
| Elite (Demogorgon) | 1024x1024 | 256x256 | 16 | 4x4 grid |
| Boss (Mind Flayer, Vecna) | 1024x1024 | 256x256 | 24-32 | 4x6 or 4x8 |
| Swarm | 256x256 | 64x64 | 8 | 4x2 grid |

### Frame Layout Example: Demodog (512x512, 4x4 grid)

```
┌─────────┬─────────┬─────────┬─────────┐
│ Idle 1  │ Idle 2  │ Walk 1  │ Walk 2  │  Row 1
├─────────┼─────────┼─────────┼─────────┤
│ Walk 3  │ Walk 4  │ Attack 1│ Attack 2│  Row 2
├─────────┼─────────┼─────────┼─────────┤
│ Attack 3│ Attack 4│ Hurt 1  │ Hurt 2  │  Row 3
├─────────┼─────────┼─────────┼─────────┤
│ Death 1 │ Death 2 │ Death 3 │ Death 4 │  Row 4
└─────────┴─────────┴─────────┴─────────┘

Each frame: 128x128 pixels
Total: 512x512 PNG
Transparency: Yes (alpha channel)
```

### Color Depth
- **32-bit RGBA** (8-bit per channel + alpha)
- Use transparency for edges (no white backgrounds!)
- Anti-aliasing on edges for smooth look

---

## Art Style Guide

### Color Palette (From gameConfig.ts)

**Base Colors:**
```
Shadow Dark:  #0a0a12  (deep navy/black for silhouettes)
Metal:        #2a2d35  (gunmetal gray for details)
Concrete:     #4a4a4a  (mid-gray for body)
```

**Glow/Emissive Colors:**
```
Infection Primary:   #00ffcc  (teal bioluminescent - MAIN GLOW)
Infection Secondary: #39ff14  (sickly green - accents)
Danger Red:          #8b0000  (boss enemies)
Vecna Purple:        #660066  (Vecna specific)
Portal Violet:       #9900ff  (dimensional effects)
Memory Gold:         #ffd700  (evidence/collectibles)
```

### Visual Principles

1. **Dark Silhouettes with Bright Accents**
   ```
   Body:      Dark gray/black (#1a1a1a)
   Eyes:      Bright teal glow (#00ffcc)
   Mouth:     Bright teal glow (#00ffcc)
   Details:   Subtle highlights (#4a4a4a)
   ```

2. **Clear Readable Shapes**
   - Strong silhouette (recognizable even as pure black)
   - Exaggerated features (big eyes, big mouth)
   - High contrast between dark and light

3. **Stranger Things Aesthetic**
   - Organic, slightly grotesque designs
   - Bioluminescent infection theme
   - Unsettling but not overly gory

---

## Animation Guide

### Animation Principles

1. **Squash and Stretch**
   - Compress sprite on landing
   - Stretch sprite during jump/charge
   - Adds weight and impact

2. **Anticipation**
   - Wind-up frame before attack
   - Crouch before jump
   - Makes actions readable

3. **Follow-Through**
   - Parts continue moving after main action
   - Tail/tentacles lag behind
   - Adds fluidity

### Frame Count by Animation Type

| Animation | Frames | FPS | Duration | Notes |
|-----------|--------|-----|----------|-------|
| Idle | 2-4 | 4-6 | Loop | Breathing, slight movement |
| Walk | 4-6 | 8-10 | Loop | Full walk cycle |
| Attack | 3-5 | 10-12 | Once | Wind-up → strike → follow-through |
| Hurt | 2 | 8 | Once | Flinch back |
| Death | 4-6 | 6-8 | Once | Dramatic fall/dissolve |

### Example: Demodog Walk Cycle (4 frames)

```
Frame 1: Left front leg forward, right back leg forward
Frame 2: Mid-stride, body compressed
Frame 3: Right front leg forward, left back leg forward
Frame 4: Mid-stride, body compressed (mirror of frame 2)

Loop: 1 → 2 → 3 → 4 → repeat
FPS: 8 (125ms per frame)
```

---

## Glow & Effects

### Glow Technique

**Layer Structure (in Photoshop/Krita):**
```
Layer 5: Outer Glow (large, soft, 50% opacity)
Layer 4: Inner Glow (small, hard, 80% opacity)
Layer 3: Detail highlights
Layer 2: Base color
Layer 1: Dark silhouette
```

**Glow Settings:**
- **Outer Glow:** Gaussian blur 10-15px, color #00ffcc, 50% opacity
- **Inner Glow:** Gaussian blur 3-5px, color #00ffcc, 80% opacity
- **Blend Mode:** Add or Screen (not Normal!)

### Per-Pixel Glow Example

```
For eyes/mouth (bright teal #00ffcc):

Core pixel:     #00ffcc (full bright)
1px ring:       #00ccaa (80% bright)
2px ring:       #008877 (50% bright)
3px ring:       #004444 (20% bright, fades to black)

Creates soft, luminous glow effect
```

---

## Tools & Workflow

### Recommended Tools

#### Option 1: Aseprite (BEST for pixel art)
- **Cost:** $20 (one-time)
- **Best for:** Frame-by-frame animation, sprite sheets
- **Export:** Built-in sprite sheet export
- **Download:** https://www.aseprite.org/

#### Option 2: Krita (FREE, good for painted sprites)
- **Cost:** Free
- **Best for:** Hand-drawn/painted sprites, glow effects
- **Export:** Manual sprite sheet layout
- **Download:** https://krita.org/

#### Option 3: Photoshop/Photopea (Professional)
- **Cost:** $10/month (Photoshop) or Free (Photopea web app)
- **Best for:** High-detail work, effects
- **Export:** Manual layout

---

## AI-Assisted Workflow

### DALL-E 3 / Midjourney Prompts

**Basic Enemy (Demodog):**
```
"horror creature sprite, quadrupedal demon dog, glowing cyan eyes,
dark silhouette, bioluminescent details, pixel art style,
top-down view, transparent background, game asset"
```

**Boss Enemy (Demogorgon):**
```
"demogorgon from stranger things, flower-shaped head with teeth,
dark horror aesthetic, glowing teal accents, sprite sheet frame,
isometric view, 256x256 pixels, transparent PNG"
```

**Flying Enemy (Demobat):**
```
"bat creature with leathery wings, glowing veins, dark horror style,
sprite animation frame, top-down pixel art, bioluminescent cyan,
transparent background"
```

### Stable Diffusion Workflow

**Model:** Stable Diffusion XL or Midjourney v6
**Settings:**
- Resolution: 1024x1024 (then crop to 512x512)
- Steps: 30-50
- CFG Scale: 7-10
- Negative prompt: "blurry, low quality, jpeg artifacts, white background"

**Post-Processing:**
1. Remove background (remove.bg or Photoshop magic wand)
2. Import to Aseprite
3. Trace outline with crisp edges
4. Add glow layers
5. Create animation frames (duplicate + modify)

---

## Enemy-Specific Guides

### 1. Demodog (Basic Enemy)

**Description:** Small quadrupedal horror, dog-like
**Size:** 128x128 per frame, 512x512 sheet (16 frames)
**Color:** Dark gray body, teal glowing eyes/mouth

**Key Features:**
- Four legs (dog stance)
- Large mouth with teal glow
- Small glowing eyes
- Low to ground posture

**Animation Notes:**
- Walk: 4-legged walk cycle
- Attack: Lunge forward, mouth open wide
- Death: Dissolve into particles (glow fades)

**DALL-E Prompt:**
```
"demon dog sprite, small quadrupedal horror creature,
glowing cyan bioluminescent eyes and mouth, dark silhouette,
top-down game sprite, pixel art style, transparent background,
128x128 pixels"
```

---

### 2. Demobat (Flying Enemy)

**Description:** Flying bat with glowing veins
**Size:** 128x128 per frame, 512x512 sheet (12 frames)
**Color:** Dark body, teal glowing wing veins

**Key Features:**
- Large wings (spread or folded)
- Glowing vein network
- Small body, big wings
- Always airborne (no ground shadow in-game)

**Animation Notes:**
- Idle/Hover: Wings slowly flap
- Fly: Fast wing flap
- Attack: Dive bomb motion
- Death: Fall and disintegrate

**DALL-E Prompt:**
```
"horror bat creature sprite, large leathery wings with glowing veins,
bioluminescent cyan pattern, dark gothic aesthetic, flying pose,
top-down pixel art, transparent background, game asset"
```

---

### 3. Demogorgon (Boss Enemy)

**Description:** Iconic Stranger Things monster, flower head
**Size:** 256x256 per frame, 1024x1024 sheet (16 frames)
**Color:** Dark flesh, red glow (boss color)

**Key Features:**
- Flower-shaped head with teeth (signature look)
- Humanoid body, hunched
- Long arms
- Intimidating size (2x larger than Demodog)

**Animation Notes:**
- Idle: Breathing, head petals slightly move
- Walk: Slow, menacing stride
- Charge Windup: Crouch, head opens wide (3 frames)
- Charge: Sprint forward, arms back (3 frames)
- Attack: Slash or bite motion
- Death: Dramatic fall, head closes

**DALL-E Prompt:**
```
"demogorgon monster sprite, flower-shaped head with sharp teeth,
humanoid body, dark horror aesthetic, red glowing accents,
muscular build, boss enemy, 256x256 pixel art, transparent PNG,
menacing pose"
```

---

### 4. Mind Flayer (Major Boss)

**Description:** Massive psychic horror entity
**Size:** 256x256 per frame, 1024x1024 sheet (24 frames)
**Color:** Deep black with teal psychic energy

**Key Features:**
- Tentacle mass or shadowy form
- Glowing psychic aura
- Multiple glowing "eyes" or nodes
- Abstract/eldritch appearance

**Animation Notes:**
- Float: Hovering, tentacles drift
- Psychic Attack: Energy waves emanate
- AOE Attack: Explosion of tentacles
- Summon: Portal opens, minions emerge
- Death: Implodes into particles

**DALL-E Prompt:**
```
"mind flayer eldritch horror sprite, tentacle mass,
glowing psychic energy, dark lovecraftian aesthetic,
floating ethereal form, teal bioluminescent accents,
boss monster, 256x256 pixels, transparent background"
```

---

### 5. Vecna (Final Boss - PREMIUM QUALITY)

**Description:** Humanoid lich-like villain, final boss
**Size:** 256x256 per frame, 1024x1024 sheet (32 frames!)
**Color:** Decayed flesh, purple glow, clock motifs

**Key Features:**
- Humanoid but twisted/decayed
- One reaching hand (telekinesis)
- Purple glowing eyes
- Clock face elements (Stranger Things reference)
- Tattered robes or vines

**Animation Notes (4 phases):**
- Phase 1 (Telekinesis): Hand reaches out, objects levitate
- Phase 2 (Mind Invasion): Eyes glow bright, psychic waves
- Phase 3 (Shadow Summon): Arms spread, portal opens
- Phase 4 (Desperation): Glows bright purple, clock visible
- Special: Clock Mechanic - clock face appears around sprite
- Death: Dramatic multi-frame disintegration

**DALL-E Prompt:**
```
"vecna lich villain sprite, humanoid undead sorcerer,
reaching hand with purple glowing energy, decayed flesh,
dark fantasy horror, clock motif, purple bioluminescent eyes,
final boss character, 256x256 pixel art, menacing pose,
transparent PNG background"
```

---

## Quality Checklist

Before exporting your sprite sheet, verify:

- [ ] **Correct canvas size** (512x512 or 1024x1024)
- [ ] **Correct frame count** (matches spriteConfig.ts)
- [ ] **Transparent background** (no white/black BG)
- [ ] **Glow effects applied** (eyes, mouth, accents)
- [ ] **Animations smooth** (test in Aseprite preview)
- [ ] **Consistent style** (all frames match aesthetic)
- [ ] **Crisp edges** (anti-aliasing but not blurry)
- [ ] **Readable silhouette** (clear shape even as black)
- [ ] **Correct grid alignment** (frames don't overlap)
- [ ] **File format: PNG** (not JPG!)
- [ ] **File size < 500 KB** (optimize if larger)

---

## Export Settings

### Aseprite Export
```
File → Export Sprite Sheet

Settings:
- Layout: By Rows (4 columns)
- Output File: /assets/sprites/[enemy]_sheet.png
- Image Format: PNG
- Layers: Merge visible layers
- Trim Cels: No (keep consistent frame size)
- Borders: 0px padding
- Shape: Grid
```

### Photoshop/Krita Export
```
1. Create new canvas (512x512 or 1024x1024)
2. Place frames in grid (use guides)
3. Merge layers
4. File → Export As → PNG
5. Settings: Transparency ON, Interlace OFF
```

---

## File Naming Convention

```
/home/user/Dubai-Terror/client/public/assets/sprites/

demodog_sheet.png           (512x512, 16 frames)
demobat_sheet.png           (512x512, 12 frames)
demogorgon_sheet.png        (1024x1024, 16 frames)
mindflayer_sheet.png        (1024x1024, 24 frames)
vecna_sheet.png             (1024x1024, 32 frames)
swarm_sheet.png             (256x256, 8 frames)
```

---

## Testing Your Sprites

### In-Game Preview

1. Export sprite sheet to `/client/public/assets/sprites/`
2. Run `npm run dev`
3. Check Level 1 (Demodog should appear)
4. Verify:
   - Sprite renders correctly (no distortion)
   - Animations play smoothly
   - Glow effects visible
   - Size is appropriate (not too big/small)
   - Billboard mode works (sprite faces camera)

### Quick Test Script

Create `test_sprite.html` to preview animations:

```html
<!DOCTYPE html>
<html>
<body style="background: #0a0a12;">
  <canvas id="canvas" width="512" height="512"></canvas>
  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = 'demodog_sheet.png';

    img.onload = () => {
      let frame = 0;
      setInterval(() => {
        ctx.clearRect(0, 0, 512, 512);
        const frameX = (frame % 4) * 128;
        const frameY = Math.floor(frame / 4) * 128;
        ctx.drawImage(img, frameX, frameY, 128, 128, 192, 192, 128, 128);
        frame = (frame + 1) % 16;
      }, 100);
    };
  </script>
</body>
</html>
```

---

## Optimization Tips

### File Size Reduction

1. **Use TinyPNG** (https://tinypng.com/)
   - Reduces PNG size by 50-70%
   - No visible quality loss
   - Free for <20 images/month

2. **Indexed Color Mode** (Aseprite)
   - 256 colors max (still looks great)
   - 50% smaller than 32-bit

3. **Remove Unused Frames**
   - Only include frames actually used
   - Trim empty space

### Performance Tips

- Keep frame size consistent (128x128 or 256x256)
- Use power-of-2 dimensions (128, 256, 512, 1024)
- Avoid excessive glow (CPU intensive)
- Limit particle counts

---

## Common Mistakes to Avoid

❌ **White/black backgrounds** → Use transparency!
❌ **Inconsistent frame sizes** → Causes distortion
❌ **Too many frames** → Unnecessary file size
❌ **Blurry edges** → Looks unprofessional
❌ **Low contrast** → Hard to see in dark levels
❌ **No glow effects** → Loses Stranger Things vibe
❌ **Wrong grid layout** → Animations break
❌ **JPEG format** → Use PNG only!

---

## Getting Help

### Resources

- **Enter the Gungeon Art Analysis:** Study existing sprites for reference
- **Aseprite Tutorials:** https://www.aseprite.org/docs/
- **Pixel Art Theory:** https://lospec.com/pixel-art-tutorials
- **Color Palette Tool:** https://coolors.co/

### Community

- **r/PixelArt** on Reddit
- **Lospec Community**
- **Aseprite Discord**

---

## Next Steps

1. **Start with Demodog** (simplest enemy, good for practice)
2. **Test in-game** (verify rendering works)
3. **Iterate on style** (adjust colors, glow, size)
4. **Move to Demobat** (flying variation)
5. **Tackle bosses** (Demogorgon → Mind Flayer → Vecna)

**Estimated Time:**
- Demodog: 1-2 hours (learning curve)
- Demobat: 1 hour (familiar now)
- Demogorgon: 2-3 hours (boss detail)
- Mind Flayer: 3-4 hours (complex design)
- Vecna: 4-6 hours (premium final boss)

**Total: 12-16 hours for all enemies** (vs 30-40 hours for 3D models!)

---

**Good luck creating premium sprites! Your game will look incredible with this Enter the Gungeon style approach. 🎮✨**
