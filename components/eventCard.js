import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import { joinEvent } from "../services/eventServices";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from '../context/UserContext'; // Assuming you have UserContext

export function EventCard({ id, name, description, img }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [isScrollable, setIsScrollable] = useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const { user } = useContext(UserContext); // Use context to get user

  const navigation = useNavigation();

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    setIsScrollable(contentHeight > layoutHeight);
  };

  const handleLayout = (event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setLayoutHeight(layoutHeight);
  };

  // Handle join event
  const handleJoin = async () => {
    if (user) {
      try {
        console.log(user);

        await joinEvent(user.id, id); // join event with user id and event id
        Alert.alert(  // show success alert
            "Success",
            "You have successfully joined the event!",
            [{ text: "OK", onPress: () => toggleModal() }]
        );
      } catch (error) {
        console.log('Error joining event: ', error);
        Alert.alert(  // show error alert
            "Error",
            "An error occurred while trying to join the event. Please try again later.",
            [{ text: "OK" }]
        );
      }
    } else {
      toggleModal(); // Close the modal
      navigation.navigate("Login"); // navigate to login if not authenticated
    }
  };




  return (
      <View>
        <TouchableOpacity style={styles.card} onPress={toggleModal}>
          <Image style={styles.image} source={{ uri: img }} />
          <View style={styles.infoContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.line} />
            <TouchableOpacity style={styles.readButton} onPress={toggleModal}>
              <Text style={styles.readButtonText}>Join Event / Read Details</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={toggleModal}
        >
          <View style={styles.centeredView}>
            <ImageBackground style={styles.modalView} source={{ uri: img }}>
              <View style={styles.overlay} />
              <ScrollView
                  contentContainerStyle={styles.scrollView}
                  onScroll={handleScroll}
                  onLayout={handleLayout}
                  scrollEventThrottle={400}
              >
                <Text style={styles.modalTextLarge}>{description}</Text>
              </ScrollView>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: Colors.primary }}
                    onPress={handleJoin}
                >
                  <Text style={styles.textStyle}>Join</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.openButton, backgroundColor: Colors.primary }}
                    onPress={toggleModal}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        </Modal>
      </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightPrimary,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
    padding: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1.5,
    resizeMode: "cover",
    borderRadius: 16,
    marginBottom: 16,
  },
  infoContainer: {
    width: "100%",
  },
  textContainer: {
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 8,
  },
  line: {
    borderBottomColor: Colors.lightPrimary,
    borderBottomWidth: 5,
  },
  readButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
  },
  readButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    flex: 1, // will occupy half the width of the parent
    margin: 5, // space between buttons
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonContainer: {
    flexDirection: "row", // aligns buttons horizontally
    justifyContent: "space-between", // spaces the buttons evenly
    width: "100%", // takes the full width of the parent
    paddingHorizontal: 10, // some padding from sides
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
});
