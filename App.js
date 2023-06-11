import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/Home";
import AboutUsScreen from "./screens/AboutUs";
import CoursesScreen from "./screens/Courses";
import EventsScreen from "./screens/Events";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { createStackNavigator } from "@react-navigation/stack";
import FP from "./screens/ForgetPassowrd";
import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  SafeAreaView,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import Collapsible from "react-native-collapsible";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 10,
  },
  iconLabel: {
    fontSize: 12,
    color: "#777",
    fontWeight: "bold", // This line makes the text bold.
  },

  icon: {
    width: 50,
    height: 50,
  },
  drawerContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 100, // Add some bottom padding
  },
});

const CustomDrawerContent = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      <View>
        <DrawerItemList {...props} />
      </View>
      <View>
        <DrawerItem
          label=""
          icon={() => (
            <View style={styles.iconContainer}>
              <Image
                source={require("./assets/avtar.jpg")}
                style={styles.icon}
              />
              <Text style={styles.iconLabel}>Click me</Text>
            </View>
          )}
          onPress={() => setIsCollapsed(!isCollapsed)}
        />
        <Collapsible collapsed={isCollapsed}>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
              justifyContent: "center",
            }}
          >
            <Button
              title="Login"
              onPress={() => props.navigation.navigate("Login")}
            />
            <Button
              title="SignUp"
              onPress={() => props.navigation.navigate("SignUp")}
            />
          </View>
        </Collapsible>
      </View>
    </DrawerContentScrollView>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Courses"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Events" component={EventsScreen} />
      <Drawer.Screen name="Courses" component={CoursesScreen} />
      <Drawer.Screen name="About Us" component={AboutUsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main Menu"
          options={{ headerShown: false }}
          component={DrawerNavigator}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={FP} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
