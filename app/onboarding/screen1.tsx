import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Screen1() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-8">
      {/* Skip */}
      <TouchableOpacity className="absolute top-12 right-6">
        <Link href="/home" asChild>
          <Text className="text-teal-600 font-semibold">Skip</Text>
        </Link>
      </TouchableOpacity>

      {/* Image */}
      <Image
        source={require("../../assets/onboard1.png")}
        className="w-60 h-60 mb-10"
        resizeMode="contain"
      />

      {/* Text */}
      <Text className="text-3xl font-bold text-gray-800 mb-3">Reflect</Text>
      <Text className="text-center text-gray-500 leading-6 mb-10">
        Track your daily habits, note what went well, and reflect on how you can improve tomorrow.
      </Text>

      {/* Button */}
      <Link href="/onboarding/screen2" asChild>
        <TouchableOpacity className="w-full py-3.5 rounded-xl bg-teal-600">
          <Text className="text-white text-center text-base font-semibold">Next</Text>
        </TouchableOpacity>
      </Link>

      {/* Dots */}
      <View className="flex-row justify-center mt-8 space-x-2">
        <View className="w-2.5 h-2.5 rounded-full bg-gray-800" />
        <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </View>
    </View>
  );
}
