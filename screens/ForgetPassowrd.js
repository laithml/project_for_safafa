import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { forgetPasswordHandler } from "../services/auth";

export default function FP() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");

  //TODO : Add validation for the inputs

  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: Spacing * 3,
              FontFamily: Font["poppins-semiBold"],
              textAlign: "center",
            }}
          >
            You Don't Remember Your Password?
          </Text>
          <Text
            style={{
              FontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.medium,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Enter your email and we will send you a link to reset your password
          </Text>
        </View>
        <View style={{ marginVertical: Spacing * 3 }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.darkText}
            onChangeText={(text) => setEmail(text)}
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
          onPress={() => forgetPasswordHandler(email)}
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
            Send Email
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
