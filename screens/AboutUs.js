//made by ghoshehh
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
export default function AboutUs() {
  return (
    <ScrollView>
      <View style={styles.baseText}>
        <Text style={styles.titleText}>تعرف علينا</Text>
        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "bold" }}>
          المجلس الاداري بيت صفافا شرفات
        </Text>
        <Image
          source={{
            uri: "https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_428,w_640/514217",
          }}
          style={{ height: 200, width: 350, marginTop: 20 }}
        />
        <ScrollView horizontal={true}>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 50,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 50,
              marginLeft: 18,
              alignItems: "center", // center horizontally
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              رسالتنا
            </Text>
          </View>

          <View
            styles={{ backgroundColor: "white", height: 300, width: 500 }}
          ></View>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 50,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 50,
              marginLeft: 18,
              alignItems: "center", // center horizontally
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text>hi again</Text>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    flex: 0,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
