# Reinfitify

A modern, single-page music player inspired by streaming app layouts, built with plain HTML, CSS, and JavaScript.

<p align="center">
  <strong style="font-size: 18px;">DEVELOPER</strong><br />
  <strong style="font-size: 20px; letter-spacing: 0.4px;">reinF-(Saugat Sapkota)</strong>
</p>

---

## Project Description

Reinfitify is a front-end music experience focused on visual polish and interactive controls without any build tools or frameworks. It includes a sidebar library, dynamic sections, track interactions, an interactive bottom player, profile dropdown actions, and local audio playback support.

The interface is designed to feel app-like while still running as a lightweight static project.

## Key Features

- Single-page music UI with responsive, modern styling.
- Separated architecture:
  - HTML in [reinfitify.html](reinfitify.html)
  - CSS in [reinfitify.css](reinfitify.css)
  - JavaScript in [reinfitify.js](reinfitify.js)
- Sidebar navigation with clickable states:
  - Home scrolls to top
  - Search focuses the search field
  - Library scrolls to release section
  - Liked Songs scrolls to trending section
- Profile avatar dropdown with actions:
  - Profile
  - Settings
  - Logout
- Hero play button wired to local MP3 playback.
- Quick picks, albums, and trending tracks interactions.
- Play/pause, next/previous, seek bar, repeat, and shuffle behaviors.
- Live progress and duration updates for active playback.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Google Fonts

## Project Structure

```
reinfitify/
|-- reinfitify.html
|-- reinfitify.css
|-- reinfitify.js
|-- 247_Dream_LoFi_Chillwave_Vol_01_Luminous_Drift_Studio_256KBPS.mp3
|-- README.md
```

## Setup and Run

1. Place all project files in the same folder.
2. Ensure the MP3 file name matches exactly:

   `247_Dream_LoFi_Chillwave_Vol_01_Luminous_Drift_Studio_256KBPS.mp3`

3. Open [reinfitify.html](reinfitify.html) in a browser.

No package installation or build step is required.

## How to Use

1. Click the hero **Play** button to start the local featured track.
2. Use sidebar nav items for section navigation and search focus.
3. Click the profile avatar for Profile, Settings, and Logout options.
4. Use the bottom player controls to play/pause, seek, skip, repeat, and shuffle.
5. Click songs/albums/quick picks to switch tracks.

## Customization

- Update colors, spacing, and typography in [reinfitify.css](reinfitify.css).
- Edit track metadata and playback logic in [reinfitify.js](reinfitify.js).
- Replace icons/content blocks in [reinfitify.html](reinfitify.html).
- Swap the featured audio by changing the hero source in [reinfitify.js](reinfitify.js).

## Notes

- This project is intentionally framework-free for easy editing and learning.
- Best experience is on modern desktop and mobile browsers.
