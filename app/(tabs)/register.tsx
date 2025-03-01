import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../firebase/firebase";
import { Link } from "expo-router";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(()=>{console.log(auth)}, [])

    // Register method
    const handleRegister = () => {
      if (!email || !password) {
        setError("Both email and password are required.");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User registered successfully", userCredential);
          setError("");
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
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
  
        {/* Register Button */}
        <TouchableOpacity style={styles.commandButton} onPress={handleRegister}>
          <Text style={styles.panelButtonTitle}>Register</Text>
        </TouchableOpacity>
        
        {/* Link to Login Screen */}
        <Link href="/login" style={styles.linkStyle}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </Link>
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

    linkStyle: {
      marginTop: 15,
    },
    linkText: {
      color: '#2e64e5', 
      fontWeight: 'bold',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
});