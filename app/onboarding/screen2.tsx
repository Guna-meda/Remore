import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Screen2() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#D6E9FF] px-6">
      <Image
        source={require("../../assets/onboard2.png")}
        className="w-72 h-72 mb-6"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Smart Organization
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Your reminders, events, and todos — all synced and neatly organized.
      </Text>

      <TouchableOpacity
        className="bg-[#4A90E2] px-8 py-3 rounded-2xl"
        onPress={() => router.push("/onboarding/screen3" as any)}
      >
        <Text className="text-white text-lg font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
