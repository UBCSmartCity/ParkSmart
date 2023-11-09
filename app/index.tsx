import { Link } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className=" ">
        <Text className=" font-extrabold text-5xl">ParkSmart</Text>
        <Text className=" font-extrabold">by:UBCSmartCity</Text>
      </View>
      <View className="pt-10">
        <Link href="/login" asChild>
          <Text>Login</Text>
        </Link>
        <Link href="/home_screen" asChild>
          <Text>Home</Text>
        </Link>
      </View>
    </View>
  );
}
