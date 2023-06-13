import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export function EventCard({ name, description, img, onPress }) {
  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image style={styles.image} src={img} />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.line} />
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
    fontWeight: "600",
    textAlign: "center",
  },
  line: {
    borderBottomColor: Colors.lightPrimary,
    borderBottomWidth: 5,
  },
});
