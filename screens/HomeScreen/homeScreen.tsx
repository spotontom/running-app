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
import { Swipeable } from 'react-native-gesture-handler';
import { deleteRunById } from "../../firebase/firebaseUtils";
import { Run } from "../../types/types";
import { getRunsForCurrentUser } from "../../firebase/firebaseUtils";
import styles from "./HomeScreen.styles";

export default function HomeScreen() {
  const time = useClock();
  const navigation = useNavigation();
  
  const [runData, setRunData] = useState<Run[]>([]);

  // pulling runs from database
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

  const handleDeleteRun = async (id: string) => {
    setRunData((prevRuns) => prevRuns.filter((run) => run.id !== id));
    await deleteRunById(id);
  };

  // allows for swiping left to delete run
  const renderRightActions = (onDelete: () => void) => (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={onDelete}
        style={{
          backgroundColor: 'red',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginRight: 10,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  // Mock calories and distance
  const weeklyCaloriesBurned = 400;
  const weeklyCaloriesGoal = 500;
  const progress = weeklyCaloriesBurned / weeklyCaloriesGoal;

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
        {/*<Text style={styles.distance}>
          Total Distance: {item.totalDistance} miles
        </Text> */}

        {/* Recent Activity Feed */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.subtitle}>Recent Runs</Text>
          <View style={styles.scrollableListContainer}>
          <FlatList
            data={runData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Swipeable
                renderRightActions={() =>
                  renderRightActions(() => handleDeleteRun(item.id))
                }
                overshootRight={false}
              >
                <View style={styles.activityItem}>
                  <Text style={styles.activityText}>🗓 {item.date}</Text>
                  <Text style={styles.activityText}>🏁 {Number(item.totalDistance).toFixed(2)} mi</Text>
                  <Text style={styles.activitySubText}>Time: {item.time}</Text>
                </View>
              </Swipeable>
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
