// components/CustomTabBar.tsx
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { usePathname, useRouter } from "expo-router";

interface TabItem {
  name: string;
  href: string;
  icon: string;
  activeIcon?: string; // Optional custom active icon
  label: string;
}

interface CustomTabBarProps {
  tabs: TabItem[];
}

// components/CustomTabBar.tsx
export function CustomTabBar({ tabs }: CustomTabBarProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (href: string) => {
    // Prevent navigation if already on the target route
    if (pathname === href || pathname.startsWith(href + "/")) {
      return; // Already on this route, do nothing
    }
    router.push(href as any);
  };

  const getIconName = (tab: TabItem, isActive: boolean) => {
    if (isActive && tab.activeIcon) {
      return tab.activeIcon;
    }
    if (isActive) {
      return tab.icon.replace("-outline", "");
    }
    return tab.icon;
  };

  // Better active state detection
  const isTabActive = (tabHref: string) => {
    return pathname === tabHref || pathname.startsWith(tabHref + "/");
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.backgrounds.card,
          borderTopColor: colors.border,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = isTabActive(tab.href);
        const iconName = getIconName(tab, isActive);

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => handleTabPress(tab.href)}
            disabled={isActive} // Disable the button if already active
          >
            <Ionicons
              name={iconName as any}
              size={24}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: isActive ? colors.primary : colors.textMuted },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  tabLabel: {
    marginTop: 4,
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
