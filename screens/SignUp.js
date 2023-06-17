import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SignUpFireBase } from "../services/auth";
import { auth } from "../config/firebase";

export default function SignUp() {
  const navigation = useNavigation();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [age, setAge] = React.useState("");
  const [errorMessageEmail, setErrorMessageEmail] = React.useState("");
  const [errorMessageName, setErrorMessageName] = React.useState("");
  const [errorMessagePhone, setErrorMessagePhone] = React.useState("");
  const [errorMessagePassword, setErrorMessagePassword] = React.useState("");
  const [errorMessageAge, setErrorMessageAge] = React.useState("");

  const handleEmailBlur = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessageEmail("Invalid email address");
    } else {
      setErrorMessageEmail("");
    }
  };

  function handleNameBlur() {
    const nameRegex = /^\S+\s\S+$/; // this should match two or more words separated by spaces
    const maxLength = 30; // maximum length of name

    if (fullName.length > maxLength) {
      // name is too long
      setErrorMessageName("Name must be 30 characters or less.");
    } else if (!nameRegex.test(fullName)) {
      // name doesn't have at least two words separated by spaces
      setErrorMessageName("Please enter just your name and your family name");
    } else {
      // name is valid
      setErrorMessageName("");
    }
  }

  const handlePhoneBlur = () => {
    const phoneRegex = /^(050|051|052|053|054|055|058)\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessagePhone(
        "Phone number must start with one of the valid prefixes (050, 051, 052, 053, 054, 055, 058) and be 10 digits long."
      );
    } else {
      setErrorMessagePhone("");
    }
  };

  const handlePasswordBlur = () => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\W]{8,15}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessagePassword(
        "Password must be between 8 to 15 characters long and contain at least one letter and one number."
      );
    } else {
      setErrorMessagePassword("");
    }
  };

  const handleAgeBlur = () => {
    if (!age || age.length > 2) {
      setErrorMessageAge("please enter a valid age");
    } else {
      setErrorMessageAge("");
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: Spacing }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: Spacing * 2,
            }}
          >
            Create Account
          </Text>
          <Text
            style={{
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
            onChangeText={(text) => setFullName(text)}
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: errorMessageName ? "red" : Colors.gray,
            }}
            onBlur={handleNameBlur}
          />
          {errorMessageName ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessageName}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}
          <TextInput
            placeholder="Age"
            keyboardType={"numeric"}
            onChangeText={(text) => setAge(text)}
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: errorMessageName ? "red" : Colors.gray,
            }}
            onBlur={handleAgeBlur}
          />
          {errorMessageName ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessageName}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}

          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={Colors.darkText}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: errorMessageName ? "red" : Colors.gray,
            }}
            onBlur={handleEmailBlur}
          />
          {errorMessageEmail ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessageEmail}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}

          <TextInput
            placeholder="Phone Number"
            keyboardType={"numeric"}
            placeholderTextColor={Colors.darkText}
            onChangeText={(text) => setPhoneNumber(text)}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: errorMessagePhone ? "red" : Colors.gray,
            }}
            onBlur={handlePhoneBlur}
          />
          {errorMessagePhone ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessagePhone}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}

          <TextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor={Colors.darkText}
            secureTextEntry={true}
            style={{
              borderWidth: 1,
              backgroundColor: Colors.lightPrimary,
              borderRadius: Spacing,
              padding: Spacing * 2,
              marginVertical: Spacing,
              borderColor: errorMessagePassword ? "red" : Colors.gray,
            }}
            onBlur={handlePasswordBlur}
          />
          {errorMessagePassword ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessagePassword}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}

          {errorMessagePassword ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "red", marginRight: 5 }}>
                {errorMessagePassword}
              </Text>
              <Ionicons name="ios-warning-outline" size={20} color="red" />
            </View>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={async () => {
            if (
              errorMessageEmail ||
              errorMessageName ||
              errorMessagePhone ||
              errorMessagePassword ||
              errorMessageAge
            ) {
              // Display error message or prevent sign-up process
              return;
            }

            const result = await SignUpFireBase(
              email,
              age,
              password,
              fullName,
              phoneNumber
            );

            if (result === true) {
              // Immediately sign out after successful signup
              await auth.signOut();

              navigation.navigate("Login");
            } else {
              // Handle sign-up error
              console.log("Sign-up failed");
            }
          }}
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
    </ScrollView>
  );
}
