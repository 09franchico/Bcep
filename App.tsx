import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Routes } from './src/routers';
import { ThemeProvider } from 'styled-components/native';
import THEME from './src/theme';


export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <StatusBar backgroundColor='#9333ea' style='light' />
      <Routes />
    </ThemeProvider>

  );
}


