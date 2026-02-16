# <img src="assets/favicon.ico" alt="THE Grid icon" width="24" /> THE Grid

THE Grid is a browser-based timetable web application with an SNU-inspired visual system.  
It is built with plain `HTML/CSS/JavaScript` and stores data in browser `localStorage`.

## Design

- Core palette: `SNU Blue / Gold / Beige / Gray`
- Clean, low-noise layout focused on timetable readability
- Local `Yoon BlackFit` typography for strong visual hierarchy

## Core Features

- Login / Register / Logout
- Semester-based timetable management (`NEW`, `COPY`, `RENAME`)
- Course add/edit/delete with multi-slot schedules
- Grid drag-to-create time slots
- Palette-based color styling and card info toggles
- PNG export (`html2canvas` with fallback)
- Responsive behavior for desktop and mobile

## Data Storage

Stored in browser `localStorage`:

- `tt_users_v1`
- `tt_session_v1`
- `tt_data_v1_<userId>`
- `tt_card_info_v1`

## Notes

- Authentication is client-side only.
- Clearing browser storage removes all saved data.
