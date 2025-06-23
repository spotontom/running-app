import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function WeeklyProgressGauge({ progress, goal }) {
  const percentage = (progress / goal) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Progress</Text>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={percentage}
        tintColor="#4CAF50"
        backgroundColor="#D3D3D3"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <View style={styles.innerCircle}>
            <Text style={styles.progressText}>{Math.round(progress)} / {goal} miles</Text>
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  innerCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});