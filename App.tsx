import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
} from "react-native";
import {
  NavigationContainer,
  NavigationContainerRef,
  useNavigationState,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import RunScreen from "./screens/RunScreen/RunScreen";
import HomeScreen from "./screens/HomeScreen/homeScreen";
import SettingsScreen from "./screens/SettingScreen/settingScreen";
import MusicScreen from "./screens/MusicScreen/musicScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { User,onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import StyledRunButton from "./components/RunButton";

export type RootStackParamList = {
  Main: undefined;
  Run: undefined;
  Music: undefined;
  Login: undefined;
  Setting: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<RootStackParamList>();
const navigationRef = React.createRef<NavigationContainerRef<any>>();

// Tab Navigator
function TabNavigator() {
  return (
    <>
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
    <StyledRunButton />
    </>
  );
}

// Main App Component
export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checking,setChecking] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false); 
    });
    return () => unsubscribe();
  }, []);
  if (checking) return null; 

  return (
      <NavigationContainer ref={navigationRef}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <View style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Run" component={RunScreen} />
            <Stack.Screen name="Music" component={MusicScreen} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
          </Stack.Navigator>
        </View>
      </NavigationContainer>
  );
}
