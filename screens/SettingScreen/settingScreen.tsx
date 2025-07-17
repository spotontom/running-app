import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import images from "../../constants/running-images";
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./SettingScreen.styles";
import { auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  // State for profile settings
  const [name, setName] = useState("John Doe");
  const [age, setAge] = useState("25");
  const [weight, setWeight] = useState("160");
  const [height, setHeight] = useState("5'9");

  // State for notification preferences
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [motivationEnabled, setMotivationEnabled] = useState(false);

  // State for audio feedback
  const [audioFeedbackEnabled, setAudioFeedbackEnabled] = useState(true);
  const [feedbackMetrics, setFeedbackMetrics] = useState({
    pace: true,
    splits: false,
    distance: true,
  });
  const navigation = useNavigation();

  const saveAudioSettings = async (nextAudioSettings) => {
    try {
      await AsyncStorage.setItem('audioSettings', JSON.stringify(nextAudioSettings));
      console.log("✅ Settings saved:", nextAudioSettings);
    } catch (e) {
      console.error("❌ Failed to save settings:", e);
    }
  };

  // function for signout with firebase
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <ImageBackground
      source={images.surfersAtDusk}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Settings</Text>

        {/* Profile Settings */}
        <Text style={styles.sectionTitle}>Profile Settings</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="numeric"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="Weight (lbs)"
          keyboardType="numeric"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={setHeight}
          placeholder="Height"
          placeholderTextColor="gray"
        />

        {/* Notification Preferences */}
        <Text style={styles.sectionTitle}>Notification Preferences</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Motivational Tips</Text>
          <Switch
            value={motivationEnabled}
            onValueChange={setMotivationEnabled}
          />
        </View>

        {/* Audio Feedback */}
        <Text style={styles.sectionTitle}>Audio Feedback</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Enable Audio Feedback</Text>
          <Switch
            value={audioFeedbackEnabled}
            onValueChange={(value) => {
              const nextSettings = {
                audioFeedbackEnabled: value,
                feedbackMetrics,
              };
              setAudioFeedbackEnabled(value);
              saveAudioSettings(nextSettings);
            }}
          />
        </View>
        {audioFeedbackEnabled && (
          <View style={styles.metricsContainer}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Include Pace</Text>
              <Switch
                value={feedbackMetrics.pace}
                onValueChange={(value) => {
                  const nextMetrics = { ...feedbackMetrics, pace: value };
                  setFeedbackMetrics(nextMetrics);
                  saveAudioSettings({
                    audioFeedbackEnabled,
                    feedbackMetrics: nextMetrics,
                  });
                }}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Include Splits</Text>
              <Switch
                value={feedbackMetrics.splits}
                onValueChange={(value) => {
                  const nextMetrics = { ...feedbackMetrics, splits: value };
                  setFeedbackMetrics(nextMetrics);
                  saveAudioSettings({
                    audioFeedbackEnabled,
                    feedbackMetrics: nextMetrics,
                  });
                }}
              />
            </View>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Include Distance</Text>
              <Switch
                value={feedbackMetrics.distance}
                onValueChange={(value) => {
                  const nextMetrics = { ...feedbackMetrics, distance: value };
                  setFeedbackMetrics(nextMetrics);
                  saveAudioSettings({
                    audioFeedbackEnabled,
                    feedbackMetrics: nextMetrics,
                  });
                }}
              />
            </View>
          </View>
        )}
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText} >Sign Out</Text>
        </TouchableOpacity>
        {/* App Info */}
        <Text style={styles.sectionTitle}>App Info</Text>
        <Text style={styles.appInfo}>Version: 0.2.1</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Contact @ spotontom1@gmail.com")}
        >
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}