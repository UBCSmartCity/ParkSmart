import { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { auth } from "../../firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log(userCredential)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  return (
    <View className="flex-1 justify-center items-center">
      <TextInput className="text-black bg-gray-200 border border-gray-300 p-2 mt-2 mb-2 rounded w-4/5" 
      onChangeText={setUsername} value={username} placeholder="Username"/>
      <TextInput className="text-black bg-gray-200 border border-gray-300 p-2 mt-2 mb-2 rounded w-4/5"
      onChangeText={setPassword} value={password} placeholder="Password"/>
      
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />

    </View>
  );
}
