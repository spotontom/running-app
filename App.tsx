import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
  useNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationIndependentTree } from "@react-navigation/native";
import RunScreen from "./screens/RunScreen/RunScreen";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import SettingsScreen from "./screens/SettingScreen/settingScreen";
import MusicScreen from "./screens/MusicScreen/musicScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const navigationRef = React.createRef<NavigationContainerRef>();

// Advanced Styled Start Run Button
function StyledRunButton() {
  // Check current route to hide button on RunScreen
  const state = useNavigationState((state) => state);

  const isOnRunScreen =
    state?.routes[state?.index]?.name === "Run"; // Check if current screen is "Run"

  if (isOnRunScreen) {
    return null; // Do not render the button on RunScreen
  }

  return (
    <TouchableOpacity
      style={styles.runButton}
      onPress={() => navigationRef.current?.navigate("Run")}
    >
      <View style={styles.buttonInner}>
        <Text style={styles.buttonIcon}>🏃‍♂️</Text>
        <Text style={styles.buttonText}>Start</Text>
      </View>
    </TouchableOpacity>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          height: 60,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Run" component={RunScreen} />
            <Stack.Screen name="Music" component={MusicScreen} />
          </Stack.Navigator>
          {/* Styled Run Button */}
          <StyledRunButton />
        </View>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  runButton: {
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
    width: 85,
    height: 85,
    backgroundColor: "rgb(99, 99, 99)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgb(126, 126, 126)",
    shadowColor: "rgba(2, 2, 2, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonIcon: {
    fontSize: 30,
    color: "rgb(37, 37, 37)",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgb(255, 255, 255)",
  },
});
