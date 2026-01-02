# SAVE ISMAEL - Replit Configuration

## Overview

SAVE ISMAEL is a Stranger Things-inspired 3D first-person shooter game set in an "Upside Down" version of Dubai. Built as a personal gift project, players guide Aidan through six corrupted Dubai landmarks to rescue Uncle Ismael from Vecna. The game features Babylon.js WebGL rendering, a React frontend, and an Express.js backend for asset serving.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite bundler
- **Game Engine**: Babylon.js 6.38 for WebGL 3D rendering
- **State Management**: React hooks combined with custom game state classes
- **Styling**: CSS with Stranger Things-inspired dark theme (teal, red, purple palette)
- **PWA Support**: vite-plugin-pwa for installable web app capabilities

### Backend Architecture
- **Server**: Express.js with ES modules
- **Purpose**: Static asset serving and API endpoints
- **Security**: Helmet for HTTP headers, express-rate-limit for API protection
- **Compression**: gzip compression for asset delivery

### Game Structure
The game uses a modular architecture with clear separation:
- `client/src/core/` - Core systems (Game loop, Audio, Input, Save, Scene management)
- `client/src/player/` - Player controller, health, and weapon systems
- `client/src/enemies/` - Enemy types (Demodog, Demobat, Demogorgon, Mind Flayer, Vecna)
- `client/src/levels/` - Six level implementations for Dubai landmarks
- `client/src/ui/` - HUD, menus, and dialogue systems
- `client/src/config/` - Game configuration, audio, and sprite settings

### Rendering Approach
- **Hybrid 2D/3D**: Uses billboard sprites for enemies with 3D environments
- **Post-Processing**: Bloom, chromatic aberration, vignette, and fog effects
- **Fallback System**: Procedural mesh generation when 3D assets unavailable
- **Mobile Support**: Virtual joystick controls with adaptive performance settings

### Build & Development
- Root `package.json` uses concurrently to run client and server together
- Client builds with `tsc && vite build`
- Server runs with nodemon in development

## External Dependencies

### NPM Packages (Client)
- `@babylonjs/core`, `@babylonjs/gui`, `@babylonjs/loaders`, `@babylonjs/materials` - 3D engine
- `react`, `react-dom` - UI framework
- `vite`, `@vitejs/plugin-react` - Build tooling
- `vite-plugin-pwa` - Progressive Web App support

### NPM Packages (Server)
- `express` - HTTP server
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `cors` - Cross-origin support
- `compression` - Response compression
- `dotenv` - Environment variables

### External Services
- **Meshy.ai** - Optional 3D model generation for GLB assets (configured via VITE_MESHY_API_KEY)
- Assets can work with procedural fallbacks when Meshy is unavailable

### Asset Storage
- GLB models stored in `server/assets/` or loaded from cloud
- Audio files in `client/public/audio/`
- Sprite sheets in `client/public/sprites/`