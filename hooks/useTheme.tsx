import { darkColors } from "@/theme/darkTheme";
import { lightColors } from "@/theme/lightTheme";
import { ThemeContextType } from "@/theme/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const value = await AsyncStorage.getItem("darkMode");
        setIsDarkMode(value === "true");
      } catch (error) {
        console.error("Error loading theme preference:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadThemePreference();
  }, []);

  const toggleDarkMode = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    try {
      await AsyncStorage.setItem("darkMode", String(newMode));
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const value = { isDarkMode, toggleDarkMode, colors };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === null) {
    // This case should be handled by rendering a loading state in the provider itself.
    // However, as a safety net, returning a default object here is safer than throwing an error,
    // which can disrupt concurrent rendering.
    console.error(
      "useTheme was used outside of ThemeProvider. Returning default theme."
    );
    return {
      isDarkMode: false,
      toggleDarkMode: () => {},
      colors: lightColors,
    };
  }

  return context;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
