import { useState } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AppContext, States } from "../../providers/AppContext";

export default function TabLayout() {
  const [states, setStates] = useState<States>(MOCK_STATES);

  return (
    <AppContext.Provider
      value={{
        states,
        setStates,
      }}
    >
      <Tabs>
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const MOCK_STATES: States = {
  parkades: [
    {
      position: {
        latitude: 49.26177,
        longitude: -123.24318,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "Thunderbird Parkade",
    },
    {
      position: {
        latitude: 49.26913588171714,
        longitude: -123.25094801537071,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "North Parkade",
    },
    {
      position: {
        latitude: 49.26264468076022,
        longitude: -123.25547069764835,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "West Parkade",
    },
  ],
};
