import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";
import Carousel from "react-native-snap-carousel";

import Footer from "./Footer";

export default function AboutUs() {
  // Placeholder data for carousel items
  const carouselItems = [
    {
      title: "Our Message",
      description:
        "We, the Board of Directors of Beit Safafa Sharafat Registered Association, operate based on our social and economic responsibility towards the residents of Beit Safafa and Sharafat. We support their initiatives and democratic movements, aligning with their needs and desires through mutual responsibility, shared partnership, and community engagement. We collaborate with various existing institutions in the town by building community strategies to develop and improve local services, particularly in the areas of education, infrastructure, and different aspects of life. We provide programs, activities, and supportive events in cultural, educational, health-related, recreational, religious, sports, environmental, social, and voluntary fields for various age groups, within a comfortable and suitable environment.",
    },
    {
      title: "Our Goals",
      description:
        "Our goals include developing and creating local grassroots leadership and involving the local community in designing and planning the future policies of the town. We aim to represent the interests of the local community before authorities and have an impact on decision-makers within the municipality and other relevant authorities. The council, its administration, and employees serve as a resource to assist residents and serve the town and its population in matters related to the public interest and the improvement of local services. We focus on enhancing the capabilities and skills of council employees to provide services to the local community in the best possible way. We prioritize women's issues and provide various programs and activities to empower and educate them, as well as enhance their status and role within the family and society. Additionally, we pay attention to the elderly population, providing a suitable and comfortable environment along with activities and events to meet their needs.",
    },
    {
      title: "Our Values",
      description:
        "We aspire for every individual in the community to feel that the council is their second home. We derive our values in our work approach and service delivery from the culture, customs, and traditions of the local community.",
    },
  ];

  const staffMembers = [
    {
      name: "John Doe",
      title: "CEO",
      image:
        "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-260nw-1714666150.jpg",
    },
    {
      name: "Jane Smith",
      title: "CFO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGw3RtValAUS9swRhHBx1pqlzp4H6nn5OUAg&usqp=CAU",
    },
    // Add more staff members as needed
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const openPopup = (description) => {
    setPopupText(description);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openPopup(item.description)}
        >
          <Text style={styles.buttonText}>Read More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const StaffCarouselItem = ({ name, title, image }) => {
    return (
      <View style={styles.staffCarouselItem}>
        <Image source={{ uri: image }} style={styles.staffImage} />
        <Text style={styles.staffName}>{name}</Text>
        <Text style={styles.staffTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.baseText}>
          <Text style={styles.titleText}>Beit Safafa Center</Text>
          <Carousel
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.8}
            layout="default"
          />
          <Text style={styles.titleText}>Our Staff</Text>
          <Carousel
            data={staffMembers}
            renderItem={({ item }) => (
              <StaffCarouselItem
                name={item.name}
                title={item.title}
                image={item.image}
              />
            )}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.8}
            layout="default"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </ScrollView>
      <Footer />

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.popupContainer}>
          <ScrollView contentContainerStyle={styles.popupContent}>
            <Text style={styles.popupText}>{popupText}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  baseText: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  staffCarouselItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  staffImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  staffTitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
  },
  popupContainer: {
    flex: 1,
    marginTop: 90,
    backgroundColor: "rgba(211, 211, 211,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    flexGrow: 1,
  },
  popupText: {
    fontSize: 16,
    lineHeight: 30, // Adjust the line height here
    textAlign: "center",
    margin: 16,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
