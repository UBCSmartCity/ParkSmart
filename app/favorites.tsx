import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function Favorites() {

  // set page title to "Favorites"
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Favorites' }); // Change or remove the title
  }, [navigation]);


  // placeholder for favourites data
  // will update once database is established
  const [favourites, setFavourites] = useState([
    { id: "1", name: "UBC Thunderbird Parkade", location: "6365 Agronomy Rd" },
    { id: "2", name: "UBC West Parkade", location: "2140 Lower Mall" },
  ]);

  const removeFavourite = (id: string) => {
    setFavourites(favourites.filter((parkade) => parkade.id !== id));
  };  

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f8f9fa" }}>
      

      {favourites.length === 0 ? (
        <Text style={{ fontSize: 16, color: "#6c757d" }}>No favourites added.</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                backgroundColor: "white",
                marginBottom: 10,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View style={{flexDirection: 'row', alignItems: 'center'}}>

              <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
              <Icon name="heart" size={18} color="#f00" style={{marginLeft: 5}} />
              </View>
              <Text style={{ fontSize: 14, color: "#6c757d" }}>{item.location}</Text>
              <TouchableOpacity
                onPress={() => removeFavourite(item.id)}
                style={{
                  marginTop: 10,
                  padding: 8,
                  backgroundColor: "#dc3545",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", textAlign: "center" }}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
