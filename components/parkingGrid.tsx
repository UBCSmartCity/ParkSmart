// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Paho from 'paho-mqtt';

// const parkingSpots = {
//   '1':[
//   // Left side
//   { id: 'A-01', occupied: false, isDisable: true, type: 'car' },
//   { id: 'A-02', occupied: false, isDisable: true, type: 'car' },
//   { id: 'A-03', occupied: true, isDisable: false, type: 'car' },
//   { id: 'A-04', occupied: true, isDisable: false, type: 'car' },
//   { id: 'A-05', occupied: true, isDisable: false, type: 'car' },
//   { id: 'A-6', occupied: false, isDisable: false, type: 'car' },

//   // Right side, after left side spots
//   { id: 'A-07', occupied: false, isDisable: true, type: 'car' }, 
//   { id: 'A-08', occupied: false, isDisable: true, type: 'car' },
//   { id: 'A-09', occupied: true, isDisable: false, type: 'car' },
//   { id: 'A-10', occupied: true, isDisable: false, type: 'car' },
//   { id: 'A-11', occupied: false, isDisable: false, type: 'car' },
//   { id: 'A-12', occupied: true, isDisable: false, type: 'car' },
//   ],
//   '2':[
//     // Left side
//     { id: 'A-01', occupied: false, isDisable: true, type: 'car' },
//     { id: 'A-02', occupied: false, isDisable: true, type: 'car' },
//     { id: 'A-03', occupied: false, isDisable: false, type: 'car' },
//     { id: 'A-04', occupied: true, isDisable: false, type: 'car' },
//     { id: 'A-05', occupied: true, isDisable: false, type: 'car' },
  
//     // Right side, after left side spots
//     { id: 'A-07', occupied: false, isDisable: true, type: 'car' }, 
//     { id: 'A-08', occupied: false, isDisable: true, type: 'car' },
//     { id: 'A-09', occupied: true, isDisable: false, type: 'car' },
//     { id: 'A-10', occupied: true, isDisable: false, type: 'car' },
//     { id: 'A-11', occupied: false, isDisable: false, type: 'car' },
//     ],
// };

// const ParkingGrid = ({ floor }) => {

//   function onMessage(message) {
//     const topicNumber = parseInt(message.destinationName.replace('test/topic', ''));
//     const distance = parseFloat(message.payloadString);

    
//     if (topicNumber >= 1 && topicNumber <= 3) {
//       setFloor1Spaces(prevSpaces =>
//         prevSpaces.map((space, idx) => (idx === topicNumber - 1 ? { ...space, id: topicNumber, distance: distance } : space))
//       );
//     } else if (topicNumber >= 4 && topicNumber <= 7) {
//       setFloor2Spaces(prevSpaces =>
//         prevSpaces.map((space, idx) => (idx === topicNumber - 4 ? { ...space, id: topicNumber, distance: distance } : space))
//       );
//     }
//   }

//   useEffect(() => {
//     const host = "a379239388c5400b8bd9d9d9f56f51ca.s2.eu.hivemq.cloud";
//     const port = 8884;
//     const path = "/mqtt";
//     const clientId = `mqtt-floors-${parseInt(Math.random() * 100)}`;

//     const client = new Paho.Client(host, port, path, clientId);

//     client.onConnectionLost = (responseObject) => {
//       if (responseObject.errorCode !== 0) {
//         console.log("onConnectionLost:", responseObject.errorMessage);
//       }
//     };

//     client.onMessageArrived = onMessage;

//     client.connect({
//       onSuccess: () => {
//         console.log("Connected!");
        
//         for (let i = 1; i <= 7; i++) {
//           client.subscribe(`test/topic${i}`);
//         }
//       },
//       onFailure: (error) => {
//         console.log("Failed to connect:", error);
//       },
//       useSSL: true,
//       userName: "smartcity",
//       password: "SmartCity2024",
//     });

//     return () => {
//       if (client.isConnected()) {
//         client.disconnect();
//       }
//     };
//   }, []);

//   // Split the parking spots into two groups
//   const floorData = parkingSpots[floor] || [];
//   const splitIndex = Math.ceil(floorData.length / 2);
//   const leftSideSpots = floorData.slice(0, splitIndex);
//   const rightSideSpots = floorData.slice(splitIndex);

//   // const leftSideSpots = parkingSpots.filter((_, index) => index % 4 < 2);
//   // const rightSideSpots = parkingSpots.filter((_, index) => index % 4 >= 2);

//   const renderParkingSpots = (spots, side) => {
//     return spots.map((spot, index) => (
//       <View style={styles.parkingSpot} key={`spot-${side}-${index}`}>
//         {spot.occupied ? (
//           <Image
//             source={require('assets\icons\sport-car.png')}
//             style={styles.occupiedSpot}
//             resizeMode='contain'
//           />
//         ) : spot.isDisable ? (
//           // Show a different icon or style if the spot is disabled
//           <Image
//             source={require('assets\icons\disability.png')}
//             style={styles.disabledSpot}
//             resizeMode='contain'
//           />
//         ) : (
//           <Text style={styles.spotNumber}>{spot.id}</Text>
//         )}
//       </View>
//     ));
//   };


