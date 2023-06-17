import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { auth } from "../config/firebase";
import Payment from "../screens/Payment";

export function CourseCard({ description, id, img, name, price, onPress }) {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth);
    });

    return () => unsubscribe();
  }, []);

  const handlePress = () => {
    if (user) {
      navigation.navigate("Payment", {
        courseId: id,
        courseName: name,
        coursePrice: price,
      });
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image style={styles.image} src={img} />
      <View style={styles.infoContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <View
            style={{
              borderBottomColor: Colors.lightPrimary,
              borderBottomWidth: 5,
              paddingBottom: 8,
              paddingTop: 8,
            }}
          />
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.purchaseButton} onPress={handlePress}>
            <Text style={styles.buttonText}>Purchase</Text>
          </TouchableOpacity>
          <Text style={styles.price}>₪ {price}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 8,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  purchaseButton: {
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  price: {
    fontSize: 22,
    fontWeight: "600",
  },
});
