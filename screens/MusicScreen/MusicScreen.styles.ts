import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject, // Ensures the gradient covers the entire screen
    },
    container: {
      flex: 1,
      padding: 20,
    },
    backButton: {
      position: "absolute",
      top: 50,
      left: 20,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 10,
      borderRadius: 20,
      zIndex: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginTop: 100, // Adjusted to fit below the back button
      marginBottom: 20,
      color: "white",
      textAlign: "center",
    },
    track: {
      padding: 10,
      marginBottom: 5,
      backgroundColor: "#444",
      borderRadius: 5,
    },
    trackName: {
      fontSize: 16,
      color: "white",
    },
    controls: {
      marginTop: 40,
      alignItems: "center",
    },
    stopButton: {
      backgroundColor: "#AF69EE",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
    },
    stopButtonText: {
      fontSize: 16,
      color: "white",
      fontWeight: "bold",
    },
  });

export default styles;