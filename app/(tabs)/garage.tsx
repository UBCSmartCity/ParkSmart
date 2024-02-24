import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, TouchableHighlight, Text } from "react-native";
import Separator from "../../components/separator";
import GarageFloor from "../../components/garageFloor";
import GarageMap from "../../components/garageMap";
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
    // <View className="bg-offWhite flex flex-col h-full">
    //   <View className="basis-1/12 flex flex-row justify-evenly items-center">
    //     <View className="basis-1/3 border-solid border-2 border-purple rounded overflow-hidden">
    //       <Text className="text-purple font-semibold p-1 text-center">
    //         Garage
    //       </Text>
    //     </View>
    //     <View className="basis-1/4">
    //       <Dropdown
    //         selectedTextStyle={{
    //           color: "#5350B7",
    //           fontWeight: "600",
    //           textAlign: "center",
    //         }}
    //         data={data}
    //         labelField="label"
    //         valueField="value"
    //         searchPlaceholder="Search..."
    //         value={floor}
    //         onChange={(item) => {
    //           setFloor(item.value);
    //         }}
    //       />
    //     </View>
    //   </View>
    //   <Separator />
    //   <GarageFloor spaces={spaces[floor]} />
    // </View>
    <GarageMap />
  );
}
