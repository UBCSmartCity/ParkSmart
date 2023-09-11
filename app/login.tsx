import { Link } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function login() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-extrabold text-5xl">Login</Text>
      <View className="pt-5">
        <Link href="/" asChild>
          <Text>back</Text>
        </Link>
      </View>
    </View>
  );
}
