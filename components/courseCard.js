import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export function CourseCard({ description, id, img, name, price, onPress }) {
  return (
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image style={styles.image} src={img} />
        <View style={styles.infoContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <View
                style={{
                  borderBottomColor: Colors.lightPrimary,
                  borderBottomWidth: 5,
                }}
            />
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.purchaseButton} onPress={onPress}>
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
    fontWeight: "600",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
