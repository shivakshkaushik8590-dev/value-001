---
name: Old Money Parisian Evening-to-Day Salon
colors:
  surface: '#fef9ee'
  surface-dim: '#dedacf'
  surface-bright: '#fef9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3e8'
  surface-container: '#f2ede2'
  surface-container-high: '#ede8dd'
  surface-container-highest: '#e7e2d7'
  on-surface: '#1d1c15'
  on-surface-variant: '#414845'
  inverse-surface: '#323029'
  inverse-on-surface: '#f5f0e5'
  outline: '#717975'
  outline-variant: '#c1c8c4'
  surface-tint: '#42655b'
  primary: '#00251d'
  on-primary: '#ffffff'
  primary-container: '#183b32'
  on-primary-container: '#81a599'
  inverse-primary: '#a9cec2'
  secondary: '#725b29'
  on-secondary: '#ffffff'
  secondary-container: '#ffdfa0'
  on-secondary-container: '#79612f'
  tertiary: '#2d1c15'
  on-tertiary: '#ffffff'
  tertiary-container: '#443129'
  on-tertiary-container: '#b3988d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5ebdd'
  primary-fixed-dim: '#a9cec2'
  on-primary-fixed: '#002019'
  on-primary-fixed-variant: '#2b4d43'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#e1c387'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#584414'
  tertiary-fixed: '#fbdcd0'
  tertiary-fixed-dim: '#dec0b4'
  on-tertiary-fixed: '#281810'
  on-tertiary-fixed-variant: '#574239'
  background: '#fef9ee'
  on-background: '#1d1c15'
  surface-variant: '#e7e2d7'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '400'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Playfair Display
    fontSize: 38px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '400'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: DM Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.12em
  label-sm:
    fontFamily: DM Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.16em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style

This design system expresses quiet luxury, vintage hospitality, and historic European cafe culture. Rooted in the moody transition from night to morning—reminiscent of low-lit bistro wood, polished brass rails, marble tabletops, and tailored service—the visual identity leans heavily into classical editorial minimalism paired with rich, tactile material metaphors.

The emotional signature is unhurried, discreet, and deeply cultured. Interactions must evoke an exclusive salon rather than a fast-casual venue. Interface surfaces emphasize spacious margins, bespoke typographic hierarchy, whisper-thin hairlines, and deliberate restraint over loud motion or rounded, playful tech patterns.

## Colors

The palette derives from the timeless architecture of Grand European salons:

- **Primary (`#183B32` - Deep British Racing Green)**: Anchors structural elements, bespoke text headings, primary buttons, and immersive modal backdrops. Communicates heritage and permanence.
- **Secondary (`#B69A62` - Antique Gold)**: Used sparingly for high-touch decorative accents, active indicators, borders on specialty selections, and gilded typography highlights.
- **Tertiary (`#39271F` - Espresso Brown)**: Grounds body typography, secondary borders, and deep shadows, ensuring high contrast without stark digital black.
- **Neutral (`#F4EFE4` - Warm Ivory)**: Forms the base canvas and primary surface, emulating heavyweight cotton paper, archival menus, and aged limestone.
- **Accent Champagne (`#D8C9AC`)**: Provides subtle container fills, low-contrast hairline borders, and table dividers.

## Typography

The type scale balances high-contrast, editorial display serifs with modernist sans-serif utility.

- **Headings & Display**: Set in `Playfair Display`. Titles capture the romance of classic European publications, literature, and bespoke menu cards. Headings rely on generous vertical leading and subtle negative tracking at large scales.
- **Body & Functional Text**: Set in `DM Sans`. Clean, calm, and neutral. Prevents visual clutter across reservation flows, wine lists, and detailed ingredient compositions.
- **Labels & Microcopy**: Always set in `DM Sans` with small caps or uppercase formatting and deliberate tracking (`0.08em` to `0.16em`), evoking polished brass plaques, stamps, and formal invitations.

## Layout & Spacing

The layout is built around a structured editorial grid that transitions seamlessly across form factors:

