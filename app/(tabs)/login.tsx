import { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../../firebase/firebase";
import {signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuth } from "../authContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const { login } = useAuth();
  const [error, setError] = useState("");

  useEffect(()=>{console.log(auth)}, [])

  // Log in method
  const handleLogin = () => {
    // add proper error handling
    if (!username || !password){
      setError("Both email and password are required");
      return;
    }

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("User signed in successfully");
        console.log(userCredential);
        // userCredential object contains user id, email, displayName, other Firebase user properties 
        const user = userCredential.user;
        // clear error on successful login
        setError("");
        
        // Just in case, may not need auth token 
        user.getIdToken().then((token) => {
        console.log("Token:", token)});
      })
      .catch((err) => {
        console.log("Error signing in:", err);
      });
  };

  // Sign out method
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((err) => {
        console.log("Error signing out:", err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder="User Email"
        placeholderTextColor="#666666"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="#666666"
        secureTextEntry
        style={styles.textInput}
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.commandButton} onPress={handleLogin}>
        <Text style={styles.panelButtonTitle}>Login</Text>
      </TouchableOpacity>
      {/* Sign Out Button */}
      <TouchableOpacity style={styles.commandButton} onPress={handleSignOut}>
        <Text style={styles.panelButtonTitle}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  textInput: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    paddingLeft: 15,
    color: '#05375a', 
    borderWidth: 1,
    borderColor: '#000', 
    borderRadius: 10,
    backgroundColor: '#fff', 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
  },

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});