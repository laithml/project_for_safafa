import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./screens/Home";
import AboutUsScreen from "./screens/AboutUs";
import CoursesScreen from "./screens/Courses";
import EventsScreen from "./screens/Events";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import FP from "./screens/ForgetPassowrd";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Events" component={EventsScreen} />
      <Drawer.Screen name="Courses" component={CoursesScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Drawer"
          options={
            //hide header
            { headerShown: false }
          }
          component={DrawerNavigator}
        />
        <Stack.Screen name="ForgetPassword" component={FP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
