import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Paho from "paho-mqtt";
import carIcon from "../assets/icons/car.png";
import disabilityIcon from "../assets/icons/disability.png";
import disabilityRedIcon from "../assets/icons/disability_red.png";

const initialParkingSpots = {
  "1": [
    // Left side
    { id: "A-01", occupied: 0, isDisable: true, type: "car" },
    { id: "A-02", occupied: 0, isDisable: true, type: "car" },
    { id: "A-03", occupied: 0, isDisable: false, type: "car" },
    { id: "A-04", occupied: 0, isDisable: false, type: "car" },
    { id: "A-05", occupied: 0, isDisable: false, type: "car" },
    { id: "A-06", occupied: 0, isDisable: false, type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: 0, isDisable: true, type: "car" },
    { id: "A-08", occupied: 0, isDisable: true, type: "car" },
    { id: "A-09", occupied: 0, isDisable: false, type: "car" },
    { id: "A-10", occupied: 0, isDisable: false, type: "car" },
    { id: "A-11", occupied: 0, isDisable: false, type: "car" },
    { id: "A-12", occupied: 0, isDisable: false, type: "car" },
  ],
  "2": [
    // Left side
    { id: "A-01", occupied: 0, isDisable: true, type: "car" },
    { id: "A-02", occupied: 0, isDisable: true, type: "car" },
    { id: "A-03", occupied: 0, isDisable: false, type: "car" },
    { id: "A-04", occupied: 0, isDisable: false, type: "car" },
    { id: "A-05", occupied: 0, isDisable: false, type: "car" },
    { id: "A-06", occupied: 0, isDisable: false, type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: 0, isDisable: true, type: "car" },
    { id: "A-08", occupied: 0, isDisable: true, type: "car" },
    { id: "A-09", occupied: 0, isDisable: false, type: "car" },
    { id: "A-10", occupied: 0, isDisable: false, type: "car" },
    { id: "A-11", occupied: 0, isDisable: false, type: "car" },
    { id: "A-12", occupied: 0, isDisable: false, type: "car" },
  ],
  "3": [
    // Left side
    { id: "A-01", occupied: 0, isDisable: true, type: "car" },
    { id: "A-02", occupied: 0, isDisable: true, type: "car" },
    { id: "A-03", occupied: 0, isDisable: false, type: "car" },
    { id: "A-04", occupied: 0, isDisable: false, type: "car" },
    { id: "A-05", occupied: 0, isDisable: false, type: "car" },
    { id: "A-06", occupied: 0, isDisable: false, type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: 0, isDisable: true, type: "car" },
    { id: "A-08", occupied: 0, isDisable: true, type: "car" },
    { id: "A-09", occupied: 0, isDisable: false, type: "car" },
    { id: "A-10", occupied: 0, isDisable: false, type: "car" },
    { id: "A-11", occupied: 0, isDisable: false, type: "car" },
    { id: "A-12", occupied: 0, isDisable: false, type: "car" },
  ],
  "4": [
    // Left side
    { id: "A-01", occupied: 0, isDisable: true, type: "car" },
    { id: "A-02", occupied: 0, isDisable: true, type: "car" },
    { id: "A-03", occupied: 0, isDisable: false, type: "car" },
    { id: "A-04", occupied: 0, isDisable: false, type: "car" },
    { id: "A-05", occupied: 0, isDisable: false, type: "car" },
    { id: "A-06", occupied: 0, isDisable: false, type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: 0, isDisable: true, type: "car" },
    { id: "A-08", occupied: 0, isDisable: true, type: "car" },
    { id: "A-09", occupied: 0, isDisable: false, type: "car" },
    { id: "A-10", occupied: 0, isDisable: false, type: "car" },
    { id: "A-11", occupied: 0, isDisable: false, type: "car" },
    { id: "A-12", occupied: 0, isDisable: false, type: "car" },
  ],
  "5": [
    // Left side
    { id: "A-01", occupied: 0, isDisable: true, type: "car" },
    { id: "A-02", occupied: 0, isDisable: true, type: "car" },
    { id: "A-03", occupied: 0, isDisable: false, type: "car" },
    { id: "A-04", occupied: 0, isDisable: false, type: "car" },
    { id: "A-05", occupied: 0, isDisable: false, type: "car" },
    { id: "A-06", occupied: 0, isDisable: false, type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: 0, isDisable: true, type: "car" },
    { id: "A-08", occupied: 0, isDisable: true, type: "car" },
    { id: "A-09", occupied: 0, isDisable: false, type: "car" },
    { id: "A-10", occupied: 0, isDisable: false, type: "car" },
    { id: "A-11", occupied: 0, isDisable: false, type: "car" },
    { id: "A-13", occupied: 0, isDisable: false, type: "car" },
  ],
};

