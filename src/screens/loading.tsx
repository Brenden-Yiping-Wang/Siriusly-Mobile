import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoadingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    // Add a small delay to show the loading animation
    const timer = setTimeout(() => {
      if (user.name) {
        navigation.navigate("Profile");
      } else {
        navigation.navigate("Landing");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/berry.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0e6ff",
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 50,
  },
  loader: {
    marginTop: 20,
  },
});

export default LoadingScreen;
