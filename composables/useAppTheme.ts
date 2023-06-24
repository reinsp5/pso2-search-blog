import { useTheme } from "vuetify";
import { MAIN_THEME, MAIN_DARK_THEME } from "@/helpers/themes";
import { useStorage } from "@vueuse/core";

export const useAppTheme = () => {
  const theme = useTheme();
  const darkMode = useStorage<boolean>("darkMode", false);

  const switchTheme = () => {
    theme.global.name.value = darkMode.value ? MAIN_DARK_THEME : MAIN_THEME;
  };

  return {
    switchTheme,
    darkMode,
  };
};
