// ParkadeLayout.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Dropdown from "../components/dropdown";
import ParkingGrid from "../components/parkingGrid";

const ParkadeLayout = () => {
  const { name, grid } = useLocalSearchParams();
  const [selectedFloor, setSelectedFloor] = useState("1"); // Default to floor 1

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topLeftBox}>
          <Text
            style={[styles.topLeftText, styles.flexHalf, styles.enhancedHeight]}
          >
            {name || "UBC Parkade"}
          </Text>
        </View>
        <View style={[styles.flexHalf, styles.enhancedHeight]}>
          <Dropdown
            selectedFloor={selectedFloor}
            onFloorChange={setSelectedFloor}
          />
        </View>
      </View>
      <View style={[styles.entryExit, styles.flexShrink]}>
        <View style={styles.entryExitLine} />
        <Text style={styles.entryExitText}>ENTRY</Text>
        <View style={styles.entryExitLine} />
      </View>
      <View>
        <ParkingGrid floor={selectedFloor} parkade={grid} />
      </View>
      <View style={[styles.footer, styles.flexShrink]}>
        <View style={styles.entryExitLine} />
        <Text style={styles.entryExitText}>EXIT</Text>
        <View style={styles.entryExitLine} />
      </View>
    </View>
  );
};

// You will define your styles here
const styles = StyleSheet.create({
  container: {
    flex: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: "space-between",
    padding: 5,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 10,
    paddingBottom: 30,
    marginTop: 10,
  },
  footer: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  entryExit: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 0,
  },
  entryExitText: {
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  entryExitLine: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
  },
  topLeftBox: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 8,
  },
  topLeftText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
  },
  flexHalf: {
    flex: 1, // Makes each element take half of the header's width
  },
  enhancedHeight: {
    height: 40,
  },
  flexShrink: {
    flexShrink: 0, // Prevent the item from shrinking
  },
});

//export default ParkadeLayout;
export default function ParkadeLayoutScreen() {
  return <ParkadeLayout />;
}
