import { useRouter } from "expo-router";
import { registerRootComponent } from "expo";
import { useEffect, useState, useRef } from "react";
import { Button, Text, StyleSheet, TouchableOpacity, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "react-native-gesture-bottom-sheet";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function MapScreen() {
  const router = useRouter();
  const [initialRegion, setInitialRegion] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [selectedParking, setSelectedParking] = useState(null);
  const bottomSheetRef = useRef(null);

  const [position, setPosition] = useState([
    {
      position: {
        latitude: 49.26177,
        longitude: -123.24318,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "Thunderbird Parkade",
      rate: 20,
    },
    {
      position: {
        latitude: 49.26913588171714,
        longitude: -123.25094801537071,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "North Parkade",
      rate: 20,
    },
    {
      position: {
        latitude: 49.26264468076022,
        longitude: -123.25547069764835,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      title: "West Parkade",
      rate: 20,
    },
  ]);

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
    <View style={styles.container}>
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
        {position.map((pos, idx) => (
          <Marker
            key={idx}
            coordinate={pos.position}
            onPress={() => {
              setSelectedParking(pos);
              bottomSheetRef.current.show();
            }}
          />
        ))}
      </MapView>

      <BottomSheet ref={bottomSheetRef} height={SCREEN_HEIGHT * 0.35}>
        <View style={styles.sheetContent}>
          <Text style={styles.modalTitle}>{selectedParking?.title}</Text>
          <Text style={styles.modalRate}>Rate: ${selectedParking?.rate}/hr</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/garage")}
          >
            <Text style={styles.buttonText}>View Availability</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  sheetContent: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: SCREEN_HEIGHT * 0.35,
    width: '100%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalRate: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

registerRootComponent(MapScreen);
