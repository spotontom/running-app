import React, { useEffect, useState, useRef } from "react";
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import KalmanFilter from 'kalmanjs';
import { announceMileSplit } from "../../utils/speechMile";
import { getPreciseDistance } from 'geolib';
import { saveRun } from "../../firebase/firebaseUtils";

// kalman filter consts 
const latFilter = new KalmanFilter();
const lonFilter = new KalmanFilter();

export default function RunScreen() {
  const navigation = useNavigation();
  const [runSaved, setRunSaved] = useState(false); 
  const [time, setTime] = useState(0); // Timer state in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [heartRate, setHeartRate] = useState<number>(120); // Example heart rate
  const [calories, setCalories] = useState<number>(300); // Example calories burned
  const [splits, setSplits] = useState<string[]>(["08:00", "08:15", "08:10"]); // Example splits
  const [locationSub, setLocationSub] = useState<Location.LocationSubscription | null>(null);
  const [locations, setLocations] = useState<Location.LocationObject[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [lastLocation, setLastLocation] = useState<Location.LocationObject | null>(null);
  const [mileTime, setMileTime] = useState<number>(0);
  const lastLocationRef = useRef<Location.LocationObject | null>(null);
  const weeklyProgress = 12; // Example weekly mileage
  const weeklyGoal = 20; // Weekly mileage goal
  const [audioSettings, setAudioSettings] = useState({
    audioFeedbackEnabled: false,
    feedbackMetrics: {
      pace: false,
      splits: false,
      distance: false,
    },
  });

  // Settings preferences
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const stored = await AsyncStorage.getItem('audioSettings');
        console.log("Raw Settings:", stored);
        if (stored) {
          const parsed = JSON.parse(stored);
          setAudioSettings(parsed);
          console.log("Loaded audio settings:", parsed);
        }
      } catch (e) {
        console.error("Failed to load audio settings:", e);
      }
    };
    loadSettings();
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
        setMileTime((prev) => prev + 1);
      }, 1000);
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
    console.log("Requesting location perm")
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log("perm status: ", status);
    if (status !== "granted") {
      console.log("Location permission not granted"); 
      return;
    }
  
    console.log("Starting watchpositionAsync")

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (newLocation) => {
        const newCoords = newLocation.coords;
        if (newCoords.accuracy > 15) {
          console.log("Skipping location due to low accuracy:", newCoords.accuracy);
          return;
        // If we have a previous location, calculate the distance
        }
        const smoothedLat = latFilter.filter(newCoords.latitude);
        const smoothedLon = lonFilter.filter(newCoords.longitude);
        // Smoothed coords are filtered better
        const smoothedCoords = {
          latitude: smoothedLat,
          longitude: smoothedLon,
        };
        if (!lastLocationRef.current) {
          lastLocationRef.current = newLocation;
          console.log("First location received, skipping distance calc.");
          return;
        }
          const lastCoords = lastLocationRef.current.coords;
          const distanceDeltaMeters = getPreciseDistance(
            { latitude: lastCoords.latitude, longitude: lastCoords.longitude },
            smoothedCoords
          );
          // meters to miles
          const distanceDelta = distanceDeltaMeters / 1609.344; 
          
          if (distanceDelta < 0.002 || distanceDelta > 0.1 || distanceDelta <= 0) {
            console.log("Ignoring distanceDelta:", distanceDelta);
            return;
          }

          setTotalDistance((prevDistance) => {
            const updatedDistance = prevDistance + distanceDelta;
            
            console.log("Distance delta:", distanceDelta.toFixed(6));
            console.log("Updated total distance:", updatedDistance.toFixed(4));
            
            // Trigger a split at every new whole mile & tell user
            if (updatedDistance > 0.01 && prevDistance <= 0.01) {
              const currentMile = 1;
              console.log(`🎯 Real mile ${currentMile} reached at ${updatedDistance.toFixed(2)} miles`);
              announceMileSplit(currentMile, mileTime, audioSettings);
              setSplits((prevSplits) => [...prevSplits, formatTime(mileTime)]);
              setMileTime(0);
            }
            return updatedDistance;
          });
          const smoothedLocation = {
            ...newLocation,
            coords: {
              ...newLocation.coords,
              latitude: smoothedCoords.latitude,
              longitude: smoothedCoords.longitude,
            },
          };
          setLastLocation(smoothedLocation);
          lastLocationRef.current = smoothedLocation;
          setLocations((prev) => [...prev, smoothedLocation]);
      } 
    );
    setLocationSub(subscription);
  } 

  const stopLocationTracking = async () => {
    if (locationSub) {
      locationSub.remove();
      setLocationSub(null);
      console.log("Location tracking stopped!")
    }
  };

  // function to save run data to firebase
  const handleSaveRun = async () => { 
      const runData = { 
        date: new Date().toISOString().slice(0, 10), // "YYYY-MM-DD"
        totalDistance,
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
                  console.log("Run started")
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
                <Text style={styles.stat}>
                  Total Distance: {totalDistance.toFixed(2)} mi
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
                  Distance: {totalDistance.toFixed(2)} mi
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
              Distance: {totalDistance.toFixed(2)} miles
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
