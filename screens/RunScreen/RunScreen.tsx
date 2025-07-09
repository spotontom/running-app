import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import WeeklyProgressGauge from "../../components/gaugeComponent";
import images from "../../constants/running-images";
import styles from "../RunScreen/RunScreen.styles";
import MapView from 'react-native-maps';
import * as Location from "expo-location";
import { saveRun } from "../../firebase/firebaseUtils";

export default function RunScreen() {
  const navigation = useNavigation();
  const [runSaved, setRunSaved] = useState(false); 
  const [time, setTime] = useState(0); // Timer state in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [distance, setDistance] = useState<number>(1.2); // Example distance in miles
  const [heartRate, setHeartRate] = useState<number>(120); // Example heart rate
  const [calories, setCalories] = useState<number>(300); // Example calories burned
  const [splits, setSplits] = useState<string[]>(["08:00", "08:15", "08:10"]); // Example splits
  const [locationSub, setLocationSub] = useState<Location.LocationSubscription | null>(null);
  const [locations, setLocations] = useState<Location.LocationObject[]>([]);
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
  
  // Location Tracker
  const startLocationTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission not granted"); 
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // 1 second update
        distanceInterval: 1, // 1 meter update
      },
      (newLocation) => {
        console.log("New Location:", newLocation.coords);
        setLocations((prev) => [...prev, newLocation]);
      }
    );
    setLocationSub(subscription);
  }; 

  const stopLocationTracking = async () => {
    if (locationSub) {
      await locationSub.remove();
      setLocationSub(null);
      console.log("Location tracking stopped!")
    }
  };

  // function to save run data to firebase
  const handleSaveRun = async () => { 
      const runData = { 
        date: new Date().toISOString().slice(0, 10), // "YYYY-MM-DD"
        distance,
        time: formatTime(time),
        pace: splits[0], // or calculate average pace
        heartRate,
        calories,
        splits,
    };
    try {
      await saveRun(runData);
      console.log("RUN saved!")
    } catch (error) {
      console.error("Error: ", error)
    }
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
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            {/* Timer & Start/Stop Button */}
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(time)}</Text>
              <TouchableOpacity
                style={[
                  styles.startButton,
                  { backgroundColor: isRunning ? "red" : "green" },
                ]}
                onPress={() => {
                  if (!isRunning) {
                  setIsRunning(true);
                  startLocationTracking(); 
                } else {
                  setIsRunning(false);
                  stopLocationTracking(); 
                }
              }}
              >
                <Text style={styles.startButtonText}>
                  {isRunning ? "Stop Run" : "Start Run"}
                </Text>
              </TouchableOpacity>
              {!runSaved && !isRunning && time > 0 && (
                <TouchableOpacity
                  style={[styles.startButton, { backgroundColor: "blue", marginTop: 10 }]}
                  onPress={async () => {
                    await handleSaveRun();
                    setRunSaved(true); // hide button
                  }}
                >
                  <Text style={styles.startButtonText}>Save Run</Text>
                </TouchableOpacity>
              )}
              {runSaved && (
              <Text style={{ color: "lightgreen", marginTop: 10 }}>
                ✅ Run saved successfully!
              </Text>
            )}
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

            {/* MAP VIEW */}
            <MapView
              style={{ height: 300 }}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            />

            {/* CONDITIONAL RUN SUMMARY*/}
          {runSaved && (
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
        )}
      </ScrollView>
    </ImageBackground>
  );
}
