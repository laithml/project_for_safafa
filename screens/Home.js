import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { getCourses } from "../services/cousesServices";
import { getEvents } from "../services/eventServices";
import Footer from "./Footer";
import Colors from "../constants/Colors";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";

const ITEM_HEIGHT = 380;

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [events, setEvents] = useState([]);

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

  const renderCourse = ({ item }) => {
    if (!item.name) {
      return null;
    }
    const capitalizedName =
      item.name.charAt(0).toUpperCase() + item.name.slice(1);

    const navigation = useNavigation();

    const handleCoursePress = () => {
      navigation.navigate("Courses");
    };

    return (
      <TouchableOpacity onPress={handleCoursePress}>
        <Carousel
          data={[item]}
          layout="default"
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width - 40}
          itemHeight={ITEM_HEIGHT}
          scrollEnabled={true} // Enable scrolling
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image
                style={styles.backgroundImage}
                source={{ uri: item.img }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{capitalizedName}</Text>
              </View>
              <View style={styles.clickIndicatorContainer}>
                <Image
                  source={require("../assets/click-icon.png")}
                  style={styles.clickIndicatorImage}
                />
                <Text style={styles.clickIndicatorText}>Tap to Learn More</Text>
              </View>
            </View>
          )}
        />
      </TouchableOpacity>
    );
  };

  const renderEvent = ({ item }) => {
    if (!item.name) {
      return null;
    }
    const capitalizedName =
      item.name.charAt(0).toUpperCase() + item.name.slice(1);

    const navigation = useNavigation();

    const handleEventPress = () => {
      navigation.navigate("Events");
    };

    return (
      <TouchableOpacity onPress={handleEventPress}>
        <Carousel
          data={[item]}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image
                style={styles.backgroundImage}
                source={{ uri: item.img }}
              />
              <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{capitalizedName}</Text>
              </View>
              <View style={styles.clickIndicatorContainer}>
                <Image
                  source={require("../assets/click-icon.png")}
                  style={styles.clickIndicatorImage}
                />
                <Text style={styles.clickIndicatorText}>Tap to Learn More</Text>
              </View>
            </View>
          )}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width - 40}
          itemHeight={ITEM_HEIGHT}
          scrollEnabled={true} // Enable scrolling
        />
      </TouchableOpacity>
    );
  };

  const coursesData = [...courses.slice(0, 3), { isButton: true }];
  const eventsData = [...events.slice(0, 3), { isButton: true }];

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Welcome to</Text>
            <Text style={styles.title}>Beit Safafa Center</Text>
          </View>

          <View style={styles.intro}>
            <Text style={styles.introHead}>Who are we?</Text>
            <Text style={styles.introText}>
              We're an association dedicated to our local residents. We support
              local initiatives that align with the residents' needs. We work
              with other town institutions to build plans to improve local
              services. Our goal is simply to improve the quality of life
              through the efforts of our teams.
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
              decelerationRate="fast"
            >
              {coursesData.map((item, index) => (
                <View key={index}>{renderCourse({ item })}</View>
              ))}
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
              decelerationRate="fast"
            >
              {eventsData.map((item, index) => (
                <View key={index}>{renderEvent({ item })}</View>
              ))}
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
    textAlign: "center",
  },
  introText: {
    textAlign: "center",
  },
  cardContainer: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    flex: 1,
    overflow: "hidden",
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center", // Center the content vertically
  },
  backgroundImage: {
    width: "100%",
    height: "75%",
    borderRadius: 10,
  },
  textContainer: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    textTransform: "capitalize",
    textAlign: "center",
    marginTop: 5,
  },
  carouselContainer: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  sectionTitleContainer: {
    marginBottom: 5,
    borderWidth: 3,
    borderColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: FontSize.medium,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  clickIndicatorContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.lightPrimary,
    flexDirection: "row",
  },
  clickIndicatorImage: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  clickIndicatorText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.white,
  },
});
