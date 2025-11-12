import { colors } from "@/constants/theme";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    theme: isDark ? "dark" : "light",
    colors: {
      background: isDark ? colors.dark.background : colors.light.background,
      text: isDark ? colors.dark.text : colors.light.text,
      card: isDark ? colors.dark.card : colors.light.card,
      cardSecondary: isDark ? colors.dark.cardSecondary : colors.light.cardSecondary,
      separator: isDark ? colors.dark.separator : colors.light.separator,
      primary: colors.primary,
    },
  };
}
