Replace the existing n8n chat styling in `src/styles.css` with the exact CSS block provided by the user, then verify the build.

### Current state
`src/styles.css` already contains a compact n8n chat theme (lines 16–75) with a subset of variables and a few extra class overrides. The user has supplied a fuller, more structured theme that adds color tokens, base tokens, message/bot/user bubbles, input/button tokens, and revised extra CSS.

### Changes to make
1. **Replace the n8n chat variable block** in `src/styles.css` (currently lines 16–48) with the user's complete `:root` block, preserving all provided values exactly as given:
   - Color tokens (`--chat--color--primary`, shades, secondary, white, light/medium/dark, disabled, typing)
   - Base tokens (spacing, border-radius, transition, font-family)
   - Window tokens (width, height, bottom/right, z-index, border, radius, margin)
   - Header tokens (height, padding, background, color, borders, heading/subtitle sizes)
   - Message tokens (font-size, padding, radius, line-height, margin)
   - Bot and user bubble tokens (background, color, border)
   - Toggle tokens (size, width/height, radius, background, hover/active states, color)
   - Input/textarea tokens (height, max-height, font-size, border, radius, padding, background, text color, placeholder)
   - Button and send-button tokens
   - File-button tokens
   - Body and footer background tokens

2. **Replace the extra class overrides** (currently lines 50–75) with the user's revised overrides:
   - `.n8n-chat-window` — keep `overflow: hidden`, use the new single shadow stack
   - `.n8n-chat-toggle` — use the new shadow stack
   - `.n8n-chat-message` — set `line-height: 1.6`
   - `.n8n-chat-input textarea` — set `font-size: 15px`

3. **Leave the rest of the design-system CSS untouched** (Tailwind imports, `@theme inline`, light/dark color scales, base layer).

### Verification
- Run the project build/typecheck after editing to confirm no syntax errors.
- Visually confirm the chat toggle still renders with the crimson red theme and the chat window opens with the updated dark header/body styling.

### Files changed
- `src/styles.css`