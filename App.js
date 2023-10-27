import React, {useState, useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/Home";
import AboutUsScreen from "./screens/AboutUs";
import CoursesScreen from "./screens/Courses";
import EventsScreen from "./screens/Events";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {createStackNavigator} from "@react-navigation/stack";
import FP from "./screens/ForgetPassowrd";
import MyProfile from './screens/myProfile';

import {
    View,
    Button,
    Image,
    StyleSheet,
    Text,
} from "react-native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";
import Collapsible from "react-native-collapsible";
import {UserContext} from "./context/UserContext";
import {auth} from './config/firebase';
import Payment from "./screens/Payment";


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
    const {user, setUser} = useContext(UserContext);

    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                setUser(null);
                props.navigation.navigate('Home'); // Redirect user to home screen after logout
            })
            .catch((error) => console.log(error));
    };

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
                            {user && user.fullName && ( // Add a check for fullName existence
                                <Text style={styles.iconLabel}>
                                    Logged in as {user.fullName}
                                </Text>
                            )}
                            {!user && <Text style={styles.iconLabel}>Click me</Text>}
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
                        {user ? (
                            <>
                                <Button title="My Profile" onPress={() => props.navigation.navigate("MyProfile")}/>
                                <Button title="Logout" onPress={handleLogout}/>
                            </>
                        ) : (
                            <>
                                <Button
                                    title="Login"
                                    onPress={() => props.navigation.navigate("Login")}
                                />
                                <Button
                                    title="SignUp"
                                    onPress={() => props.navigation.navigate("SignUp")}
                                />
                            </>
                        )}
                    </View>
                </Collapsible>
            </View>
        </DrawerContentScrollView>
    );
};

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Events" component={EventsScreen}/>
            <Drawer.Screen name="Courses" component={CoursesScreen}/>
            <Drawer.Screen name="About Us" component={AboutUsScreen}/>
        </Drawer.Navigator>
    );
}

export default function App() {
    const [user, setUser] = useState(null);
    return (
        <UserContext.Provider value={{user, setUser}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="القائمة الرئيسية"
                        options={{headerShown: false}}
                        component={DrawerNavigator}
                    />
                    <Stack.Screen name="تسجيل الدخول" component={Login}/>
                    <Stack.Screen name="إنشاء حساب" component={SignUp}/>
                    <Stack.Screen name="تغير كلمة المرور" component={FP}/>
                    <Stack.Screen
                        name="الدفع"
                        component={Payment}
                        options={{
                            // Add this to your options
                            headerLeft: () => (
                                user ? <></> : <Button title="Login" onPress={() => navigation.navigate('Login')}/>
                            ),
                        }}
                    />
                    <Stack.Screen
                        name="حسابي"
                        component={MyProfile}
                        options={{ headerShown: false }}
                    />


                </Stack.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    );
}

