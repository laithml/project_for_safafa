import React, { useState } from "react";
import {Text, Image, View, StyleSheet, TouchableOpacity, Modal, ImageBackground, ScrollView} from "react-native";
import Colors from "../constants/Colors";

export function EventCard({ name, description, img, onPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);

  const [isScrollable, setIsScrollable] = useState(false);
  const [layoutHeight, setLayoutHeight] = useState(0);

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    setIsScrollable(contentHeight > layoutHeight);
  };

  const handleLayout = (event) => {
    const layoutHeight = event.nativeEvent.layout.height;
    setLayoutHeight(layoutHeight);
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
            <TouchableOpacity
                style={styles.readButton}
                onPress={toggleModal}
            >
              <Text style={styles.readButtonText}>Read about the event</Text>
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
            <ImageBackground
                style={styles.modalView}
                source={{ uri: img }}
            >
              <View style={styles.overlay} />
              <ScrollView
                  contentContainerStyle={styles.scrollView}
                  onScroll={handleScroll}
                  onLayout={handleLayout}
                  scrollEventThrottle={400}
              >
                <Text style={styles.modalTextLarge}>{description}</Text>
              </ScrollView>

              <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: Colors.primary }}
                  onPress={toggleModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
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
    alignItems: 'center',
  },
  readButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    padding: 30,
  },
  openButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalTextLarge: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
