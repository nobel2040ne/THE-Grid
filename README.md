# <img src="assets/favicon.ico" alt="Weekly Rhythm icon" width="24" /> THE Grid

Weekly Rhythm is a local-first weekly routine planner for repeating personal schedules. It is a static browser app built with plain `HTML`, `CSS`, and `JavaScript`.

The app stores schedules in browser `localStorage`; there is no account system, backend, or build step.

## Features

- Local-only data under a single `local` user profile
- Collection and schedule management: `NEW`, `COPY`, `RENAME`, `DELETE`
- Adjustable visible time range and visible days of the week
- Notion Calendar-inspired routine editing
- Drag empty grid space to create a routine
- Drag routine cards to move them across day/time
- Resize routines from their top or bottom edge
- Side-by-side layout for overlapping routines
- Live-editing panel for name, note, place, priority, time, and color
- Empty-space click/touch dismisses the editor
- `Delete` / `Backspace` deletes the selected routine
- Light and dark mode
- Header color, palette presets, and custom color picker
- JSON data import/export
- PNG image export of the weekly schedule
- Responsive desktop and mobile layout

## Usage

Open `index.html` in a browser.

The app works as a static site. Internet access is only needed for the CDN-loaded libraries and fonts declared in `index.html`:

- Font Awesome icons
- Google Fonts stylesheet
- `html2canvas` for PNG export

## Editing Routines

- Drag on an empty schedule area to create a time block.
- Start typing in the editor to turn the draft into a routine automatically.
- Click an existing routine to edit it.
- Drag an existing routine to move it.
- Drag the top or bottom edge of a routine to resize it.
- Click/touch empty space to close the editor.

## Controls

Schedule controls live in the sliders pill:

- `Collection`: choose the current collection
- `Schedule`: choose, create, copy, rename, or delete a schedule
- `View`: choose visible start/end time and weekdays

Appearance controls live in the palette pill:

- Theme: light or dark
- Header: schedule header color
- Palette: apply a color set to current routines
- Custom color: choose a specific routine color from the editor

Data controls live in the separate import/export pill:

- Up arrow: export schedule data as JSON
- Down arrow: import schedule data from JSON

The camera button exports the current weekly schedule as a PNG.

## Data Storage

Current data is stored in browser `localStorage`:

- `tt_data_v1_local`: all schedule collections and routines
- `tt_view_settings_v1`: visible time range and weekdays
- `tt_header_color_v1`: selected header color
- `tt_card_info_v1`: which routine details are shown on cards
- `tt_theme_v1`: light/dark theme

Older per-user data is migrated once into `tt_data_v1_local` when possible. Clearing browser storage removes local schedules and preferences.

## Project Files

- `index.html`: application markup and external script/style references
- `style.css`: layout, responsive behavior, themes, and component styling
- `app.js`: schedule data model, grid rendering, drag/edit behavior, import/export
- `assets/fonts/`: local Yoon BlackFit font files
- `assets/favicon.ico`: app icon

## Development Notes

There is no package manager setup and no build command. For a quick syntax check:

```bash
node --check app.js
```