//   return (
//     <View style={styles.gridContainer}>
//       <View style={styles.column}>
//         {renderParkingSpots(leftSideSpots, 'left')}
//       </View>
//       <View style={styles.middleSpace}> 
//       <Icon name="arrow-downward" size={30} color="#000" />
//       </View>
//       <View style={styles.column}>
//         {renderParkingSpots(rightSideSpots, 'right')}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   gridContainer: {
//     flexDirection: 'row',
//     //flex: 1, // The grid container will take the full width of its parent
//     justifyContent: 'space-between', // This will place the space evenly between the two columns
//     paddingHorizontal: 10, // Add some horizontal padding if needed
//   },
//   column: {
//     flexDirection: 'row', // Direction of children within the column
//     flexWrap: 'wrap', // Wrap children to form a grid
//     width: '45%', // Each column takes up 45% of the grid container width
//     justifyContent: 'space-between', // Spacing between inner items
//   },
//   middleSpace: {
//     width: '10%', // The middle space takes up 10% of the grid container width
//     paddingTop: '30%',
//   },
//   parkingSpot: {
//     width: '50%', // Each spot takes up half of its parent (column) width, creating two columns
//     aspectRatio: 1, // Keep the spots square
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 5, // Padding inside each parking spot
//     marginBottom: 5, // Space between rows
//   },
//   occupiedSpot: {
//     width: '80%',
//     height: '80%',
//   },
//   spotNumber: {
//   },
//   disabledSpot: {
//     width: '60%',
//     height: '60%',
//   },
// });

// export default ParkingGrid;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Paho from 'paho-mqtt';

const initialParkingSpots = {
  '1': [
    // Left side
    { id: 'A-01', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-02', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-03', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-04', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-05', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-06', occupied: 0, isDisable: false, type: 'car' },
    // Right side, after left side spots
    { id: 'A-07', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-08', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-09', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-10', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-11', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-12', occupied: 0, isDisable: false, type: 'car' },
  ],
  '2': [
    // Left side
    { id: 'A-01', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-02', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-03', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-04', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-05', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-06', occupied: 0, isDisable: false, type: 'car' },
    // Right side, after left side spots
    { id: 'A-07', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-08', occupied: 0, isDisable: true, type: 'car' },
    { id: 'A-09', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-10', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-11', occupied: 0, isDisable: false, type: 'car' },
    { id: 'A-12', occupied: 0, isDisable: false, type: 'car' },
  ]
};

// Mapping of topic numbers to parking spot IDs for each floor
const topicToSpotMap = {
  '1': { '1': 'A-02', '2': 'A-09', '3': 'A-06' },
  '2': { '4': 'A-01', '5': 'A-09', '6': 'A-06', '7': 'A-12' }
};

const ParkingGrid = ({ floor }) => {
  const [spots, setSpots] = useState(initialParkingSpots[floor]);

  useEffect(() => {
    setSpots(initialParkingSpots[floor]);
    const client = new Paho.Client("a379239388c5400b8bd9d9d9f56f51ca.s2.eu.hivemq.cloud", 8884, "/mqtt", `mqtt-floors-${Math.random() * 1000}`);

    const onMessage = (message) => {
      const topicNumber = message.destinationName.replace('test/topic', '');
      const occupied = parseInt(message.payloadString); // 1 for occupied, 0 for available
      const spotId = topicToSpotMap[floor][topicNumber];

      console.log(`Received topic: ${topicNumber}, Occupied: ${occupied}, Spot ID: ${spotId}`);

      if (spotId) {
        setSpots(prevSpots =>
          prevSpots.map(spot => spot.id === spotId ? { ...spot, occupied: occupied } : spot)
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
        Object.keys(topicToSpotMap[floor]).forEach(topicNumber => {
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

  const renderParkingSpots = (spots, side) => {
    return spots.map((spot, index) => (
      <View style={styles.parkingSpot} key={`spot-${side}-${index}`}>
        {spot.isDisable && spot.occupied === 1 ? (
                // If the spot is disabled and occupied, show a specific image
                <Image
                    source={require('D:/UBC/UBC Smart City/ParkSmart/assets/icons/disability_red.png')}
                    style={styles.occupiedDisabledSpot}
                    resizeMode='contain'
                />
            ) : spot.isDisable ? (
                // If the spot is only disabled, show the disability image
                <Image
                    source={require('D:/UBC/UBC Smart City/ParkSmart/assets/icons/disability.png')}
                    style={styles.disabledSpot}
                    resizeMode='contain'
                />
            ) : spot.occupied === 1 ? (
                // If the spot is occupied but not disabled, show the car image
                <Image
                    source={require('D:/UBC/UBC Smart City/ParkSmart/assets/icons/sport-car.png')}
                    style={styles.occupiedSpot}
                    resizeMode='contain'
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
        {renderParkingSpots(leftSideSpots, 'left')}
      </View>
      <View style={styles.middleSpace}> 
        <Icon name="arrow-downward" size={30} color="#000" />
      </View>
      <View style={styles.column}>
        {renderParkingSpots(rightSideSpots, 'right')}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '45%',
    justifyContent: 'space-between',
  },
  middleSpace: {
    width: '10%',
    paddingTop: '30%',
  },
  parkingSpot: {
    width: '50%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginBottom: 5,
  },
  occupiedSpot: {
    width: '80%',
    height: '80%',
  },
  occupiedDisabledSpot: {
    width: '80%',
    height: '80%',
},
  spotNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledSpot: {
    width: '60%',
    height: '60%',
  },
});

export default ParkingGrid;
