import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
    zIndex: 10,
  },
  timerContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  statCard: {
    width: 120,
    height: 80,
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
  },
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  stat: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555",
  },
  split: {
    fontSize: 16,
    marginLeft: 10,
    color: "#666",
  },
});

export default styles;