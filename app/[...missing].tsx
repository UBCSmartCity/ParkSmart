import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View className="flex items-center justify-center h-[100%]">
      <Redirect href={"/home"} />
      <Text>Not Found Screen</Text>
    </View>
  );
}
