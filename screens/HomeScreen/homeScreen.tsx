import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  ImageBackground,
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
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "@firebase/firestore";
import { Run } from "../../types/types";
import { getRunsForCurrentUser } from "../../firebase/firebaseUtils";
import styles from "./HomeScreen.styles";


export default function HomeScreen() {
  const time = useClock();
  const navigation = useNavigation();
  
  
  const [runData, setRunData] = useState<Run[]>([]);

  useFocusEffect(
    useCallback(() => {
      const fetchRuns = async () => {
        try {
          const runs = await getRunsForCurrentUser();
          setRunData(runs);
        } catch (error) {
          console.log("Error fetching runs: ", error);
        }
      };
      fetchRuns();
    }, [])
  );

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
          <View style={styles.scrollableListContainer}>
            <FlatList
              data={runData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.activityItem}>
                  <Text style={styles.activityText}>🗓 {item.date}</Text>
                  <Text style={styles.activityText}>🏁 {item.distance} mi</Text>
                  <Text style={styles.activitySubText}>Total Time: {item.time}</Text>
                </View>
              )}
              showsVerticalScrollIndicator={false}
            />
            </View>
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
