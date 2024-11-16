import { Link, Redirect } from "expo-router";
import { registerRootComponent } from "expo";
import { useEffect, useState, useContext } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import MapView, { Callout } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { AppContext } from "../../providers/AppContext";

export default function map() {
  const { states } = useContext(AppContext);
  const [initialRegion, setInitialRegion] = useState();
  const [currentLocation, setCurrentLocation] = useState();


  useEffect(() => {
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
      {states.parkades.map((pos, idx) => {
        return (
          <Marker key={idx} coordinate={pos.position}>
            <Callout>
              <View>
                <Text style={styles.calloutTitle}>{pos.title}</Text>
                <Link href="/garage" asChild>
                  <Button title="View Availablities" />
                </Link>
              </View>
            </Callout>
          </Marker>
        );
      })}
    </MapView>
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
