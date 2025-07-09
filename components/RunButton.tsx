import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import {
  useNavigation, useNavigationState
} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App'; 

type NavigationProp = StackNavigationProp<RootStackParamList>;

// Advanced Styled Start Run Button
export default function StyledRunButton() {
    const navigation = useNavigation<NavigationProp>(); 
    
    const state = useNavigationState((state) => state);

    // If not inside a navigator yet, don't render
    if (!state) return null;

    const isOnRunScreen = state?.routes[state.index]?.name === "Run";

    if (isOnRunScreen) return null;

    return (
      <TouchableOpacity
        style={styles.runButton}
        onPress={() => navigation.navigate('Run')}
      >
        <View style={styles.buttonInner}>
          <Text style={styles.buttonIcon}>🏃‍♂️</Text>
          <Text style={styles.buttonText}>Start</Text>
        </View>
      </TouchableOpacity>
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