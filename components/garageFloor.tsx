import { View } from "react-native";

export default function garageFloor({ spaces }) {
  console.log(spaces);

  return (
    <View className="basis-5/6 flex flex-col justify-evenly items-end">
      {spaces &&
        spaces.map((space, idx) => (
          <View
            key={space.id}
            className={
              "h-14 w-28 " + (space.type > 0.5 ? "bg-purple" : "bg-orange")
            }
          ></View>
        ))}
    </View>
  );
}
