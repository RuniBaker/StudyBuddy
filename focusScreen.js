import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, AppState, PanResponder } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import { globalStyles } from './styles.js'; // Adjust this path as needed

export default function FocusScreen() {
  const maxTime = 60 * 60; // Max time limit of 60 minutes
  const [seconds, setSeconds] = useState(30 * 60); // Initial time set to 30 minutes
  const countdownInterval = useRef(null);
  const notificationId = useRef(null);
  const startTime = useRef(null);
  const appState = useRef(AppState.currentState);
  const [isSoundReady, setIsSoundReady] = useState(false); // State to track sound readiness
  const sound = useRef(new Audio.Sound());


  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        if (startTime.current) {
          const currentTime = Date.now();
          const elapsedSeconds = Math.floor((currentTime - startTime.current) / 1000);
          setSeconds(prevSeconds => Math.max(prevSeconds - elapsedSeconds, 0));
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    async function loadSound() {
      try {
        await sound.current.loadAsync(require('./assets/timerend.mp3')); // Replace with your sound file
        setIsSoundReady(true); // Set the sound readiness state to true
      } catch (error) {
        console.error('Error loading sound file', error);
      }
    }

    loadSound();

    return () => {
      sound.current.unloadAsync();
    };
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const playSound = async () => {
    if (isSoundReady) {
      try {
        await sound.current.playAsync();
      } catch (error) {
        console.error('Error playing sound', error);
      }
    }
  };

  const scheduleNotification = async () => {
    notificationId.current = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: 'Your focus session has ended.',
      },
      trigger: { seconds: seconds },
    });
  };

  const cancelScheduledNotification = async () => {
    if (notificationId.current) {
      await Notifications.cancelScheduledNotificationAsync(notificationId.current);
    }
  };

  const startTimer = () => {
    cancelScheduledNotification();
    scheduleNotification();
    startTime.current = Date.now();
    countdownInterval.current = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(countdownInterval.current);
          playSound();
          return 0;
        }
      });
    }, 1000);
  };

  const stopAndResetTimer = () => {
    cancelScheduledNotification();
    clearInterval(countdownInterval.current);
    setSeconds(30 * 60); // Reset to 30 minutes
    startTime.current = null;
  };

  const onCircleGesture = (angle) => {
    const time = Math.round((angle / (2 * Math.PI)) * maxTime);
    setSeconds(time);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dx, dy } = gestureState;
        let angle = Math.atan2(dy, dx) + Math.PI / 2;
        if (angle < 0) angle += 2 * Math.PI; // Normalize angle
        onCircleGesture(angle);
      },
    })
  ).current;

  const strokeWidth = 15;
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * seconds) / maxTime;

  return (
    <View style={globalStyles.pageContainer}>
      <Text style={[globalStyles.marginTop, globalStyles.GreetingMessage]}>Focus</Text>
      <View style={globalStyles.svgContainer}>
        <Svg height="300" width="300" viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#C8D4E3"
            strokeWidth={strokeWidth}
            fill="none"
            strokeOpacity={0.5}
          />
          <Circle
            cx="100"
            cy="100"
            r={radius}
            stroke="#012E40"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            {...panResponder.panHandlers}
          />
          
        </Svg>
        <Text style={globalStyles.timerText}>
          {formatTime()}
        </Text>
        
      </View>
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity style={globalStyles.button} onPress={startTimer}>
          <Text style={globalStyles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.button} onPress={stopAndResetTimer}>
          <Text style={globalStyles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
