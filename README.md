🚀 Navi-Fit – Your Personal Fitness Companion

A smart and clean fitness app to help you track steps, workouts, water intake & more.

📸 Screenshots
Home Page	Water Tracker	Step Tracker
Home	
![IMG-20250716-WA0004](https://github.com/user-attachments/assets/bbeb0f0e-a949-4177-b716-a312ff26ab6a)
![IMG-20250716-WA0009](https://github.com/user-attachments/assets/86a7053c-71e9-49b4-bab7-4a4f498598b9)
![IMG-20250716-WA0008](https://github.com/user-attachments/assets/f06d80c0-0ee0-405c-b5db-9f6c3448e714)
![IMG-20250716-WA0007](https://github.com/user-attachments/assets/c361cfcd-8977-49c7-926c-c0982363f4ec)
![IMG-20250716-WA0011](https://github.com/user-attachments/assets/0d795b6d-b93d-4e2c-b13a-985cfee5e8b8)
![IMG-20250716-WA0010](https://github.com/user-attachments/assets/9495fb7b-e2dc-4685-aad5-da58a662b177)
![IMG-20250716-WA0012](https://github.com/user-attachments/assets/1992f933-56ed-4ecb-a11f-488ec226936b)
![IMG-20250716-WA0006](https://github.com/user-attachments/assets/bcdecd0f-b108-42a7-ab50-eff66ef7f9e6)
![IMG-20250716-WA0005](https://github.com/user-attachments/assets/2c001589-b2af-477f-b400-70a1dd75153d)


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

🤝 Collaborators
Name	GitHub	Email
Subham Bansal	@subhambansal33	subhambansal33@gmail.com

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
git clone https://github.com/subhambansal33/navi-fit.git

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

