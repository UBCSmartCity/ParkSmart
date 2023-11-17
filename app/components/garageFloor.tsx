import { View, StyleSheet } from "react-native";

export default function garageFloor({ spaces }) {
  return (
    <View
      style={{
        flex: 0.85,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-end",
      }}
    >
      {spaces &&
        spaces.map((space, idx) => (
          <View
            key={space.id}
            style={space.type > 0.5 ? styles.spaceb : styles.space}
          ></View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  space: {
    backgroundColor: "#5350B7",
    height: 60,
    width: 130,
  },
  spaceb: {
    backgroundColor: "#EB8643",
    height: 60,
    width: 130,
  },
});
