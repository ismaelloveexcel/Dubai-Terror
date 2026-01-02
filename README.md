# SAVE ISMAEL

[![Open in VS Code](https://img.shields.io/badge/Open%20in-VS%20Code-007ACC?logo=visualstudiocode)](https://vscode.dev/github/ismaelloveexcel/Dubai-Terror)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Open%20in-GitHub%20Codespaces-24292e?logo=github)](https://codespaces.new/ismaelloveexcel/Dubai-Terror)

> **An Upside Down Dubai Adventure**  
> *A Stranger Things-inspired 3D FPS game - A gift from Uncle Ismael to Aidan*

![Save Ismael Banner](https://via.placeholder.com/800x200/cc0000/ffffff?text=SAVE+ISMAEL)

## 🎮 About The Game

**SAVE ISMAEL** is a personal gift project - a Stranger Things-inspired first-person shooter set in an "Upside Down" version of Dubai. Uncle Ismael has gone missing, and it's up to Aidan to venture through corrupted Dubai landmarks to find him and defeat the terrifying Vecna.

### Story Synopsis

> *Mammoo Ismael was supposed to meet Aidan at Ibn Battuta Mall for their regular movie night. He never showed up. Instead, Aidan received a cryptic voice note about "something wrong" and "the lights looking different."*
>
> *Now Aidan must journey through six corrupted Dubai locations, collecting evidence of his uncle's path while battling creatures from the Upside Down. The Mind Flayer and Vecna await at the end of this nightmare...*

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Game Engine**: Babylon.js 6.38
- **Backend**: Express.js
- **3D Assets**: Meshy.ai generated GLB models
- **Styling**: CSS with Stranger Things-inspired dark theme

## 🗺️ Game Levels

| Level | Location | Boss | Evidence |
|-------|----------|------|----------|
| 1 | Ibn Battuta Mall | - | Car Keys + Parking Ticket |
| 2 | Dubai Metro | Demogorgon | Wallet + Photo |
| 3 | Dubai Frame | - | Cracked Phone |
| 4 | Dubai Marina | **Mind Flayer** | Watch (stopped at 7:42 PM) |
| 5 | Downtown Dubai | - | Gift Bag + Note |
| 6 | Burj Khalifa | **VECNA** | Final Recording |

## 🎯 Features

- **6 Unique Levels** - Each based on iconic Dubai landmarks
- **Evidence System** - Collect Uncle Ismael's belongings to piece together the story
- **Voice Notes** - Mammoo's messages guide you through each level
- **Boss Battles** - Face the Mind Flayer and ultimate boss Vecna
- **Memory Mechanics** - Use memories to counter Vecna's attacks
- **Mobile Support** - Virtual joystick controls for mobile devices
- **Save System** - Continue your progress across sessions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ismaelloveexcel/terror-in-dubai.git
cd terror-in-dubai/save-ismael

# Install dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Development

```bash
# Run client development server
cd client
npm run dev

# Run server (in separate terminal)
cd server
npm run dev
```

### Production Build

```bash
# Build client
cd client
npm run build

# Start production server
cd ../server
NODE_ENV=production npm start
```

### Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment options including:
- **Railway** (Recommended) - Easiest full-stack deployment
- **Render** - Free tier available
- **Vercel + Railway** - Maximum performance split deployment
- **AWS/Google Cloud** - Enterprise options

## 📁 Project Structure

```
save-ismael/
├── client/                 # React + Babylon.js frontend
│   ├── src/
│   │   ├── config/        # Game configuration
│   │   ├── core/          # Core game systems
│   │   ├── player/        # Player controller, weapons
│   │   ├── enemies/       # Enemy types (Demodog, Demobat, etc.)
│   │   ├── levels/        # All 6 level implementations
│   │   ├── ui/            # HUD, menus, dialogue
│   │   ├── effects/       # Particles, lighting
│   │   └── types/         # TypeScript definitions
│   └── public/
├── server/                 # Express.js backend
│   ├── src/
│   │   └── index.js       # Server entry point
│   └── assets/            # GLB model files
└── docs/                   # Documentation
```

## 🎨 Visual Design

The game features a **Stranger Things-inspired Upside Down** aesthetic:

- **Color Palette**:
  - Shadows: Deep navy/black (#0a0a12)
  - Infection: Teal bioluminescent (#00cccc)
  - Emergency Lights: Warm orange (#ff6b00)
  - Danger/Boss: Deep red (#cc0000)

- **Atmosphere**:
  - Dense fog effects
  - Wet, reflective surfaces
  - Corruption vines and organic growths
  - Flickering emergency lighting

## 🕹️ Controls

### Desktop
- **WASD** - Movement
- **Mouse** - Look around
- **Left Click** - Fire/Attack
- **E** - Interact/Collect
- **ESC** - Pause menu

### Mobile
- **Left Joystick** - Movement
- **Touch drag** - Look around
- **Fire Button** - Attack
- **Use Button** - Interact

## 📝 Credits

### Development
- **Game Design & Development**: Uncle Ismael
- **3D Assets**: Generated with [Meshy.ai](https://meshy.ai)
- **Engine**: [Babylon.js](https://babylonjs.com)

### Inspiration
- **Stranger Things** © Netflix
- **Dubai Landmarks** - Ibn Battuta Mall, Dubai Metro, Dubai Frame, Dubai Marina, Downtown Dubai, Burj Khalifa

### Dedication

> *In the game: You walked into the Upside Down and dragged me out.*  
> *In real life: Same energy, honestly.*
>
> *Vecna thought he understood what makes people strong.*  
> *He didn't.*
>
> *See you at movie night. Bring snacks.*
>
> — **Mammoo Ismael, 2025**

## 📄 License

This project is a personal gift and is not intended for commercial use.
All Stranger Things references are property of Netflix.

---

**Made with ❤️ for Aidan**
