import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //TODO : Add validation for the inputs
  //TODO : google sign in

  const LoginFireBase = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      navigation.navigate("Home");
    });
  };

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
            }}
          >
            Login Here
          </Text>
          <Text
            style={{
              FontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Welcome back you've been missed!
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
              borderColor: Colors.gray,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              FontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.small,
              color: Colors.primary,
              alignSelf: "flex-end",
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => LoginFireBase()}
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
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
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
            Create a new account
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
          Or Sign In With
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
