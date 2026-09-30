# Design QA

## Final result

passed

## Visual truth

- Source: `/Users/guoxk/me/i/pen/gnuxter.pen`
- Home frames: `twOFb`, `jfb0P`, `JXZY5`, `d8MjMk`
- Login frames: `iWUVO`, `JQvmd`, `iQrn9`, `iw6U3`
- Source exports: `/private/tmp/gnuxter-prototype-source/`

## Implementation evidence

- Home desktop, light: `/private/tmp/gnuxter-design-qa/home-desktop-light-current.jpg`
- Login desktop, light: `/private/tmp/gnuxter-design-qa/login-desktop-light-current.jpg`
- Focused login comparison: `/private/tmp/gnuxter-design-qa/login-form-comparison-current.png`
- Local preview: `http://127.0.0.1:3001/`

## Viewports and normalization

- Source desktop exports are 2880 × 2400 pixels at 2× for a 1440 × 1200 canvas.
- Source phone exports are 780 × 1688 pixels at 2× for a 390 × 844 canvas.
- Desktop implementation captures are 1280 × 799 pixels from the Pen integrated browser. They were used to verify responsive structure, proportions, typography, and component placement rather than direct pixel diffing against the wider source canvas.
- Exact 390 × 844 light and dark captures were inspected for both home and login. These were the same viewport and state as the Pen phone frames.
- The focused form comparison normalizes the Pen 2× crop from 720 × 822 to 360 × 411 and places it beside the 360 × 411 implementation crop in one image.

## States checked

- Home: light, dark, desktop, phone, locale switch, theme switch, add-project count, navigation links.
- Login: light, dark, desktop, phone, empty-submit validation, password visibility, challenge refresh, forgot-password notice, create-account notice.
- The login success state is a frontend-only prototype state and does not create a session.

## Full-view findings

- Header, footer, centered home content, login split layout, responsive stacking, violet semantic palette, dividers, spacing, and typography follow the Pen frames.
- Mobile home and login fit the 390 × 844 viewport without horizontal overflow or clipped primary controls.
- Dark mode follows the paired dark Pen frames and preserves contrast on fields, dividers, and controls.
- No actionable P0, P1, or P2 visual issues remain.

## Focused-region findings

- The final combined form comparison shows matching 360-pixel form width, field heights, vertical rhythm, captcha composition, CTA placement, and signup row.
- An initial CJK heading fallback rendered as serif in the browser. It was corrected to use the Pen-compatible sans-serif CJK fallback while retaining Merriweather for Latin glyphs.
- Remaining sub-pixel differences come from comparing Pencil's 2× export downsampling with a 1× browser capture and are non-actionable P3 rendering variance.

## Comparison history

1. Inspected: reopened the supplied file after detecting that Pen was focused on a different document; no implementation decision was retained from the wrong document.
2. Executed: compared exact phone light/dark views and a desktop structural view against the corresponding source frames.
3. Executed: combined the login form reference and implementation into one normalized comparison input; fixed the CJK font fallback found there.
4. Executed: repeated the focused comparison and confirmed that no actionable P0, P1, or P2 mismatch remains.

