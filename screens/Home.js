import React from "react";
import {Text, View, StyleSheet, Image, ScrollView, FlatList} from "react-native";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { getCourses } from "../services/cousesServices"
import renderCourse from "./Courses"

export default function AboutUs() {

    const data = ['Item 1', 'Item 2', 'Item 3'];

    // Define a rendering function
    const renderItem = ({item}) => (
        <View style={styles.item}>
            <Text style={styles.text}>{item}</Text>
        </View>
    );

    const courses = getCourses().keys;



    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.title}>Beit safafa Center</Text>
            </View>

            <View style={styles.Intro}>
                <Text style={styles.IntroHead}>Who are we?</Text>
                <Text style={{alignContent: 'center'}}>
                    We're an association dedicated towards our local residents.
                    We support local initiatives that align with the residents' needs
                    ,we work with other town institutions to build plans to improve local services,
                    our goal is simply to improve the quality of life through the efforts of our teams.
                </Text>
            </View>

                <View>
                    <FlatList
                        data={courses}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true} // Add this line
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10, // Change marginVertical to marginHorizontal
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    },
    IntroHead: {
        alignItems: 'center',
        fontSize: FontSize.medium,
        padding: 5,
        margin: 5
    },
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.xLarge,
        fontWeight: 'bold',
    },
    Intro: {
        width: '90%',
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
        backgroundColor: Colors.lightPrimary
    }
});