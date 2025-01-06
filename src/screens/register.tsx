import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        Alert.alert("Success", "Registration successful");
      } else {
        console.error("Registration failed");
        Alert.alert("Error", "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred during registration");
    }
  };
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button
        icon={() => <MaterialIcons name="arrow-back" size={24} color="black" />}
        mode="text"
        onPress={handleBackPress}
        style={{ position: "absolute", left: 0, top: 0, marginTop: 50 }}
      >
        Back
      </Button>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        icon={() => <MaterialIcons name="check" size={24} color="white" />}
        mode="contained"
        onPress={handleRegister}
        style={{ padding: 4, width: "50%" }}
        labelStyle={{ fontSize: 18 }}
      >
        Register
      </Button>
      <View
        style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
      >
        <Text>Already have an account? </Text>
        <Button
          mode="text"
          onPress={() => navigation.navigate("Login" as never)}
          style={{ marginLeft: -8 }}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0e6ff",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default RegisterScreen;
