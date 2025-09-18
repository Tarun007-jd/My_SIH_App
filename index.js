// Entry point for React Native CLI project
import { AppRegistry, StatusBar } from "react-native"
import App from "./App"
import { name as appName } from "./app.json"

// Add global status bar configuration (if needed)
StatusBar.setBarStyle('dark-content');
StatusBar.setBackgroundColor('#000000');

AppRegistry.registerComponent(appName, () => App)
