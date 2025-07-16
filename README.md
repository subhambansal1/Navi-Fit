🚀 Navi-Fit – Your Personal Fitness Companion

A smart and clean fitness app to help you track steps, workouts, water intake & more.

📸 Screenshots
Home Page	Water Tracker	Step Tracker
Home	
![IMG-20250716-WA0012](https://github.com/user-attachments/assets/1e76f6f0-de73-4594-aa73-413359fffd8f)
![IMG-20250716-WA0011](https://github.com/user-attachments/assets/925bcbfa-8215-467b-933a-fd023964dfcf)
![IMG-20250716-WA0010](https://github.com/user-attachments/assets/9531077d-bb3a-493c-8718-6c7a4ae12013)
![IMG-20250716-WA0009](https://github.com/user-attachments/assets/7a02b501-76cc-447d-930d-7855071bb620)
![IMG-20250716-WA0007](https://github.com/user-attachments/assets/6b56931d-870e-40fa-aafa-713f6ab7b976)
![IMG-20250716-WA0008](https://github.com/user-attachments/assets/e2065372-1c3c-4628-83ab-8a9eec4964fe)
![IMG-20250716-WA0006](https://github.com/user-attachments/assets/3c07fb35-2e27-4597-8b5b-53034e05ba17)
![IMG-20250716-WA0004](https://github.com/user-attachments/assets/abf8501e-7ceb-4067-9b7b-10f3b7d34a89)
![IMG-20250716-WA0005](https://github.com/user-attachments/assets/eae17200-a625-492d-814d-be669afac87f)



✨ Purpose of the App
Navi-Fit is a fitness tracker built with React Native and Expo that empowers users to:

Monitor daily step counts with visual progress rings

Track water intake and manage hydration goals

Record personalized workout routines

View weekly summaries and progress insights

Toggle between light and dark mode themes

Inspired by the need for a clean, modern, all-in-one fitness dashboard on mobile.

🛠 Tech Stack
Frontend: React Native (Expo SDK 53)

State Management: Context API, React Hooks

Storage: AsyncStorage for persisting user data

Navigation: React Navigation

Icons & Animations: Ionicons, react-native-circular-progress

Styling: StyleSheet API with support for light/dark themes

📚 What I Learned
Building a fully functional multi-screen app using Expo

Managing user profiles, authentication, and state across components

Persisting data with AsyncStorage

Creating dynamic UI based on user actions

Building re-usable components and custom screens

Handling real-time UI updates (like resetting at midnight)

Designing with responsiveness and theming in mind

🚧 Installation & Running Locally
bash
Copy
Edit
# Clone the repo
git clone https://github.com/subhambansal1/Navi-Fit.git



# Navigate into the project folder
cd navi-fit

# Install dependencies
npm install

# Start the app (Expo)
npx expo start
Make sure you have Node.js and Expo CLI installed.

📦 Folder Structure
bash
Copy
Edit
navi-fit/
├── assets/                # Images and icons
├── components/            # Reusable UI components
├── contexts/              # Auth and global context
├── navigation/            # Navigation setup (BottomTabs, Stack)
├── screens/               # Home, Profile, Steps, Water, Workout screens
├── App.js                 # Entry point
└── package.json
📈 Future Features
Google Fit / Apple Health integration

Daily notification reminders for water and workout

Cloud sync and analytics dashboard

BMI calculator & fitness challenges

