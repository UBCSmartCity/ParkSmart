import { useState } from "react";
import { Stack } from "expo-router";
import { AppContext, States } from "../providers/AppContext";

export default function Layout() {
  const [states, setStates] = useState<States>(MOCK_STATES);

  return (
    <AppContext.Provider
      value={{
        states,
        setStates,
      }}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AppContext.Provider>
  );
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
