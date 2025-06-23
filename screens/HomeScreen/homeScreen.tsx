import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import images from "../../constants/running-images"
import { useClock } from "../../utils/clockUtils";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./HomeScreen.styles";

export default function HomeScreen() {
  const time = useClock();
  const navigation = useNavigation();

  // Mock data for recent activities
  const runData = [
    { date: "12/22", distance: 3.2, time: "25:30", pace: "7:58" },
    { date: "12/21", distance: 5.0, time: "40:10", pace: "8:02" },
    { date: "12/20", distance: 2.5, time: "20:45", pace: "8:18" },
  ];

  // Mock calories and distance
  const weeklyCaloriesBurned = 400;
  const weeklyCaloriesGoal = 500;
  const progress = weeklyCaloriesBurned / weeklyCaloriesGoal;
  const totalDistance = runData.reduce((acc, item) => acc + item.distance, 0);

  return (
    <ImageBackground
      source={images.runnerSunset}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Music Button */}
        <TouchableOpacity
          style={styles.musicButton}
          onPress={() => navigation.navigate("Music")}
        >
          <Text style={styles.musicButtonText}>🎵</Text>
        </TouchableOpacity>

        {/* Clock */}
        <Text style={styles.clock}>{time}</Text>
        {/* Page Title */}
        <Text style={styles.title}>Tom's Mile Tracker</Text>
        {/* Total Distance */}
        <Text style={styles.distance}>
          Total Distance: {totalDistance.toFixed(1)} miles
        </Text>

        {/* Recent Activity Feed */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.subtitle}>Recent Runs</Text>
          <FlatList
            data={runData}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.activityItem}>
                <Text style={styles.activityText}>
                  {item.date} - {item.distance} miles
                </Text>
                <Text style={styles.activitySubText}>Avg Pace: {item.pace}</Text>
              </View>
            )}
          />
        </View>
      </View>
      </SafeAreaView>

      {/* Calories Burned Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Calories Burned: {weeklyCaloriesBurned} / {weeklyCaloriesGoal}
        </Text>
        <Progress.Bar
          progress={progress}
          width={300}
          height={15}
          color="#D3D3D3"
          unfilledColor="rgba(255,255,255,0.3)"
          borderWidth={0}
        />
      </View>
    </ImageBackground>
  );
}
