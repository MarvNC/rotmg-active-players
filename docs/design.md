## 1. Visual Identity & Brand

The design should feel professional, authoritative, and modern. It utilizes a aggressive red primary color against a near-black canvas to echo the "Realm of the Mad God" aesthetic without being over-the-top.

### Color Palette

| Category       | Variable     | HEX Code  | Usage                                           |
| -------------- | ------------ | --------- | ----------------------------------------------- |
| **Primary**    | `brand-red`  | `#dc2828` | Key actions, brand accents, primary data lines. |
| **Background** | `bg-dark`    | `#0a0a0a` | Main application background.                    |
| **Surface**    | `surface-1`  | `#171717` | Cards, sidebars, and main containers.           |
| **Highlight**  | `surface-2`  | `#262626` | Hover states, table headers, input backgrounds. |
| **Success**    | `emerald`    | `#10b981` | Positive trends, growth indicators.             |
| **Text**       | `text-main`  | `#f3f4f6` | Primary headings and body text.                 |
| **Muted**      | `text-muted` | `#737373` | Secondary labels, timestamps, help text.        |

### Typography

- **Fonts** Russo One (theme), Sora

```css
@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Sora:wght@100..800&display=swap');
```

- **Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold).
- **Data/Numbers:** Use `tabular-nums` and a monospaced font (e.g., `JetBrains Mono` or system mono) for table values to ensure vertical alignment.

---

## 2. Layout & Structure

The layout follows a standard **single-column dashboard** approach with a max-width container of `1280px` (7xl).

- **Navigation:** A sticky top header with a blurred background (`backdrop-blur`).
- **Spacing:** Use a base-4 system (4px, 8px, 16px, 24px, 32px) for margins and padding.
- **Corners:** Default `border-radius` of `0.25rem` (4px) for small elements and `0.75rem` (12px) for cards.

---

## 3. Component Specifications

### A. Summary Cards

Used for "at-a-glance" metrics like current player count or all-time peaks.

- **Border:** `1px` solid `surface-2`.
- **Hover State:** Subtle border color shift to `brand-red` (30% opacity).
- **Micro-interactions:** Icons should change color or scale slightly when the parent card is hovered.

### B. Charting (Historical Trends)

The primary chart should be a line graph with a shaded area underneath.

- **Line Weight:** `3px` with rounded joins.
- **Area Fill:** Linear gradient from `brand-red` (30% opacity) to transparent.
- **Grid:** Minimal horizontal lines using `surface-2`. No vertical lines except for the Y-axis boundary.
- **Interactivity:** A vertical "crosshair" line should appear on hover with a high-contrast tooltip displaying the specific date and player count.

### C. Data Tables

Used for granular historical logs.

- **Header:** Fixed `bg-surface-2` with uppercase, tracking-wide labels.
- **Rows:** Alternating "Zebra" stripes (even rows at 2% opacity).
- **Sorting:** Indicators (arrows) should only appear on hover or when a column is actively sorted.
- **Trend Badges:** Use small, pill-shaped backgrounds for delta values (e.g., `+120` in emerald background, `-55` in red background).

---

## 4. UI Elements & States

### Buttons & Controls

- **Primary Button:** Solid `brand-red`, white text, shadow on hover.
- **Secondary/Outline:** Transparent background, `surface-2` border, transition to `surface-2` background on hover.
- **Range Selectors:** A segmented control (pills) where the active state is highlighted with a shadow and distinct background color.

### Form Inputs (Search/Filter)

- **Input Background:** `bg-surface-2`.
- **Focus State:** Ring of `brand-red` (2px) with a transition of `150ms`.
- **Icons:** Always left-aligned within inputs to provide visual context (e.g., search magnifying glass).
