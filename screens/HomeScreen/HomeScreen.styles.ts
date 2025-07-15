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
      backgroundColor: "rgba(255, 255, 255, 0.6)", // More transparent
      borderRadius: 10,
      padding: 10,
      marginVertical: 6,
      marginHorizontal: 10,
      flexDirection: "row",
      alignSelf: "center",
      width: "85%",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 3,
      height: 60, // Smaller height
    },
    activityText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#222",
    },
    activitySubText: {
      fontSize: 12,
      color: "#444",
    },
    scrollableListContainer: {
      maxHeight: 250, // adjusts how many fit — try 250–300
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
    rowFront: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: 10,
      padding: 12,
      marginVertical: 5,
      marginHorizontal: 10,
      overflow: 'hidden',
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: 'transparent',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 10,
    },
    backRightBtn: {
      alignItems: 'center',
      backgroundColor: 'red',
      justifyContent: 'center',
      borderRadius: 10,
      width: 75,
      height: '100%',
    },
    deleteText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default styles;