import React from 'react';
import { SafeAreaView } from 'react-native';
import { MiMapView } from '@mappedin/react-native-sdk';

// See Trial API key Terms and Conditions
// https://developer.mappedin.com/guides/api-keys
const options = {
  clientId: '5eab30aa91b055001a68e996',
  clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
  venue: 'mappedin-demo-mall',
  perspective: 'Website',
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MiMapView
        style={{ flex: 1 }}
        key="mappedin"
        options={options}
      />
    </SafeAreaView>
  );
};

export default App;