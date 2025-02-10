// src/App.tsx
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import CreateQuestionScreen from "./screens/createQuestionScreen";
import HomeScreen from "./screens/homescreen";
import LandingScreen from "./screens/landing";
import LoadingScreen from "./screens/loading";
import LoginScreen from "./screens/login";
import ProfileScreen from "./screens/profileScreen";
import RegisterScreen from "./screens/register";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Logged-In Screens
const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home-outline" as keyof typeof Ionicons.glyphMap; // Default icon

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : ("home-outline" as keyof typeof Ionicons.glyphMap);
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person"
              : ("person-outline" as keyof typeof Ionicons.glyphMap);
          } else if (route.name === "CreateQuestion") {
            iconName = focused
              ? "add-circle"
              : ("add-circle-outline" as keyof typeof Ionicons.glyphMap);
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="CreateQuestion" component={CreateQuestionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Loading">
            {/* Unauthenticated Screens */}
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateQuestion"
              component={CreateQuestionScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />

            {/* Authenticated Screens */}
            <Stack.Screen
              name="AuthenticatedTabs"
              component={AuthenticatedTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
