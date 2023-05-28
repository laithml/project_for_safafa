import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export function CourseCard({ name, price, description, img, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.image} src={img} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View
          style={{
            borderBottomColor: Colors.lightPrimary,
            borderBottomWidth: 5,
          }}
        />
        <Text style={styles.price}>₪ {price}</Text>
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
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  price: {
    fontSize: 22,
    marginTop: 8,
    fontWeight: "600",
    alignSelf: "flex-end",
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
});
