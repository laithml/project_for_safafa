import React, {useEffect, useState, useContext} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    SafeAreaView,
    Modal,
    Button,
    ImageBackground
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {UserContext} from "../context/UserContext";
import {getUserCourses} from "../services/cousesServices";
import {getUserEvents} from "../services/eventServices";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Footer from "./Footer";



export default function MyProfile({navigation}) {

    const {user} = useContext(UserContext);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [joinedEvents, setJoinedEvents] = useState([]);
    const [eventModalVisible, setEventModalVisible] = useState(false); // For event modal
    const [currentEvent, setCurrentEvent] = useState(null); // For selected event

    useEffect(() => {

        (async () => {
            const courses = await getUserCourses(user.id);
            console.log(purchasedCourses);  // Debug
            setPurchasedCourses(courses);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const events = await getUserEvents(user.id);  // Get user's events
            setJoinedEvents(events);  // Update state
            console.log(joinedEvents);  // Debug
        })();
    }, []);


    const openCourseDescription = (course) => {
        setCurrentCourse(course);
        setModalVisible(true);
    };

    const openEventDescription = (event) => {
        setCurrentEvent(event);
        setEventModalVisible(true);
    };

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
                                <View style={styles.userDetail}>
                                    <Ionicons
                                        name="person-circle-outline"
                                        size={24}
                                        color={Colors.primary}
                                        style={{ marginRight: 10 }}

                                    />
                                    <Text style={styles.detail}>Name: {user.fullName}</Text>
                                </View>
                                <View style={styles.userDetail}>
                                    <Ionicons
                                        name="mail-outline"
                                        size={24}
                                        color={Colors.primary}
                                        style={{ marginRight: 10 }}

                                    />
                                    <Text style={styles.detail}>Email: {user.email}</Text>
                                </View>
                                <View style={styles.userDetail}>
                                    <Ionicons
                                        name="call-outline"
                                        size={24}
                                        color={Colors.primary}
                                        style={{ marginRight: 10 }}

                                    />
                                    <Text style={styles.detail}>Phone: {user.phoneNumber}</Text>
                                </View>
                                <View style={styles.userDetail}>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={24}
                                        color={Colors.primary}
                                        style={{ marginRight: 10 }}

                                    />
                                    <Text style={styles.detail}>Birth Date: {user.age}</Text>
                                </View>
                                <View style={styles.userDetail}>
                                    <Ionicons
                                        name="transgender-outline"
                                        size={24}
                                        color={Colors.primary}
                                        style={{ marginRight: 10 }}

                                    />
                                    <Text style={styles.detail}>Gender: {user.gender}</Text>
                                </View>
                            </>
                        )}
                    </View>

                    <View style={styles.coursesContainer}>
                        <Text style={styles.coursesTitle}>My Courses</Text>
                        <ScrollView contentContainerStyle={styles.coursesList}>
                            {purchasedCourses.length > 0 ? (
                                purchasedCourses.map((course, index) => (
                                    <TouchableOpacity key={index} style={styles.courseItem} onPress={() => openCourseDescription(course)}>
                                        <Image source={{uri: course.img}} style={styles.courseImage}/>
                                        <Text style={styles.courseName}>{course.name}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={styles.noCoursesMessageContainer}>
                                    <Ionicons
                                        name="ios-school-outline"
                                        size={60}
                                        color={Colors.lightPrimary}
                                    />
                                    <Text style={styles.noCoursesMessage}>It seems like your learning journey has just begun!</Text>
                                    <Text style={styles.noCoursesMessageSub}>Browse courses and start learning today.</Text>
                                </View>
                            )}
                        </ScrollView>

                    </View>
                    <View style={styles.eventsContainer}>
                        <Text style={styles.eventsTitle}>My Events</Text>
                        <ScrollView contentContainerStyle={styles.eventsList}>
                            {joinedEvents.length > 0 ? (
                                joinedEvents.map((event, index) => (
                                    <TouchableOpacity key={index} style={styles.eventItem} onPress={() => openEventDescription(event)}>
                                        <Image source={{uri: event.img}} style={styles.courseImage}/>
                                        <Text style={styles.courseName}>{event.name}</Text>
                                    </TouchableOpacity>
                                ))
                            ) : (
                                <View style={styles.noEventsMessageContainer}>
                                    <Ionicons
                                        name="ios-calendar-outline"
                                        size={60}
                                        color={Colors.lightPrimary}
                                    />
                                    <Text style={styles.noEventsMessage}>You have not joined any events yet!</Text>
                                </View>
                            )}
                        </ScrollView>
                    </View>

                </ScrollView>
            </SafeAreaView>
            <Footer/>

            <Modal
                animationType="slide"
                transparent={true}
                visible={eventModalVisible}
                onRequestClose={() => {
                    setEventModalVisible(!eventModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <ImageBackground style={styles.modalView} source={currentEvent ? { uri: currentEvent.img } : null}>
                        <View style={styles.overlay} />
                        <View style={styles.scrollView}>
                            <Text style={styles.modalText}>{currentEvent?.description}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={() => setEventModalVisible(!eventModalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <ImageBackground style={styles.modalView} source={currentCourse ? { uri: currentCourse.img } : null}>
                        <View style={styles.overlay} />
                        <View style={styles.scrollView}>
                            <Text style={styles.modalText}>{currentCourse?.description}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
            </Modal>




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
        flexDirection: "row", // Add this
        alignItems: "center",
        padding: Spacing,
        marginBottom: Spacing,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    courseImage: {
        width: 100,
        height: 100,
        marginRight: Spacing * 4, // Adjust the margin if needed
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
    noCoursesMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing * 2,
    },
    noCoursesMessage: {
        fontSize: FontSize.large,
        color: Colors.text,
        fontWeight: "600",
        textAlign: 'center',
        marginTop: Spacing,
    },
    noCoursesMessageSub: {
        fontSize: FontSize.medium,
        color: Colors.text,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: Spacing / 2,
    },

    userDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: 400,
        height: 400,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        backgroundColor: "transparent",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(255,255,255,0.8)",
        justifyContent: "center",
        padding: 30,
    },
    openButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 10,
        alignSelf: "center",
        marginTop: 15,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        fontSize: 16,
        textAlign: "center",
        padding: 30, //Adjust padding as needed to position the description correctly
    },
    modalTextLarge: {
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: "center",
    },

    eventsContainer: {
        width: '90%',
        alignSelf: 'center',
        height: 350,
        backgroundColor: Colors.lightPrimary,
        padding: Spacing,
        borderRadius: 10,
        marginBottom: Spacing * 3,
        marginTop: '4%',
    },
    eventsTitle: {
        fontSize: FontSize.large,
        color: Colors.text,
        marginBottom: Spacing,
        fontWeight: "bold",
    },
    eventItem: {
        flexDirection: "row", // Add this
        alignItems: "center",
        padding: Spacing,
        marginBottom: Spacing,
        backgroundColor: Colors.primary,
        borderRadius: 10,
    },
    eventName: {
        fontSize: FontSize.medium,
        color: Colors.text,
        fontWeight: "bold",
    },

    eventImage: {
        width: 100,
        height: 100,
        marginRight: Spacing * 4, // Adjust the margin if needed
        borderRadius: 10,
    },

    noEventsMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing * 2,
    },
    noEventsMessage: {
        fontSize: FontSize.large,
        color: Colors.text,
        fontWeight: "600",
        textAlign: 'center',
        marginTop: Spacing,
    },

});
