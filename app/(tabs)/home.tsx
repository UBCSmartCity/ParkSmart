import { Link } from "expo-router";
import { registerRootComponent } from "expo";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className=" ">
        <Text className=" font-extrabold text-5xl">ParkSmart</Text>
        <Text className=" font-extrabold">
          by:UBC SmartCity Transportation Team
        </Text>
      </View>
    </View>
  );
}

registerRootComponent(Home);
