import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 20,
    },
    musicButton: {
      position: "absolute",
      top: 50,
      left: 20,
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      padding: 10,
      borderRadius: 20,
    },
    musicButtonText: {
      fontSize: 24,
      fontWeight: "bold",
    },
    clock: {
      fontSize: 32,
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
    },
    distance: {
      fontSize: 18,
      fontWeight: "bold",
      color: "white",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      marginBottom: 10,
    },
    recentActivityContainer: {
      marginTop: 20,
      width: "100%",
    },
    activityItem: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: 8,
      padding: 10,
      marginVertical: 5,
    },
    activityText: {
      fontSize: 16,
      color: "#333",
    },
    activitySubText: {
      fontSize: 14,
      color: "#555",
    },
    progressContainer: {
      position: "absolute",
      bottom: 80,
      alignSelf: "center",
      alignItems: "center",
    },
    progressText: {
      fontSize: 16,
      color: "white",
      marginBottom: 0,
    },
  });

export default styles;