import { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View className="flex-1 justify-center items-center">
      <TextInput className="text-black" onChangeText={setUsername} value={username} placeholder="Username"/>
      <TextInput onChangeText={setPassword} value={password} placeholder="Password"/>
      <Button title="submit" onPress={()=>{
        createUserWithEmailAndPassword(auth, username, password).then((userCredential)=>{
            console.log(userCredential)
        }).catch((err)=>{
            console.log(err)
        })
      }}/>
    </View>
  );
}
