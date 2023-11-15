import { Link } from "expo-router";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import Separator from "./components/separator";
import { useState } from "react";

function initializeSpaces(n = 5) {
  const obj = [];
  for (let i = 1; i <= n; i++) {
    obj[i] = {
      id: i,
      type: "fullsize",
      occupied: false,
    };
  }

  return obj;
}

export default function garage() {
  const [spaces, setSpaces] = useState(initializeSpaces());

  return (
    <View
      style={{
        backgroundColor: "#F1F1F7",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <View
        style={{
          flex: 0.15,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Text style={styles.textContainer}>Garage</Text>
        </View>
        <Link href="/" asChild>
          <TouchableHighlight
            style={{ flex: 0.3 }}
            underlayColor={"#9596C4"}
            activeOpacity={0.2}
          >
            <Text style={styles.textContainer}>back</Text>
          </TouchableHighlight>
        </Link>
      </View>
      <Separator />
      <View
        style={{
          flex: 0.85,
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "flex-end",
        }}
      >
        {spaces.map((space, idx) => (
          <View key={space.id} style={styles.space}></View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    color: "#5350B7",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#9596C4",
    borderRadius: 5,
    overflow: "hidden",
    padding: 5,
    textAlign: "center",
  },
  space: {
    backgroundColor: "#5350B7",
    height: 60,
    width: 130,
  },
});
