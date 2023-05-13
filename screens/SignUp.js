import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{ padding: Spacing }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: Spacing * 2,
              FontFamily: Font["poppins-semiBold"],
            }}
          >
            Create Account
          </Text>
          <Text
            style={{
              FontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.medium,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Create an account to get all features
          </Text>
        </View>
        <View style={{ marginVertical: Spacing }}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: Colors.gray,
            }}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: Colors.gray,
            }}
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: Colors.gray,
            }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.darkText}
            secureTextEntry={true}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: Colors.gray,
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            padding: Spacing * 2,
            backgroundColor: Colors.primary,
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
        >
          <Text
            style={{
              color: Colors.onPrimary,
              textAlign: "center",
              fontSize: FontSize.large,
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={{
            padding: Spacing,
          }}
        >
          <Text
            style={{
              color: Colors.Text,
              textAlign: "center",
              fontSize: FontSize.medium,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: Spacing * 2 }}>
        <Text
          style={{
            color: Colors.primary,
            textAlign: "center",
            fontSize: FontSize.small,
          }}
        >
          Or Sign Up With
        </Text>
        <View
          style={{
            marginTop: Spacing,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              broderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-google"
              size={Spacing * 2}
              color={Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              broderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-apple"
              size={Spacing * 2}
              color={Colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: Spacing,
              backgroundColor: Colors.gray,
              broderRadius: Spacing / 2,
              marginHorizontal: Spacing,
            }}
          >
            <Ionicons
              name="logo-facebook"
              size={Spacing * 2}
              color={Colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
