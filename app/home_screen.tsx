import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function home_screen() {
  return (
    <View
      style={{
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.25 }}>
        <Text>Home Screen</Text>
        <Link href="/" asChild>
          <Text>back</Text>
        </Link>
      </View>
      <View style={{ backgroundColor: "red", flex: 0.75 }}>

      </View>
    </View>
  );
}
