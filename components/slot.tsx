import React from 'react';
import { View, Text } from 'react-native';

interface SlotsProps {
  isAvailable: boolean;
  type: 'ev' | 'regular' | 'handicap' | 'occupied';
}

export default function Slots({ isAvailable, type, ...props }: SlotsProps) {
  const typeStyles = {
    ev: {
      textColor: 'green',
      bgColor: 'green',
    },
    regular: {
      textColor: 'grey',
      bgColor: 'grey',
    },
    handicap: {
      textColor: 'blue',
      bgColor: 'blue',
    },
    occupied: {
      textColor: 'red',
      bgColor: 'red',
    },
  };

  const { textColor, bgColor } = isAvailable ? typeStyles[type] : typeStyles.occupied;

  return(
    <View {...props} style={{width: 100, height: 50, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: bgColor}} >
      <Text style={{fontSize: 20, color: "white"}}>{isAvailable ? type : 'Occupied'}</Text>
    </View>
  )
    
  

}