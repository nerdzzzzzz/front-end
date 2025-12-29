import { Text } from "@/components/nativewindui/Text";
import {
  ArrowLeftRight,
  Pause,
  Play,
  RotateCcw,
  Settings,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useColorScheme } from "@/lib/useColorScheme";
import { useRouter } from "expo-router";
import { useTimer } from "@/context/TimerContext";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.75;
const STROKE_WIDTH = 4;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
  const { colors } = useColorScheme();
  const { focusDuration, shortBreakDuration } = useTimer();
  
  const TIMER_MODES = React.useMemo(() => ({
    FOCUS: { time: focusDuration, label: "Focus" },
    SHORT_BREAK: { time: shortBreakDuration, label: "Break" },
  }), [focusDuration, shortBreakDuration]);

  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"FOCUS" | "SHORT_BREAK">("FOCUS");
  const [timeLeft, setTimeLeft] = useState(TIMER_MODES.FOCUS.time);
  
  const router = useRouter();

  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const currentModeConfig = TIMER_MODES[mode];
  
    const isBreak = mode === "SHORT_BREAK";
  
  
  
    const prevTimeRef = React.useRef(currentModeConfig.time);
  
  
  
    // Update timeLeft when mode changes or settings change (and timer not active)
  
    useEffect(() => {
  
      if (prevTimeRef.current !== currentModeConfig.time) {
  
        prevTimeRef.current = currentModeConfig.time;
  
        if (!isActive) {
  
          setTimeLeft(currentModeConfig.time);
  
          progress.value = withSpring(1);
  
        }
  
      }
  
    }, [currentModeConfig.time, isActive, progress]);

  const toggleMode = React.useCallback(() => {
    const newMode = mode === "FOCUS" ? "SHORT_BREAK" : "FOCUS";
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(TIMER_MODES[newMode].time);
    progress.value = withSpring(1);
  }, [mode, setIsActive, TIMER_MODES, progress]);

  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      toggleMode();
    }

    // Update progress ring
    // Apply a small offset ONLY when active to give immediate visual feedback of movement
    const targetProgress = timeLeft / currentModeConfig.time;
    const displayProgress = isActive ? Math.max(0, targetProgress - 0.005) : targetProgress;

    progress.value = withTiming(displayProgress, {
      duration: 1000,
    });

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, currentModeConfig.time, toggleMode, progress]);

  const toggleTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsActive(!isActive);
    scale.value = withSequence(withSpring(0.95), withSpring(1));
  };

  const resetTimer = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsActive(false);
    setTimeLeft(currentModeConfig.time);
    progress.value = withSpring(1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
  }));

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleSettingsPress = () => {
    router.push("/(app)/settings");
  };

  return (
    <View className="flex-1 bg-background">
      <View className="absolute top-0 left-0 right-0 z-50 flex-row items-center justify-between px-4 py-3 pt-safe">
        <View className="w-10" />
        <View 
          className="bg-primary/20 px-5 py-2 rounded-full shadow-sm shadow-primary/50"
          style={isBreak ? { backgroundColor: "#22c55e33", shadowColor: "#22c55e" } : undefined}
        >
          <Text 
            className="text-foreground text-sm font-bold tracking-[0.1em] uppercase"
          >
            {currentModeConfig.label}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSettingsPress}
          className="w-10 h-10 items-center justify-center rounded-xl bg-background/50 backdrop-blur-md"
        >
          <Settings size={24} color={isBreak ? "#22c55e" : colors.primary} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 pt-safe px-6 justify-between">
        {/* Timer */}
        <View className="flex-1 items-center justify-center relative z-10">
          <View className="relative items-center justify-center mb-32">
            {/* Glow behind timer */}
            <View
              className="absolute w-[280] h-[280] bg-primary/20 rounded-full"
              style={[
                { transform: [{ scale: 1.2 }] },
                isBreak && { backgroundColor: "#22c55e33" }
              ]}
            />

            <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
              {/* Background Circle */}
              <Circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke={colors.muted} // Theme muted
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              {/* Progress Circle */}
              <AnimatedCircle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={RADIUS}
                stroke={isBreak ? "#22c55e" : colors.primary} // Theme primary or green
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeLinecap="round"
                rotation="-90"
                origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
                animatedProps={animatedProps}
              />
            </Svg>
            <Animated.View
              className="absolute items-center justify-center"
              style={animatedScaleStyle}
            >
              <Text className="text-[5rem] font-bold text-foreground tracking-tighter leading-none">
                {formatTime(timeLeft)}
              </Text>
              <Text 
                className="text-primary text-sm font-bold tracking-[0.2em] uppercase mt-2"
                style={isBreak ? { color: "#22c55e" } : undefined}
              >
                {isActive
                  ? "Running"
                  : timeLeft === currentModeConfig.time
                    ? "Start"
                    : "Paused"}
              </Text>
            </Animated.View>
          </View>

          {/* Controls */}
          <View className="flex-row items-center justify-center gap-8 w-full">
            <Pressable
              onPress={resetTimer}
              className="h-14 w-14 items-center justify-center rounded-full border border-border/10 bg-card/50 active:scale-95 active:bg-card/10"
            >
              <RotateCcw size={24} color={colors.foreground} />
            </Pressable>

            <Pressable
              onPress={toggleTimer}
              className="h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg shadow-primary/50 active:scale-95 active:bg-primary/90"
              style={isBreak ? { backgroundColor: "#22c55e", shadowColor: "#22c55e" } : undefined}
            >
              {isActive ? (
                <Pause
                  size={36}
                  color={colors.primaryForeground}
                  fill={colors.primaryForeground}
                />
              ) : (
                <Play
                  size={36}
                  color={colors.primaryForeground}
                  fill={colors.primaryForeground}
                  style={{ marginLeft: 4 }}
                />
              )}
            </Pressable>

            <Pressable
              onPress={toggleMode}
              className="h-14 w-14 items-center justify-center rounded-full border border-border/10 bg-card/50 active:scale-95 active:bg-card/10"
            >
              <ArrowLeftRight size={24} color={colors.foreground} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}