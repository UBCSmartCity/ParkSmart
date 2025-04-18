import { useRouter } from "expo-router";
import { registerRootComponent } from "expo";
import { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function map() {
  const router = useRouter();
  const [initialRegion, setInitialRegion] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [position, setPosition] = useState([
    {
      position: {
        latitude: 49.26177,
        longitude: -123.24318,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "Thunderbird Parkade",
      grid: "thunderbird"
    },
    {
      position: {
        latitude: 49.26913588171714,
        longitude: -123.25094801537071,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "North Parkade",
      grid: "north"
    },
    {
      position: {
        latitude: 49.26264468076022,
        longitude: -123.25547069764835,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "West Parkade",
      grid: "west"
    },
  ]);

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        router.replace("/login");
      }
    };

    checkAuth();

    
    
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (!location) {
        console.log("Location not found");
        return;
      }
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={false}
        showsCompass={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        {position?.map((pos, idx) => (
          <Marker key={idx} coordinate={pos.position}>
            <Callout onPress={() => router.push({ pathname: "/garage", params: { name: pos.title, grid: pos.grid } })}>
              <Text style={styles.calloutTitle}>{pos.title}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={() => console.log("Button Pressed")}>
                <Text style={{ color: "blue", textDecorationLine: "underline" }}>View Availabilities</Text>
              </TouchableOpacity>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

registerRootComponent(map);
