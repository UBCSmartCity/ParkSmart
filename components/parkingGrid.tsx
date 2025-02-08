import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Paho from "paho-mqtt";
import carIcon from "../assets/icons/car.png";
import disabilityIcon from "../assets/icons/disability.png";
import disabilityRedIcon from "../assets/icons/disability_red.png";

const initialParkingSpots = {
  thunderbird: {
    "1": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "2": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "3": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "4": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "5": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-13", occupied: 0, isDisable: false, type: "car" },
    ],
  },
  north: {
    "1": [
      // Left side
      { id: "N-01", occupied: 0, isDisable: true, type: "car" },
      { id: "N-02", occupied: 0, isDisable: true, type: "car" },
      { id: "N-03", occupied: 0, isDisable: false, type: "car" },
      { id: "N-04", occupied: 0, isDisable: false, type: "car" },
      { id: "N-05", occupied: 0, isDisable: false, type: "car" },
      { id: "N-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "N-07", occupied: 0, isDisable: true, type: "car" },
      { id: "N-08", occupied: 0, isDisable: true, type: "car" },
      { id: "N-09", occupied: 0, isDisable: false, type: "car" },
      { id: "N-10", occupied: 0, isDisable: false, type: "car" },
      { id: "N-11", occupied: 0, isDisable: false, type: "car" },
      { id: "N-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "2": [
      // Left side
      { id: "N-01", occupied: 0, isDisable: true, type: "car" },
      { id: "N-02", occupied: 0, isDisable: true, type: "car" },
      { id: "N-03", occupied: 0, isDisable: false, type: "car" },
      { id: "N-04", occupied: 0, isDisable: false, type: "car" },
      { id: "N-05", occupied: 0, isDisable: false, type: "car" },
      { id: "N-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "N-07", occupied: 0, isDisable: true, type: "car" },
      { id: "N-08", occupied: 0, isDisable: true, type: "car" },
      { id: "N-09", occupied: 0, isDisable: false, type: "car" },
      { id: "N-10", occupied: 0, isDisable: false, type: "car" },
      { id: "N-11", occupied: 0, isDisable: false, type: "car" },
      { id: "N-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "3": [
      // Left side
      { id: "N-01", occupied: 0, isDisable: true, type: "car" },
      { id: "N-02", occupied: 0, isDisable: true, type: "car" },
      { id: "N-03", occupied: 0, isDisable: false, type: "car" },
      { id: "N-04", occupied: 0, isDisable: false, type: "car" },
      { id: "N-05", occupied: 0, isDisable: false, type: "car" },
      { id: "N-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "N-07", occupied: 0, isDisable: true, type: "car" },
      { id: "N-08", occupied: 0, isDisable: true, type: "car" },
      { id: "N-09", occupied: 0, isDisable: false, type: "car" },
      { id: "N-10", occupied: 0, isDisable: false, type: "car" },
      { id: "N-11", occupied: 0, isDisable: false, type: "car" },
      { id: "N-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "4": [
      // Left side
      { id: "N-01", occupied: 0, isDisable: true, type: "car" },
      { id: "N-02", occupied: 0, isDisable: true, type: "car" },
      { id: "N-03", occupied: 0, isDisable: false, type: "car" },
      { id: "N-04", occupied: 0, isDisable: false, type: "car" },
      { id: "N-05", occupied: 0, isDisable: false, type: "car" },
      { id: "N-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "N-07", occupied: 0, isDisable: true, type: "car" },
      { id: "N-08", occupied: 0, isDisable: true, type: "car" },
      { id: "N-09", occupied: 0, isDisable: false, type: "car" },
      { id: "N-10", occupied: 0, isDisable: false, type: "car" },
      { id: "N-11", occupied: 0, isDisable: false, type: "car" },
      { id: "N-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "5": [
      // Left side
      { id: "T-01", occupied: 0, isDisable: true, type: "car" },
      { id: "T-02", occupied: 0, isDisable: true, type: "car" },
      { id: "T-03", occupied: 0, isDisable: false, type: "car" },
      { id: "T-04", occupied: 0, isDisable: false, type: "car" },
      { id: "T-05", occupied: 0, isDisable: false, type: "car" },
      { id: "T-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "T-07", occupied: 0, isDisable: true, type: "car" },
      { id: "T-08", occupied: 0, isDisable: true, type: "car" },
      { id: "T-09", occupied: 0, isDisable: false, type: "car" },
      { id: "T-10", occupied: 0, isDisable: false, type: "car" },
      { id: "T-11", occupied: 0, isDisable: false, type: "car" },
      { id: "T-13", occupied: 0, isDisable: false, type: "car" },
    ],
  },
  west: {
    "1": [
      // Left side
      { id: "W-01", occupied: 0, isDisable: true, type: "car" },
      { id: "W-02", occupied: 0, isDisable: true, type: "car" },
      { id: "W-03", occupied: 0, isDisable: false, type: "car" },
      { id: "W-04", occupied: 0, isDisable: false, type: "car" },
      { id: "W-05", occupied: 0, isDisable: false, type: "car" },
      { id: "W-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "W-07", occupied: 0, isDisable: true, type: "car" },
      { id: "W-08", occupied: 0, isDisable: true, type: "car" },
      { id: "W-09", occupied: 0, isDisable: false, type: "car" },
      { id: "W-10", occupied: 0, isDisable: false, type: "car" },
      { id: "W-11", occupied: 0, isDisable: false, type: "car" },
      { id: "W-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "2": [
      // Left side
      { id: "W-01", occupied: 0, isDisable: true, type: "car" },
      { id: "W-02", occupied: 0, isDisable: true, type: "car" },
      { id: "W-03", occupied: 0, isDisable: false, type: "car" },
      { id: "W-04", occupied: 0, isDisable: false, type: "car" },
      { id: "W-05", occupied: 0, isDisable: false, type: "car" },
      { id: "W-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "W-07", occupied: 0, isDisable: true, type: "car" },
      { id: "W-08", occupied: 0, isDisable: true, type: "car" },
      { id: "W-09", occupied: 0, isDisable: false, type: "car" },
      { id: "W-10", occupied: 0, isDisable: false, type: "car" },
      { id: "W-11", occupied: 0, isDisable: false, type: "car" },
      { id: "W-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "3": [
      // Left side
      { id: "W-01", occupied: 0, isDisable: true, type: "car" },
      { id: "W-02", occupied: 0, isDisable: true, type: "car" },
      { id: "W-03", occupied: 0, isDisable: false, type: "car" },
      { id: "W-04", occupied: 0, isDisable: false, type: "car" },
      { id: "W-05", occupied: 0, isDisable: false, type: "car" },
      { id: "W-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "W-07", occupied: 0, isDisable: true, type: "car" },
      { id: "W-08", occupied: 0, isDisable: true, type: "car" },
      { id: "W-09", occupied: 0, isDisable: false, type: "car" },
      { id: "W-10", occupied: 0, isDisable: false, type: "car" },
      { id: "W-11", occupied: 0, isDisable: false, type: "car" },
      { id: "W-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "4": [
      // Left side
      { id: "W-01", occupied: 0, isDisable: true, type: "car" },
      { id: "W-02", occupied: 0, isDisable: true, type: "car" },
      { id: "W-03", occupied: 0, isDisable: false, type: "car" },
      { id: "W-04", occupied: 0, isDisable: false, type: "car" },
      { id: "W-05", occupied: 0, isDisable: false, type: "car" },
      { id: "W-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "W-07", occupied: 0, isDisable: true, type: "car" },
      { id: "W-08", occupied: 0, isDisable: true, type: "car" },
      { id: "W-09", occupied: 0, isDisable: false, type: "car" },
      { id: "W-10", occupied: 0, isDisable: false, type: "car" },
      { id: "W-11", occupied: 0, isDisable: false, type: "car" },
      { id: "W-12", occupied: 0, isDisable: false, type: "car" },
    ],
    "5": [
      // Left side
      { id: "W-01", occupied: 0, isDisable: true, type: "car" },
      { id: "W-02", occupied: 0, isDisable: true, type: "car" },
      { id: "W-03", occupied: 0, isDisable: false, type: "car" },
      { id: "W-04", occupied: 0, isDisable: false, type: "car" },
      { id: "W-05", occupied: 0, isDisable: false, type: "car" },
      { id: "W-06", occupied: 0, isDisable: false, type: "car" },
      // Right side, after left side spots
      { id: "W-07", occupied: 0, isDisable: true, type: "car" },
      { id: "W-08", occupied: 0, isDisable: true, type: "car" },
      { id: "W-09", occupied: 0, isDisable: false, type: "car" },
      { id: "W-10", occupied: 0, isDisable: false, type: "car" },
      { id: "W-11", occupied: 0, isDisable: false, type: "car" },
      { id: "W-13", occupied: 0, isDisable: false, type: "car" },
    ],
  }
};

// Mapping of topic numbers to parking spot IDs for each floor
const topicToSpotMap = {
  thunderbird: { "1": "T-01", "2": "T-03" },
  north: { "3": "N-01", "4": "N-02" },
  west: { "5": "W-01", "6": "W-03" },
};

const ParkingGrid = ({ floor, parkade })  => {
  const [spots, setSpots] = useState(
    (initialParkingSpots[parkade] && initialParkingSpots[parkade][floor]) || [] );

  useEffect(() => {
    setSpots(
      (initialParkingSpots[parkade] && initialParkingSpots[parkade][floor]) || []);
    const client = new Paho.Client(
      "a379239388c5400b8bd9d9d9f56f51ca.s2.eu.hivemq.cloud",
      8884,
      "/mqtt",
      `mqtt-${parkade}-${Math.random() * 1000}`
    );

    const onMessage = (message) => {
      const topicNumber = message.destinationName.replace("test/topic", "");
      const occupied = parseInt(message.payloadString); // 1 for occupied, 0 for available
      const spotId = topicToSpotMap[parkade]?.[topicNumber];

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
        Object.keys(topicToSpotMap[parkade] || {}).forEach((topicNumber) => {
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
  }, [floor, parkade]);
  
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
