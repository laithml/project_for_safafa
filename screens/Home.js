import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { getCourses } from '../services/cousesServices';
import { getEvents } from '../services/eventServices';
import Footer from './Footer';
import Colors from '../constants/Colors';
import FontSize from '../constants/FontSize';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const ITEM_WIDTH = windowWidth * 0.7;
const ITEM_HEIGHT = 250;
const FULL_SIZE = ITEM_WIDTH + 20;

export default function AboutUs() {
    const [courses, setCourses] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const coursesData = await getCourses();
                setCourses(coursesData);
            } catch (error) {
                console.log('Error fetching courses:', error);
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

    const renderCourse = ({ item }) => {
        if (!item.name) {
            return null;
        }
        const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

        const navigation = useNavigation();

        const handleCoursePress = () => {
            navigation.navigate('Courses');
        };

        return (
            <TouchableOpacity onPress={handleCoursePress} style={styles.carouselItemContainer}>
                <View style={styles.clickIndicatorContainer}>
                    <Image source={require('../assets/click-icon.png')} style={styles.clickIndicatorImage} />
                    <Text style={styles.clickIndicatorText}>Tap to Learn More</Text>
                </View>
                <Carousel
                    data={[item]}
                    renderItem={({ item }) => (
                        <View style={styles.courseContainer}>
                            <Image style={styles.backgroundImage} source={{ uri: item.img }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.courseTitle}>{capitalizedName}</Text>
                            </View>
                        </View>
                    )}
                    sliderWidth={300}
                    itemWidth={250}
                    itemHeight={250}
                    scrollEnabled={false}
                />
            </TouchableOpacity>
        );
    };

    const renderEvent = ({ item }) => {
        if (!item.name) {
            return null;
        }
        const capitalizedName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

        const navigation = useNavigation();

        const handleEventPress = () => {
            navigation.navigate('Events');
        };

        return (
            <TouchableOpacity onPress={handleEventPress} style={styles.carouselItemContainer}>
                <View style={styles.clickIndicatorContainer}>
                    <Image source={require('../assets/click-icon.png')} style={styles.clickIndicatorImage} />
                    <Text style={styles.clickIndicatorText}>Tap to Learn More</Text>
                </View>
                <Carousel
                    data={[item]}
                    renderItem={({ item }) => (
                        <View style={styles.eventContainer}>
                            <Image style={styles.backgroundImage} source={{ uri: item.img }} />
                            <View style={styles.textContainer}>
                                <Text style={styles.eventTitle}>{capitalizedName}</Text>
                            </View>
                        </View>
                    )}
                    sliderWidth={300}
                    itemWidth={250}
                    itemHeight={250}
                    scrollEnabled={false}
                />
            </TouchableOpacity>
        );
    };

    const coursesData = [...courses.slice(0, 3), { isButton: true }];
    const eventsData = [...events.slice(0, 3), { isButton: true }];

    return (
        <>
            <ScrollView style={{ backgroundColor: Colors.white }}>
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Welcome to</Text>
                        <Text style={styles.title}>Beit Safafa Center</Text>
                    </View>

                    <View style={styles.intro}>
                        <Text style={styles.introHead}>Who are we?</Text>
                        <Text style={styles.introText}>
                            We're an association dedicated to our local residents. We support local initiatives that align with the residents' needs. We work with other town institutions to build plans to improve local services. Our goal is simply to improve the quality of life through the efforts of our teams.
                        </Text>
                    </View>

                    <View style={styles.carouselContainer}>
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Our Latest Courses</Text>
                        </View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={FULL_SIZE}
                            decelerationRate="fast"
                        >
                            <View style={{ width: 20 }} />
                            {coursesData.map((item, index) => (
                                <View key={index}>{renderCourse({ item, index })}</View>
                            ))}
                            <View style={{ width: 20 }} />
                        </ScrollView>
                    </View>

                    <View style={styles.carouselContainer}>
                        <View style={styles.sectionTitleContainer}>
                            <Text style={styles.sectionTitle}>Our Latest Events</Text>
                        </View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={FULL_SIZE}
                            decelerationRate="fast"
                        >
                            <View style={{ width: 20 }} />
                            {eventsData.map((item, index) => (
                                <View key={index}>{renderEvent({ item, index })}</View>
                            ))}
                            <View style={{ width: 20 }} />
                        </ScrollView>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </>
    );
}

const styles = StyleSheet.create({
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
    intro: {
        width: '90%',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        backgroundColor: Colors.lightPrimary,
        marginVertical: 20,
    },
    introHead: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        padding: 5,
        margin: 5,
        textAlign: 'center',
    },
    introText: {
        textAlign: 'center',
    },
    courseContainer: {
        backgroundColor: Colors.lightPrimary,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden',
        height: ITEM_HEIGHT,
    },
    eventContainer: {
        backgroundColor: Colors.lightPrimary,
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        overflow: 'hidden',
        height: ITEM_HEIGHT,
    },
    backgroundImage: {
        width: '100%',
        height: 100,
    },
    textContainer: {
        marginTop: 10,
    },
    courseTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    eventTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    carouselContainer: {
        padding: 10,
        marginVertical: 10,
        width: '100%',
    },
    sectionTitleContainer: {
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 3,
        borderColor: Colors.primary,
        padding: 5,
        borderRadius: 5,
        alignSelf: "center",
    },
    sectionTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
    },
    carouselItemContainer: {
        position: 'relative',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
    },
    clickIndicatorContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    clickIndicatorImage: {
        width: 25,
        height: 25,
        marginRight: 5,
    },
    clickIndicatorText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});