- **Desktop (≥ 1200px)**: 12-column fixed grid with a max width of `1320px`, centered with `margin-desktop` (4rem) margins and wide gutters (`gutter-desktop` of 2.5rem) to create airy, asymmetric columns reminiscent of high-fashion magazines.
- **Tablet (768px – 1199px)**: 8-column fluid grid with `margin-tablet` (2.5rem) margins and 1.5rem gutters.
- **Mobile (< 768px)**: 4-column fluid grid with `margin` (1.25rem) margins and 1rem gutters.

Whitespace is treated as a physical luxury material. Vertical rhythm between content modules spans generous intervals using `space-xl` and higher multiples, avoiding dense, cramped SaaS-like card clusters.

## Elevation & Depth

Visual hierarchy abandons diffuse dropshadows in favor of tonal layering, warm ambient under-glows, and structural hairlines:

- **Surfaces**: Canvas layers utilize `#F4EFE4`. Raised elements (cards, menus, dialogs) shift to a crisp pale vellum (`#FCFAF6`) or drop into deep heritage contrast (`#183B32`).
- **Borders & Dividers**: Interfaces rely on single-pixel solid borders tinted in Muted Champagne (`#D8C9AC`) or low-opacity Antique Gold (`rgba(182, 154, 98, 0.35)`).
- **Shadows**: Where physical elevation is mandatory (e.g., sticky table reservations, wine selection sheets, floating menus), shadows use warm, deeply dispersed espresso tones: `0 16px 36px -8px rgba(57, 39, 31, 0.12)`. No stark grays or synthetic blurs.

## Shapes

The design system embraces an architectural, bespoke shape language using crisp right angles (`0` - Sharp). All containers, buttons, cards, imagery frames, and dropdown surfaces feature sharp, unrounded corners (`0px`). 

This deliberate absence of border radii reinforces heritage tailoring, fine stationery, bound leather volumes, and stone counters. Subtle inset borders and dual-stroke framing act as decorative alternatives to curvature.

## Components

### Buttons
- **Primary**: Deep British Racing Green background (`#183B32`), Warm Ivory text (`#F4EFE4`), 0px corner radius. Strict uppercase `label-md` with 0.12em tracking. Padding: `16px 32px`. Hover state reveals a soft Antique Gold hairline border (`#B69A62`) or subtle background transition to rich espresso (`#39271F`).
- **Secondary / Ghost**: Transparent fill, 1px solid border in `#B69A62` (Antique Gold) or `#183B32`, with text matching the border color. On hover, fills with `#D8C9AC` at 20% opacity.
- **Text Action**: Unbordered, underlined with a 1px brass-toned rule spaced 4px below the text baseline.

### Chips & Badges
- Sharp rectangular silhouettes. Background: translucent Muted Champagne (`rgba(216, 201, 172, 0.35)`), bordered with a 1px hairline in `#B69A62`. Text in `label-sm`, uppercase. Used for dietary notes, vintage years, and room designations (e.g., "VERANDA", "SALON PRIVÉ").

### Form Fields & Inputs
- Minimalist architectural baseline or framed box with 1px border (`#D8C9AC`). Background is `#FCFAF6`.
- Typography is `body-md` in Espresso Brown (`#39271F`).
- Focus state transforms the border to `#B69A62` with zero glow or outward ring. Floating labels transition into `label-sm` with letter-spacing.

### Checkboxes & Radio Buttons
- Precision square boxes (0px radius) with 1px `#183B32` borders. Checked state fills with `#183B32` featuring a sharp brass gold accent check or centered diamond. Radio controls utilize sharp square-in-square toggles rather than conventional round dots.

### Cards & Menu Folios
- Backgrounds in `#FCFAF6` bordered by a 1px perimeter in `#D8C9AC`. Optional interior hairline offset by 4px for signature vintage menus.
- Zero border radius. No heavy dropshadows; elevated cards use minimal warm tint shadows (`rgba(57, 39, 31, 0.08)`).

### Specialized Hospitality Components
- **Curated Menu Lists**: Two-column editorial alignment with dish title and description on the left (`Playfair Display` and `DM Sans`), connected to right-aligned pricing via subtle dotted or solid brass hairlines.
- **Reservation Timeline Selector**: Sharp, architectural time-block chips displaying ambient lighting changes from evening (deep green) to morning (ivory & champagne).