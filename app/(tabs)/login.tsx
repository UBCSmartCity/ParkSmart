import { useState } from "react";
import { View, TextInput, Text, Button } from "react-native";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("User registered successfully");
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("User signed in successfully");
        console.log(userCredential);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Sign out method
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View className="flex-1 justify-center items-center">
      <TextInput
        className="text-black bg-gray-200 border border-gray-300 p-2 mt-2 mb-2 rounded w-4/5"
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />
      <TextInput
        className="text-black bg-gray-200 border border-gray-300 p-2 mt-2 mb-2 rounded w-4/5"
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />

      <View style={{ width: '80%', marginBottom: 10 }}>
        <Button title="Register" onPress={handleRegister} color="#007AFF" />
      </View>
      <View style={{ width: '80%', marginBottom: 10 }}>
        <Button title="Login" onPress={handleLogin} color="#007AFF" />
      </View>
      {/* Sign Out Button */}
      <View style={{ width: '80%' }}>
        <Button title="Sign Out" onPress={handleSignOut} color="#007AFF" />
      </View>

    </View>
  );
}
