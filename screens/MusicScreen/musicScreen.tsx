import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // For the back button icon
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import images from "../../constants/running-images";
import styles from "./MusicScreen.styles";

export default function MusicScreen() {
  const navigation = useNavigation(); // Navigation hook
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // Set audio mode configuration for playback
  async function configureAudio() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true, // Ensures audio plays even in silent mode
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }

  // Run the audio configuration on component mount
  useEffect(() => {
    configureAudio();
  }, []);

  // Mock playlist
  const playlist = [
    { id: "1", name: "Track 1", file: require("../../assets/sounds/mortals.mp3") },
    { id: "2", name: "Track 2", file: require("../../assets/sounds/desperate.mp3") },
    { id: "3", name: "Track 3", file: require("../../assets/sounds/royalty.mp3") },
  ];

  async function playPauseSound(track: any) {
    if (isPlaying && currentTrack === track.name && sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
      return;
    }

    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(track.file);
    setSound(newSound);
    setCurrentTrack(track.name);
    setIsPlaying(true);
    await newSound.playAsync();
  }

  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
      setSound(null);
      setCurrentTrack(null);
    }
  }

  return (
    <ImageBackground
      source={images.desertRunner}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Gradient Overlay */}
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.7)"]}
        style={styles.gradient}
      />
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Music Player</Text>

        {/* Playlist */}
        <FlatList
          data={playlist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.track}
              onPress={() => playPauseSound(item)}
            >
              <Text style={styles.trackName}>
                {item.name}{" "}
                {currentTrack === item.name && isPlaying ? "(Playing)" : ""}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Player Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.stopButton} onPress={stopSound}>
            <Text style={styles.stopButtonText}>Stop Music</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
