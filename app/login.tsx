import { Link, Redirect } from "expo-router";
import { Button, Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { useState} from "react";

export default function login() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const onPressLogin = () => {
            //Do stuff
        };

    return (
      <View className="flex items-center justify-center h-[100%]">
        <Redirect href={"/home"} />
        <Text className=" font-extrabold text-5xl">Sign Up</Text>
        <TextInput
          //style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#7D0DC3"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          //style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#7D0DC3"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress = {onPressLogin}
        style={styles.loginBtn}>
         <Text style={styles.TextInput}>LOGIN</Text> 
       </TouchableOpacity> 
      </View>
      
    );
  }

  const styles = StyleSheet.create({
    TextInput: {
        height: 1,
        flex: 1,
        padding: 15,
        marginLeft: 1,
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#7D0DC3",
      },
  });