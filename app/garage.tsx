import { useState } from "react";
import { Link } from "expo-router";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";
import Separator from "./components/separator";
import GarageFloor from "./components/garageFloor";
import { Dropdown } from "react-native-element-dropdown";

function initializeSpaces(floors = 2, n = 5) {
  const spaces = [];
  for (let i = 0; i < floors; i++) {
    const space = [];
    for (let j = 0; j < n; j++) {
      space[j] = {
        id: j,
        type: i,
        occupied: false,
      };
    }
    spaces[i] = space;
  }

  return spaces;
}

const data = [
  { label: "Floor 1", value: 0 },
  { label: "Floor 2", value: 1 },
];

export default function garage() {
  const [spaces, setSpaces] = useState(initializeSpaces());
  const [floor, setFloor] = useState(0);

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
        <View style={{ flex: 0.3 }}>
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
        <View style={{ flex: 0.3 }}>
          <Dropdown
            style={styles.textContainer}
            // placeholderStyle={styles.placeholderStyle}
            // selectedTextStyle={styles.selectedTextStyle}
            // inputSearchStyle={styles.inputSearchStyle}
            // iconStyle={styles.iconStyle}
            data={data}
            // search
            // maxHeight={300}
            labelField="label"
            valueField="value"
            // placeholder={!isFocus ? 'Select item' : '...'}
            searchPlaceholder="Search..."
            value={floor.toString()}
            // onFocus={() => setIsFocus(true)}
            // onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setFloor(item.value);
              // setIsFocus(false);
            }}
            // renderLeftIcon={() => (
            //   <AntDesign
            //     style={styles.icon}
            //     color={isFocus ? 'blue' : 'black'}
            //     name="Safety"
            //     size={20}
            //   />
            // )}
          />
        </View>
      </View>
      <Separator />
      <GarageFloor spaces={spaces[floor]} />
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
});
