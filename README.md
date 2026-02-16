# THE Grid

THE Grid is a browser-based timetable management application designed with an SNU-aligned visual identity.  
The product is implemented with `HTML/CSS/JavaScript` (no build pipeline) and persists user-level data in browser `localStorage`.

## Design Framework [SNU]

The interface follows a restrained, institutional design language optimized for readability and operational clarity.

- Primary palette: `SNU Blue / Gold / Beige / Gray`
- Layout direction: light paper-tone workspace, navy navigation, low-noise grid structure
- Typography: high-legibility card hierarchy using the `Yoon BlackFit` family
- Interaction model: minimal controls for utility surfaces (panel/modal), information-first timetable presentation

Key color tokens (`style.css`):

- `--snu-blue: rgb(15, 15, 112)`
- `--snu-gold: rgb(135, 116, 68)`
- `--snu-beige: rgb(220, 218, 178)`
- `--snu-gray: rgb(102, 102, 102)`

## Core Capabilities

- Account lifecycle: `Login`, `Register`, `Logout` (browser-local credential store)
- Semester-scoped timetable operations: `NEW`, `COPY`, `RENAME`
- Course lifecycle management: create, update, delete
- Multi-slot scheduling per course (multiple day/time segments)
- Direct grid drag interaction for rapid slot creation
- Color strategy controls: individual selection and palette-wide application
- Card metadata policy: choose up to two fields from `Professor`, `Room`, `Credit`
- PNG export pipeline: `html2canvas` primary path with SVG/Canvas fallback
- Responsive operation: mobile bottom-sheet panel + desktop timetable width resizing

## Technology Profile

- Markup: `HTML5`
- Styling: `CSS3` with Custom Properties
- Application logic: `Vanilla JavaScript (ES6+)`
- Third-party library: `html2canvas` (CDN)
- Typography assets: `Yoon BlackFit` (local), `Noto Sans KR` (Google Fonts)

## Repository Structure

```text
Timetable/
├─ index.html
├─ style.css
├─ app.js
└─ assets/
   ├─ favicon.ico
   └─ fonts/
      ├─ YoonBlackFit44.ttf
      ├─ YoonBlackFit55.ttf
      ├─ YoonBlackFit66.ttf
      └─ YoonBlackFit77.ttf
```

## Standard User Workflow

1. Create an account via `REGISTER` and authenticate with `LOG IN`.
2. Select the target `Semester` and `Timetable`.
3. Enter course information in the side panel and submit with `ADD`.
4. Open any course card to edit or delete in the detail modal.
5. Export the final schedule via `SAVE IMAGE`.

## Data Governance

Persistent state is stored in browser `localStorage` under the following keys:

- `tt_users_v1`: user credential records
- `tt_session_v1`: active session identifier
- `tt_data_v1_<userId>`: per-user semester/timetable/course dataset
- `tt_card_info_v1`: card metadata display preference

## Security and Operational Notes

- Passwords are hashed before storage, but authentication remains fully client-side.
- This implementation is not intended as a production-grade identity system.
- Clearing browser storage removes all persisted timetable and session data.
- Offline environments may restrict CDN-dependent resources (`html2canvas`, Google Fonts).

## Configuration Surface

- Theme tokens: `:root` in `style.css`
- Time model: `START_H`, `END_H`, `TIME_STEP` in `app.js`
- Semester catalog: `SEMESTERS` in `app.js`
- Color sets: `PALETTES` in `app.js`

## User Controls

- `Esc`: close detail modal, prompt modal, and custom select overlays
- Grid drag: create a timeslot directly from timetable view
- `Ctrl/Cmd` + drag: append slot instead of replacing current selection