// Mapping of topic numbers to parking spot IDs for each floor
const topicToSpotMap = {
  "1": { "1": "A-02", "2": "A-09", "3": "A-06" },
  "2": { "4": "A-01", "5": "A-09", "6": "A-06", "7": "A-12" },
};

const ParkingGrid = ({ floor }) => {
  const [spots, setSpots] = useState(initialParkingSpots[floor]);

  useEffect(() => {
    setSpots(initialParkingSpots[floor]|| []);
    const client = new Paho.Client(
      "a379239388c5400b8bd9d9d9f56f51ca.s2.eu.hivemq.cloud",
      8884,
      "/mqtt",
      `mqtt-floors-${Math.random() * 1000}`
    );

    const onMessage = (message) => {
      const topicNumber = message.destinationName.replace("test/topic", "");
      const occupied = parseInt(message.payloadString); // 1 for occupied, 0 for available
      const spotId = topicToSpotMap[floor][topicNumber];

      console.log(
        `Received topic: ${topicNumber}, Occupied: ${occupied}, Spot ID: ${spotId}`
      );

      if (spotId) {
        setSpots((prevSpots) =>
          prevSpots.map((spot) =>
            spot.id === spotId ? { ...spot, occupied: occupied } : spot
          )
        );
      }
    };

    client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:", responseObject.errorMessage);
      }
    };

    client.onMessageArrived = onMessage;

    client.connect({
      onSuccess: () => {
        console.log("Connected to MQTT");
        Object.keys(topicToSpotMap[floor]).forEach((topicNumber) => {
          client.subscribe(`test/topic${topicNumber}`);
        });
      },
      useSSL: true,
      userName: "smartcity",
      password: "SmartCity2024",
    });

    return () => {
      if (client.isConnected()) {
        client.disconnect();
      }
    };
  }, [floor]);
  if (!spots || spots.length === 0) {
    return <Text>No parking spots available for this floor.</Text>;
  }

  const renderParkingSpots = (spots, side) => {
    return spots.map((spot, index) => (
      <View style={styles.parkingSpot} key={`spot-${side}-${index}`}>
        {spot.isDisable && spot.occupied === 1 ? (
          // If the spot is disabled and occupied, show a specific image
          <Image
            source={disabilityRedIcon}
            style={styles.occupiedDisabledSpot}
            resizeMode="contain"
          />
        ) : spot.isDisable ? (
          // If the spot is only disabled, show the disability image
          <Image
            source={disabilityIcon}
            style={styles.disabledSpot}
            resizeMode="contain"
          />
        ) : spot.occupied === 1 ? (
          // If the spot is occupied but not disabled, show the car image
          <Image
            source={carIcon}
            style={styles.occupiedSpot}
            resizeMode="contain"
          />
        ) : (
          // If the spot is neither occupied nor disabled, show the spot number
          <Text style={styles.spotNumber}>{spot.id}</Text>
        )}
      </View>
    ));
  };

  const floorData = spots;
  const splitIndex = Math.ceil(floorData.length / 2);
  const leftSideSpots = floorData.slice(0, splitIndex);
  const rightSideSpots = floorData.slice(splitIndex);

  return (
    <View style={styles.gridContainer}>
      <View style={styles.column}>
        {renderParkingSpots(leftSideSpots, "left")}
      </View>
      <View style={styles.middleSpace}>
        <Icon name="arrow-downward" size={30} color="#000" />
      </View>
      <View style={styles.column}>
        {renderParkingSpots(rightSideSpots, "right")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  column: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "45%",
    justifyContent: "space-between",
  },
  middleSpace: {
    width: "10%",
    paddingTop: "30%",
  },
  parkingSpot: {
    width: "50%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginBottom: 5,
  },
  occupiedSpot: {
    width: "80%",
    height: "80%",
  },
  occupiedDisabledSpot: {
    width: "80%",
    height: "80%",
  },
  spotNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledSpot: {
    width: "60%",
    height: "60%",
  },
});

export default ParkingGrid;
