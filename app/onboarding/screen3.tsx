import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Screen3() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#E9FCE9] px-6">
      <Image
        source={require("../../assets/onboard3.png")}
        className="w-72 h-72 mb-6"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Never Miss a Thing
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Get reminders directly in WhatsApp — and manage them anytime in the app.
      </Text>

      <TouchableOpacity
        className="bg-[#25D366] px-8 py-3 rounded-2xl"
onPress={() => router.replace("/(tabs)" as any)}      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
