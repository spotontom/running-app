import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
      scrollContainer: {
        padding: 20,
        alignItems: "center",
        paddingBottom: 100, // Ensure space below the button
      },
      title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginTop: 20,
        marginBottom: 10,
        alignSelf: "flex-start",
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: "100%",
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
      switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 5,
        width: "100%",
      },
      switchLabel: {
        color: "white",
        fontSize: 16,
      },
      metricsContainer: {
        width: "100%",
        marginLeft: 10,
      },
      appInfo: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
      },
      button: {
        backgroundColor: "#FF6F61",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
      },
      buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
      },
    });

export default styles; 