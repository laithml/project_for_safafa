import React, {useEffect, useState, useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, SafeAreaView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {UserContext} from "../context/UserContext";
import {getUserCourses} from "../services/cousesServices";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Footer from "./Footer";

export default function MyProfile({navigation}) {
    const {user} = useContext(UserContext);
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    useEffect(() => {
        (async () => {
            const courses = await getUserCourses(user.id);
            setPurchasedCourses(courses);
        })();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.headerButton}
                        >
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color={Colors.primary}
                            />
                            <Text style={styles.headerTitle}>My Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userInfo}>
                        {user && (
                            <>
                                <Text style={styles.detail}>Name: {user.fullName}</Text>
                                <Text style={styles.detail}>Birth Date: {user.age}</Text>
                                <Text style={styles.detail}>Phone: {user.phoneNumber}</Text>
                                <Text style={styles.detail}>Email: {user.email}</Text>

                            </>
                        )}
                    </View>
                    <View style={styles.coursesContainer}>
                        <Text style={styles.coursesTitle}>My Courses</Text>
                        <ScrollView contentContainerStyle={styles.coursesList}>
                            {purchasedCourses.map((course, index) => (
                                <View key={index} style={styles.courseItem}>
                                    <Image
                                        source={{uri: course.img}}
                                        style={styles.courseImage}
                                    />
                                    <Text style={styles.courseName}>{course.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Footer/>

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
        padding: Spacing * 2,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing * 2,
    },
    headerButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        fontWeight: "bold",
    },
    userInfo: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: Colors.lightPrimary,
        padding: Spacing,
        borderRadius: 10,
        marginBottom: Spacing,
        marginTop: '4%',
    },
    textPic: {
        fontSize: "12",
    },

    coursesContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 350,
        backgroundColor: Colors.lightPrimary,
        padding: Spacing,
        borderRadius: 10,
        marginBottom: Spacing * 3,
        marginTop: '4%',
    },
    detail: {
        fontSize: FontSize.medium,
        color: Colors.text,
        marginVertical: Spacing / 2,
        fontWeight: "500",
    },
    coursesList: {
        flexGrow: 1,
    },
    coursesTitle: {
        fontSize: FontSize.large,
        color: Colors.text,
        marginBottom: Spacing,
        fontWeight: "bold",
    },
    courseItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: Spacing,
        marginBottom: Spacing,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    courseImage: {
        width: 100,
        height: 100,
        marginRight: Spacing * 4,
        borderRadius: 10,
    },
    courseName: {
        fontSize: FontSize.medium,
        color: Colors.text,
        fontWeight: "bold",
    },
    addProfilePicButton: {
        position: "absolute",
        right: 10,
        top: '10%',
        height: '70%',
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightPrimary,
        marginLeft : 10,
    },



});
