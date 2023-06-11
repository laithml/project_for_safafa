import React, {useEffect, useState} from "react";
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import Carousel from "react-native-snap-carousel";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import {getCourses} from "../services/cousesServices";
import {getEvents} from "../services/eventServices";

export default function AboutUs({navigation}) {
    let [courses, setCourses] = useState([]);
    let [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                console.log("Error fetching courses:", error);
            }
        };

        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                setEvents(eventsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCourses();
        fetchEvents();
    }, []);
    courses = courses.splice(0, 3);
    events = events.splice(0, 3);
    const renderCourse = ({item}) => {
        if (!item.name) {
            return null;
        }

        const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        if (item.isButton) {
            return (
                <TouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate("CoursesScreen")}>
                    <Text style={styles.buttonText}>Go to Other Page</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.courseContainer}>
                <View style={[styles.backgroundImage, {backgroundImage: item.img}]}/>
                <Text style={styles.courseTitle}>{capitalizedName}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
            </View>
        );
    };

    const renderEvent = ({item}) => {
        if (!item.name) {
            return null;
        }

        const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        if (item.isButton) {
            return (
                <TouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate("EventsScreen")}>
                    <Text style={styles.buttonText}>Go to Other Page</Text>
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.courseContainer}>
                <View style={[styles.backgroundImage, {backgroundImage: item.img}]}/>
                <Text style={styles.courseTitle}>{capitalizedName}</Text>
                <Text style={styles.courseDescription}>{item.description}</Text>
            </View>
        );
    };

    const coursesData = [...courses, {isButton: true}];
    const eventsData = [...events, {isButton: true}];
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome to</Text>
                <Text style={styles.title}>Beit Safafa Center</Text>
            </View>

            <View style={styles.intro}>
                <Text style={styles.introHead}>Who are we?</Text>
                <Text style={styles.introText}>
                    We're an association dedicated to our local residents. We support local initiatives
                    that align with the residents' needs. We work with other town institutions to
                    build plans to improve local services. Our goal is simply to improve the quality
                    of life through the efforts of our teams.
                </Text>
            </View>
            <View style={styles.Scrollers}>
                <Text style={styles.introHead}>Our latest Courses!</Text>

                <Carousel
                    data={coursesData}
                    renderItem={renderCourse}
                    sliderWidth={300}
                    itemWidth={250}
                    scrollEnabled={courses.length > 0} // Enable scrolling only when there are courses
                />
            </View>
            <View style={styles.Scrollers}>
                <Text style={styles.introHead}>Our latest Events!</Text>

                <Carousel
                    data={eventsData}
                    renderItem={renderEvent}
                    sliderWidth={300}
                    itemWidth={250}
                    scrollEnabled={events.length > 0} // Enable scrolling only when there are events
                />
            </View>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    Scrollers: {
        height:200,
        backgroundColor: Colors.lightPrimary,
        padding: 10,
        marginVertical: 10,
    },
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
    },
    titleContainer: {
        alignItems: "center",
    },
    title: {
        fontSize: FontSize.xLarge,
        fontWeight: "bold",
    },
    intro: {
        width: "90%",
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
        backgroundColor: Colors.lightPrimary,
        marginVertical: 20,
    },
    introHead: {
        fontSize: FontSize.medium,
        fontWeight: "bold",
        padding: 5,
        margin: 5,
    },
    introText: {
        textAlign: "center",
    },
    courseContainer: {
        backgroundColor: Colors.lightPrimary,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    // backgroundImage: {
    //     position: "absolute",
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     resizeMode: "cover",
    // },
    courseTitle: {
        fontSize: FontSize.medium,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
    courseDescription: {
        marginTop: 5,
        textAlign: "center",
    },
    buttonItem: {
        backgroundColor: Colors.primary,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: FontSize.medium,
        fontWeight: "bold",
    },
});
