import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Paho from "paho-mqtt";
import disabilityIcon from "../assets/icons/disability.png";
import disabilityRedIcon from "../assets/icons/disability_red.png";

import {MaterialIcons} from '@expo/vector-icons'

interface ParkingSpot {
  id: string,
  occupied: boolean,
  type: string // spot types: ev, reserved, bike, disabled, car
}

const parkingSpotToComponent = (parkingSpot: ParkingSpot) => {    
    if (parkingSpot.type === "disabled") {
      return ((!parkingSpot.occupied) ? <Image
        source={disabilityIcon}
        style={styles.disabledSpot}
        resizeMode="contain"
      /> : <Image
        source={disabilityRedIcon}
        style={styles.occupiedDisabledSpot}
        resizeMode="contain"
      />)               
    }

    if (parkingSpot.type === "bike") {
      return <MaterialIcons size={25} name="pedal-bike" color={(!parkingSpot.occupied) ? "green" : "red"}/>
    }

    if (parkingSpot.type === "reserved") {
      return <MaterialIcons size={25} name="block"/>
    }

    if (parkingSpot.type === "ev") {
      return <MaterialIcons size={25} name="electric-car" color={(!parkingSpot.occupied) ? "green" : "red"}/>
    }

    if (parkingSpot.type === "car") {
      return <MaterialIcons size={25} name="directions-car" color={(!parkingSpot.occupied) ? "green" : "red"}/>
    }    
}

const initialParkingSpots = {
  "1": [
    // Left side
    { id: "A-01", occupied: true,  type: "disabled" },
    { id: "A-02", occupied: true,  type: "ev" },
    { id: "A-03", occupied: true,  type: "car" },
    { id: "A-04", occupied: true,  type: "reserved" },
    { id: "A-05", occupied: true,  type: "bike" },
    { id: "A-06", occupied: false,  type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: false,  type: "car" },
    { id: "A-08", occupied: false,  type: "car" },
    { id: "A-09", occupied: false,  type: "car" },
    { id: "A-10", occupied: false,  type: "car" },
    { id: "A-11", occupied: false,  type: "car" },
    { id: "A-12", occupied: false,  type: "car" },
  ],
  "2": [
    // Left side
    { id: "A-01", occupied: false,  type: "car" },
    { id: "A-02", occupied: false,  type: "car" },
    { id: "A-03", occupied: false,  type: "car" },
    { id: "A-04", occupied: false,  type: "car" },
    { id: "A-05", occupied: false,  type: "car" },
    { id: "A-06", occupied: false,  type: "car" },
    // Right side, after left side spots
    { id: "A-07", occupied: false,  type: "car" },
    { id: "A-08", occupied: false,  type: "car" },
    { id: "A-09", occupied: false,  type: "car" },
    { id: "A-10", occupied: false,  type: "car" },
    { id: "A-11", occupied: false,  type: "car" },
    { id: "A-12", occupied: false,  type: "car" },
  ],
};

// Mapping of topic numbers to parking spot IDs for each floor
const topicToSpotMap = {
  "1": { "1": "A-02", "2": "A-09", "3": "A-06" },
  "2": { "4": "A-01", "5": "A-09", "6": "A-06", "7": "A-12" },
};

const ParkingGrid = ({ floor }: {floor: number}) => {
  const [spots, setSpots] = useState(initialParkingSpots[floor]);



  useEffect(() => {
    setSpots(initialParkingSpots[floor]);
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
        setSpots((prevSpots: ParkingSpot[]) =>
          prevSpots.map((spot) =>
            spot.id === spotId ? { ...spot, occupied: occupied } : spot
          )
        );
      }
    };

    client.onConnectionLost = (responseObject: any) => {
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

  const renderParkingSpots = (spots: ParkingSpot[], side: string) => {
    return spots.map((spot, index) => (
      <View style={styles.parkingSpot} key={`spot-${side}-${index}`}>        
        {parkingSpotToComponent(spot)}
        <Text style={styles.spotNumber}>{spot.id}</Text>                                          
      </View>
    ));
  };

  const updateParkingSpotType = (lot: string, spotId: string, occupied: boolean, newType: string) => {
    setSpots((prevSpots) => ({
      ...prevSpots,
      [lot]: prevSpots[lot].map((spot) =>
        spot.id === spotId ? { ...spot, occupied: occupied, type: newType } : spot
      ),
    }));
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
    width: "42%",
    height: "42%",
  },
  spotNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledSpot: {
    width: "42%",
    height: "42%",
  },
});

export default ParkingGrid;
