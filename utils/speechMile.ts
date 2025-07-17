import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

type AudioSettings = {
  audioFeedbackEnabled: boolean;
  feedbackMetrics: {
    pace?: boolean;
    splits?: boolean;
    distance?: boolean;
  };
};

export const announceMileSplit = async (
  mile: number,
  timeInSeconds: number,
  settings?: AudioSettings
) => {
  console.log("📢 announceMileSplit called with:", { mile, timeInSeconds, settings });

  // Only gate speech entirely if audioFeedbackEnabled is false
  if (!settings?.audioFeedbackEnabled) {
    console.log("🔕 Audio feedback disabled globally.");
    return;
  }

  // Build message dynamically based on enabled metrics
  const messages = [`Mile ${mile} complete`];

  if (settings.feedbackMetrics?.distance) {
    messages.push(`You've run ${mile} mile${mile > 1 ? 's' : ''}`);
  }

  if (settings.feedbackMetrics?.splits) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.round(timeInSeconds % 60);
    messages.push(`in ${minutes} minutes and ${seconds} seconds`);
  }

  if (settings.feedbackMetrics?.pace) {
    // Optional: you could pass pace as an argument if calculated
    // messages.push(`Your pace is ...`);
  }

  const fullMessage = messages.join('. ');

  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
    });

    console.log("🔊 Speaking:", fullMessage);

    Speech.speak(fullMessage, {
      rate: 0.9,
      pitch: 1.0,
      volume: 1.0,
    });
  } catch (err) {
    console.error("❌ TTS Error:", err);
  }
};
