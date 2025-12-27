# AI Instructions for Nerdz App

## Code Style & Conventions
- **Framework:** React Native with Expo (Managed Workflow).
- **Styling:** NativeWind (Tailwind CSS). Avoid inline styles unless absolutely necessary for dynamic values (like animations).
- **Icons:** Use ONLY `lucide-react-native`. Do NOT use `@expo/vector-icons` (Ionicons, FontAwesome, etc.).
- **Theme:** 
  - Use semantic colors defined in `theme/colors.ts` and exposed via `tailwind.config.js`.
  - Prefer classes like `bg-primary`, `text-destructive`, `bg-violet` over hardcoded hex codes.
  - New colors should be added to `theme/colors.ts` first.

## Architecture
- **Navigation:** Expo Router (File-based routing in `app/`).
- **Components:** Functional components with Hooks. Keep them small and focused.
- **State Management:** React Context or local state as appropriate.

## Data Handling
- **Mock Data:** Never use hardcoded data directly in components (e.g., `<Text>John Doe</Text>`).
  - Always create a typed mock constant (e.g., `MOCK_USER` in `constants/mocks.ts`) that mimics a real API response.
  - This facilitates easier transition to real backend data fetching later.

## Specific Features
- **Achievements:**
  - Located in `app/(app)/(tabs)/profile.tsx`.
  - Use `AchievementItem` component.
  - Colors map to theme colors (e.g., `violet`, `black`, `destructive`).

## General Workflow
- Always read related files before editing to understand context.
- Verify changes with `npx tsc` and `npm run lint`.
- Respect existing directory structure.

## Adding New Colors
To add a new semantic color (e.g., `emerald`), follow these 3 steps:

1.  **`theme/colors.ts`**: Add the RGB string (e.g., `'rgb(16, 185, 129)'`) to `IOS_SYSTEM_COLORS` and `ANDROID_COLORS` (both `light` and `dark` objects).
2.  **`global.css`**: Define the CSS variables (e.g., `--emerald: 16 185 129;`) in `:root` and `@media (prefers-color-scheme: dark)`.
    - **Crucial:** Add corresponding Android variables too (e.g., `--android-emerald`).
    - **Format:** Space-separated numbers, NO `rgb()` wrapper, NO commas.
3.  **`tailwind.config.js`**: Register it in `theme.extend.colors`:
    ```javascript
    emerald: withOpacity('emerald'),
    ```
