import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ParkadeLayout from "./parkadeLayout";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      {/* <Tabs.Screen
        name="garage"
        options={{
          title: "Garage",
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="parkadeLayout"
        options={{
          title: "Garage",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
    </Tabs>
  );
}
