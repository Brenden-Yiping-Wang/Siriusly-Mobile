import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LandingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/berry.png")}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Siriusly</Text>

      <View style={styles.buttonContainer}>
        <Button
          //   icon={() => (
          //     <MaterialIcons name="person-add" size={24} color="black" />
          //   )}
          mode="outlined"
          onPress={() => navigation.navigate("Register")}
          style={[
            styles.button,
            { backgroundColor: "white", borderColor: "white" },
          ]}
          labelStyle={[styles.buttonLabel, { color: "black" }]}
        >
          Sign up
        </Button>

        <Button
          //   icon={() => <MaterialIcons name="login" size={24} color="white" />}
          mode="contained"
          onPress={() => navigation.navigate("Login")}
          style={[styles.button, { backgroundColor: "black" }]}
          labelStyle={styles.buttonLabel}
        >
          Log in
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0e6ff",
    height: "100%",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 200,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  button: {
    padding: 8,
    flex: 1,
  },
  buttonLabel: {
    fontSize: 18,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    // marginBottom: 24,
    color: "black",
    textShadowColor: "rgba(98, 0, 238, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
});

export default LandingScreen;
