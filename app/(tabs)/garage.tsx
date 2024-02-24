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
    <GarageMap />
  );
}
