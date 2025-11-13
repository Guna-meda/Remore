import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Screen2() {
  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <TouchableOpacity className="absolute top-12 right-6">
        <Link href="/home" asChild>
          <Text className="text-sky-500 font-medium">Skip</Text>
        </Link>
      </TouchableOpacity>

      <Image
        source={require("../../assets/onboard2.png")}
        className="w-64 h-64 mb-8"
        resizeMode="contain"
      />

      <Text className="text-2xl font-semibold text-gray-800 mb-2">Organize</Text>
      <Text className="text-gray-500 text-center mb-8">
        Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.
      </Text>

      <Link href="/onboarding/screen3" asChild>
        <TouchableOpacity className="w-full py-3 rounded-xl bg-blue-500">
          <Text className="text-white text-center font-semibold">Next</Text>
        </TouchableOpacity>
      </Link>

      <View className="flex-row justify-center mt-6 space-x-2">
        <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
        <View className="w-2.5 h-2.5 rounded-full bg-gray-800" />
        <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
      </View>
    </View>
  );
}
