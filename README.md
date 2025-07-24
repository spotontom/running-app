# 🏃 Tom's Mile Tracker

A sleek, GPS-powered running tracker built in React Native with Firebase integration. This app logs real-time runs, calculates distances and splits, stores user data securely, and visualizes weekly progress — all wrapped in a clean, mobile-first interface.

---

## 🔧 Tech Stack

- **React Native** (with Expo SDK 53)
- **Firebase** (Auth + Firestore)
- **TypeScript** (Overall code structure)
- **Expo** (expo-maps + UI features)
- **KalmanJS** (GPS smoothing)
- **AsyncStorage** (local settings/goals)
- **Geolib** (distance calculation)

---

## ✨ Features

- ✅ Real-time run tracking using GPS
- ✅ Distance calculation with smoothed coordinates
- ✅ Automatic mile splits with audio announcements
- ✅ Secure run storage tied to authenticated user accounts
- ✅ Weekly mileage goal and progress tracker
- ✅ Mobile-friendly UI with live map and stats

---

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/running-app.git
cd running-app
npm install
Then start the app:
npx expo start

🗂️ Project Structure
/screens/RunScreen.tsx – live run tracking logic

/screens/HomeScreen.tsx – home UI and weekly summary

/firebase/firebaseUtils.ts – Firebase logic (save/load/delete runs)

/components/WeeklyProgressGauge.tsx – animated weekly goal chart

/types/types.ts – shared run type definition

/utils/speechMile.ts – mile split announcer logic

👤 Author
Thomas Scott
Capstone Project – Bachelor of Applied Science in Technical Management
Gulf Coast State College
Email: spotontom1@gmail.com

