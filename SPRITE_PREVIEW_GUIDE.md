# 🎮 Sprite System Preview Guide

## How to See the Demodog Sprite Right Now

I've created **TWO ways** to preview the sprite system:

---

## Option 1: Static Preview (Easiest - 30 seconds)

Open this file in your browser:
```
/home/user/Dubai-Terror/client/public/sprite_preview.html
```

**What you'll see:**
- Animated Demodog sprite (4x4 grid layout)
- Animation controls (Idle, Walk, Attack, Death)
- Live preview of sprite sheet
- Style guide and specifications

**To open:**
```bash
# From project root
cd client/public
# Then open sprite_preview.html in your browser
# Or run a simple server:
python3 -m http.server 8080
# Then visit: http://localhost:8080/sprite_preview.html
```

---

## Option 2: In-Game Preview (See it working - 2 minutes)

**Run the actual game with sprite rendering:**

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Start dev server
npm run dev

# 3. Open browser to http://localhost:5173
```

**What you'll see:**
- Demodogs are now rendered as 2D sprites!
- Billboard mode (sprites always face camera)
- Ground shadows beneath enemies
- Particle trails (infection spores)
- Smooth animations (idle, walk, attack)
- All atmospheric effects working (fog, bloom, etc.)

---

## What's Different from Before?

### Before (3D GLB Models):
```
❌ Large file sizes (3.7 MB per enemy)
❌ Complex 3D geometry (slow rendering)
❌ Fallback to primitive shapes (boxes/capsules)
❌ No glow effects
```

### Now (2D Sprites):
```
✅ Tiny file sizes (~50 KB with final PNG, currently SVG)
✅ Simple billboards (fast rendering)
✅ Smooth animations (idle, walk, attack, death)
✅ Glowing teal eyes/mouth (Stranger Things vibe)
✅ Particle trails
✅ Ground shadows
✅ Screen shake on hit
✅ Death explosions
```

---

## Current Sprite Quality

**This is a TEMPORARY SVG placeholder** showing:
- Dark silhouette body (#1a1a1a)
- Glowing teal eyes (#00ffcc)
- Glowing teal mouth (#00ffcc)
- Simple dog-like shape
- 4 legs (quadrupedal stance)

**For the FINAL version**, you would:
1. Add more detail (teeth, claws, textures)
2. Create proper animation frames (smoother movement)
3. Add variations (different poses)
4. Export as high-res PNG (crisp edges)

---

## Testing Checklist

When you run the game, verify:

### Visual Quality:
- [ ] Sprite appears (not a black square)
- [ ] Sprite is the right size (not huge or tiny)
- [ ] Eyes and mouth glow teal
- [ ] Sprite always faces camera (billboard mode)
- [ ] Ground shadow visible beneath sprite

### Animations:
- [ ] Idle: Gentle breathing animation
- [ ] Walk: Legs move when chasing player
- [ ] Attack: Mouth opens wide
- [ ] Death: Sprite fades out

### Effects:
- [ ] Particle trail behind enemy (teal spores)
- [ ] Screen shakes when you hit enemy
- [ ] Death explosion (50 particles)
- [ ] Impact flash on hit

### Performance:
- [ ] FPS is stable (30+ on mobile, 60+ desktop)
- [ ] Post-processing works (fog, bloom visible)
- [ ] No lag when multiple enemies on screen

---

## Controls (In-Game)

**Desktop:**
- WASD: Move
- Mouse: Look around
- Left Click: Attack
- E: Interact (collect evidence)

**Mobile:**
- Left joystick: Move
- Right side drag: Look
- Fire button: Attack

---

## How to Replace with Your Own Sprite

Once you've seen the placeholder and want to create your own:

### Step 1: Create Sprite Art
Follow `SPRITE_ART_GUIDE.md` to create a 512x512 PNG with 16 frames.

### Step 2: Export File
Save as: `/client/public/assets/sprites/demodog_sheet.png`

### Step 3: Update Config
In `/client/src/config/spriteConfig.ts`, change line 36:
```typescript
// FROM (temporary SVG):
spriteSheetUrl: tempSpriteAssets.demodog,

// TO (your PNG):
spriteSheetUrl: '/assets/sprites/demodog_sheet.png',
```

### Step 4: Refresh Browser
Your sprite will automatically load!

---

## Temporary vs Final Comparison

| Feature | Current (SVG) | Final (PNG) |
|---------|--------------|-------------|
| File Size | ~20 KB | ~50 KB |
| Quality | Simple shapes | Detailed pixel art |
| Frames | 16 (basic) | 16 (animated) |
| Glow | Yes ✅ | Yes ✅ |
| Animations | Basic | Smooth |
| Detail Level | Low | High (Enter the Gungeon) |

---

## Troubleshooting

### "I don't see the sprite, just a black square"
- Check browser console for errors (F12)
- Verify the sprite sheet URL in `spriteConfig.ts`
- Make sure `tempSpriteAssets.ts` is imported correctly

### "Sprite is too big/small"
- Adjust size in `DemodogSprite.ts` line 33:
  ```typescript
  this.spriteRenderer.setSize(1.5); // Change this number
  ```

### "No animations playing"
- Check browser console for animation errors
- Verify frame counts match in `spriteConfig.ts`

### "No particles or effects"
- Particles may be disabled on low-end devices
- Check `performanceConfig` in `gameConfig.ts`

### "Build fails"
- Run `npm install` to ensure dependencies are installed
- Check for TypeScript errors: `npm run build`

---

## Next Steps

1. ✅ **View static preview** (`sprite_preview.html`)
2. ✅ **Run game** (`npm run dev`)
3. ✅ **Test sprite in Level 1** (demodogs spawn from portals)
4. 🔄 **Create your own sprite art** (follow `SPRITE_ART_GUIDE.md`)
5. 🔄 **Replace placeholder** (export PNG to `/assets/sprites/`)
6. 🔄 **Iterate and polish** (adjust colors, sizes, effects)

---

## Performance Notes

The sprite system is **much faster** than 3D:

**Before (3D GLB):**
- 3.7 MB download
- 1000s of vertices to render
- Complex lighting calculations
- Slow on mobile

**After (Sprites):**
- 50 KB download (98.6% smaller!)
- 4 vertices per sprite (billboard quad)
- Simple texture lookup
- Fast on mobile (can enable post-processing!)

---

## Questions?

Check these files:
- **Visual preview:** `client/public/sprite_preview.html`
- **Art guide:** `SPRITE_ART_GUIDE.md`
- **Implementation:** `SPRITE_SYSTEM_IMPLEMENTATION.md`
- **Main proposal:** `GRAPHICS_UX_IMPROVEMENT_PROPOSAL.md`

---

**Enjoy your premium sprite system! 🎮✨**

The Demodog is now rendered like Enter the Gungeon - fast, stylish, and ready to be replaced with your custom art whenever you're ready!
