import { Link, Redirect } from "expo-router";
import { Button, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import {Marker} from 'react-native-maps';

export default function map(){
  return (
    <View className="flex items-center justify-center h-[100%]">
      <Redirect href={"/home"} />
    <MapView
    style={styles.map}
    initialRegion={{
        latitude: 49.2606,
        longitude: -123.2460,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}
    />
    </View>
  );
}

const styles = StyleSheet.create({

    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
