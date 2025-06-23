import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import WeeklyProgressGauge from "../../components/gaugeComponent";
import images from "../../constants/running-images";
import styles from "../RunScreen/RunScreen.styles";

export default function RunScreen() {
  const navigation = useNavigation();
  const [time, setTime] = useState(0); // Timer state in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState<number>(3.5); // Example distance in miles
  const [heartRate, setHeartRate] = useState<number>(120); // Example heart rate
  const [calories, setCalories] = useState<number>(300); // Example calories burned
  const [splits, setSplits] = useState<string[]>(["08:00", "08:15", "08:10"]); // Example splits
  const weeklyProgress = 12; // Example weekly mileage
  const weeklyGoal = 20; // Weekly mileage goal

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ImageBackground
      source={images.otherRun2}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* FlatList for Scrollable Content */}
      <FlatList
        data={splits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null} // No need to render items here
        ListHeaderComponent={
          <>
            {/* Timer & Start/Stop Button */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(time)}</Text>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  { backgroundColor: isRunning ? "red" : "green" },
                ]}
                onPress={() => setIsRunning(!isRunning)}
              >
                <Text style={styles.startButtonText}>
                  {isRunning ? "Stop Run" : "Start Run"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Weekly Progress Gauge */}
            <WeeklyProgressGauge progress={weeklyProgress} goal={weeklyGoal} />

            {/* Detailed Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{weeklyProgress} mi</Text>
                <Text style={styles.statLabel}>Total Mileage</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{formatTime(time)}</Text>
                <Text style={styles.statLabel}>Total Time</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>
                  {(distance / splits.length).toFixed(2)} mi
                </Text>
                <Text style={styles.statLabel}>Avg Distance</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{splits[0]}</Text>
                <Text style={styles.statLabel}>Avg Pace</Text>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.container}>
            <Text style={styles.title}>Run Summary</Text>
            <Text style={styles.stat}>
              Distance: {distance.toFixed(2)} miles
            </Text>
            <Text style={styles.stat}>Total Time: {formatTime(time)}</Text>
            <Text style={styles.stat}>
              Average Heart Rate: {heartRate} bpm
            </Text>
            <Text style={styles.stat}>Calories Burned: {calories} kcal</Text>
            <Text style={styles.stat}>Mile Splits:</Text>
            {splits.map((split, index) => (
              <Text key={index} style={styles.split}>
                Mile {index + 1}: {split}
              </Text>
            ))}
          </View>
        }
      />
    </ImageBackground>
  );
}
