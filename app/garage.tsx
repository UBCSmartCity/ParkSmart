// ParkadeLayout.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Dropdown from "../components/dropdown";
import ParkingGrid from "../components/parkingGrid";

const ParkadeLayout = () => {
  const [selectedFloor, setSelectedFloor] = useState("1"); // Default to floor 1

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topLeftBox}>
          <Text
            style={[styles.topLeftText, styles.flexHalf, styles.enhancedHeight]}
          >
            UBC Thunderbird Parkade
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
        <View style={styles.entryExitLineLeft} />
        <Text style={styles.entryText}>ENTRY</Text>
        <View style={styles.entryExitLineRight} />
      </View>
      <View>
        <ParkingGrid floor={selectedFloor} />
      </View>
      <View style={[styles.footer, styles.flexShrink]}>
        <View style={styles.entryExitLineLeft} />
        <Text style={styles.exitText}>EXIT</Text>
        <View style={styles.entryExitLineRight} />
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
    gap: 50
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
  entryText: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#5CD268"
  },
  exitText: {
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#D5D5D5"
  },
  entryExitLineLeft: {
    flex: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  entryExitLineRight: {
    flex: 1,
    height: 12,
    backgroundColor: "#E0E0E0",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
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
    color: "5350B7",
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
