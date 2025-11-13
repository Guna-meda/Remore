/**
 * Minimal NativeWind Test Component
 * 
 * This file demonstrates how to verify that NativeWind is working correctly.
 * To test:
 * 1. Import this component in any screen
 * 2. You should see:
 *    - A purple container (bg-purple-500)
 *    - White bold text (text-white font-bold)
 *    - Padding and rounded corners
 * 
 * If styles don't appear, check:
 * - tailwind.config.js has correct content paths
 * - babel.config.js has nativewind/babel preset
 * - global.css is imported in _layout.tsx
 * - metro.config.js uses withNativeWind
 */

import { View, Text } from "react-native";

export default function TestNativeWind() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="bg-purple-500 p-6 rounded-lg shadow-lg">
        <Text className="text-white text-xl font-bold text-center">
          ✅ NativeWind is Working!
        </Text>
        <Text className="text-white text-sm mt-2 text-center">
          If you see purple background and white text, styles are applied correctly.
        </Text>
      </View>
      
      <View className="mt-4 bg-blue-500 px-4 py-2 rounded-full">
        <Text className="text-white font-semibold">Test Button</Text>
      </View>
    </View>
  );
}
