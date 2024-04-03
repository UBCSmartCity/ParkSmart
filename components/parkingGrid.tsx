import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const parkingSpots = {
  '1':[
  // Left side
  { id: 'A-01', occupied: false, isDisable: true, type: 'car' },
  { id: 'A-02', occupied: false, isDisable: true, type: 'car' },
  { id: 'A-03', occupied: true, isDisable: false, type: 'car' },
  { id: 'A-04', occupied: true, isDisable: false, type: 'car' },
  { id: 'A-05', occupied: true, isDisable: false, type: 'car' },
  { id: 'A-6', occupied: false, isDisable: false, type: 'car' },

  // Right side, after left side spots
  { id: 'A-07', occupied: false, isDisable: true, type: 'car' }, 
  { id: 'A-08', occupied: false, isDisable: true, type: 'car' },
  { id: 'A-09', occupied: true, isDisable: false, type: 'car' },
  { id: 'A-10', occupied: true, isDisable: false, type: 'car' },
  { id: 'A-11', occupied: false, isDisable: false, type: 'car' },
  { id: 'A-12', occupied: true, isDisable: false, type: 'car' },
  ],
  '2':[
    // Left side
    { id: 'A-01', occupied: false, isDisable: true, type: 'car' },
    { id: 'A-02', occupied: false, isDisable: true, type: 'car' },
    { id: 'A-03', occupied: false, isDisable: false, type: 'car' },
    { id: 'A-04', occupied: true, isDisable: false, type: 'car' },
    { id: 'A-05', occupied: true, isDisable: false, type: 'car' },
  
    // Right side, after left side spots
    { id: 'A-07', occupied: false, isDisable: true, type: 'car' }, 
    { id: 'A-08', occupied: false, isDisable: true, type: 'car' },
    { id: 'A-09', occupied: true, isDisable: false, type: 'car' },
    { id: 'A-10', occupied: true, isDisable: false, type: 'car' },
    { id: 'A-11', occupied: false, isDisable: false, type: 'car' },
    ],
};

const ParkingGrid = ({ floor }) => {
  // Split the parking spots into two groups
  const floorData = parkingSpots[floor] || [];
  const splitIndex = Math.ceil(floorData.length / 2);
  const leftSideSpots = floorData.slice(0, splitIndex);
  const rightSideSpots = floorData.slice(splitIndex);

  // const leftSideSpots = parkingSpots.filter((_, index) => index % 4 < 2);
  // const rightSideSpots = parkingSpots.filter((_, index) => index % 4 >= 2);

  const renderParkingSpots = (spots, side) => {
    return spots.map((spot, index) => (
      <View style={styles.parkingSpot} key={`spot-${side}-${index}`}>
        {spot.occupied ? (
          <Image
            source={require('assets\icons\sport-car.png')}
            style={styles.occupiedSpot}
            resizeMode='contain'
          />
        ) : spot.isDisable ? (
          // Show a different icon or style if the spot is disabled
          <Image
            source={require('assets\icons\disability.png')}
            style={styles.disabledSpot}
            resizeMode='contain'
          />
        ) : (
          <Text style={styles.spotNumber}>{spot.id}</Text>
        )}
      </View>
    ));
  };


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
    //flex: 1, // The grid container will take the full width of its parent
    justifyContent: 'space-between', // This will place the space evenly between the two columns
    paddingHorizontal: 10, // Add some horizontal padding if needed
  },
  column: {
    flexDirection: 'row', // Direction of children within the column
    flexWrap: 'wrap', // Wrap children to form a grid
    width: '45%', // Each column takes up 45% of the grid container width
    justifyContent: 'space-between', // Spacing between inner items
  },
  middleSpace: {
    width: '10%', // The middle space takes up 10% of the grid container width
    paddingTop: '30%',
  },
  parkingSpot: {
    width: '50%', // Each spot takes up half of its parent (column) width, creating two columns
    aspectRatio: 1, // Keep the spots square
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5, // Padding inside each parking spot
    marginBottom: 5, // Space between rows
  },
  occupiedSpot: {
    width: '80%',
    height: '80%',
  },
  spotNumber: {
  },
  disabledSpot: {
    width: '60%',
    height: '60%',
  },
});

export default ParkingGrid;
