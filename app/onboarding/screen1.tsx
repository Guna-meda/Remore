import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Screen1() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-[#E6E6FA] px-6">
      <Image
        source={require("../../assets/onboard1.png")}
        className="w-72 h-72 mb-6"
        resizeMode="contain"
      />
      <Text className="text-3xl font-bold text-gray-800 mb-2">
        Forward. Relax. Done.
      </Text>
      <Text className="text-gray-600 text-center mb-8">
        Just forward a chat message — we’ll turn it into a todo automatically.
      </Text>

      <TouchableOpacity
        className="bg-[#9b5de5] px-8 py-3 rounded-2xl"
        onPress={() => router.push("/onboarding/screen2" as any)}
      >
        <Text className="text-white text-lg font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
}
