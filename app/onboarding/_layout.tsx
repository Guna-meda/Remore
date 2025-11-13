import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function OnboardingLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right", // smooth transitions
          gestureEnabled: false, // disable back swipe if you don’t want users going back
        }}
      >
        <Stack.Screen name="screen1" />
        <Stack.Screen name="screen2" />
        <Stack.Screen name="screen3" />
      </Stack>
    </>
  );
}
