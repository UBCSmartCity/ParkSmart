import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onPressSignUp = async () => {
    // Placeholder for Firebase signup logic
    alert("Sign up logic to be added here");    
  };

  return (
    <LinearGradient colors={["#F8F9FD", "#fff"]} style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#A0A0A0"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Retype - Password"
        placeholderTextColor="#A0A0A0"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>─── Or Sign up with ───</Text>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="apple" size={20} color="black" />
        <Text style={styles.socialText}>Sign in with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="google" size={20} color="red" />
        <Text style={styles.socialText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <FontAwesome name="facebook" size={20} color="blue" />
        <Text style={styles.socialText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Already have account?{' '}
        <Text
          style={styles.signupLink}
          onPress={() => router.replace("/login")}
        >
          Sign In
        </Text>
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5A27BE",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5A27BE",
    marginBottom: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    color: "#888",
    marginVertical: 15,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  socialText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  signupText: {
    fontSize: 14,
    color: "#888",
    marginTop: 15,
  },
  signupLink: {
    color: "#5A27BE",
    fontWeight: "bold",
  },
});
