import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

export const announceMileSplit = async (mile: number, timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);
  const message = `Mile ${mile} complete in ${minutes} minutes, ${seconds} seconds`;

  console.log("🔊 Speaking split:", message);

  try {
    // 🔧 Force audio to play even if iPhone is in silent mode
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    // 🎤 Speak the message
    Speech.speak(message, {
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
    });
  } catch (err) {
    console.error("❌ TTS Error:", err);
  }
};