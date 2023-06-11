import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import FontSize from "../constants/FontSize";
import Font from "../constants/Font";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import { LoginFireBase } from "../services/auth";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <SafeAreaView>
      <View style={{ padding: Spacing * 2 }}>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: Colors.primary,
              marginVertical: Spacing * 3,
            }}
          >
            Login Here
          </Text>
          <Text
            style={{
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgetPassword")}
            style={{
              alignSelf: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.small,
                color: Colors.primary,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            //TODO : handle false case
            if (LoginFireBase(email, password)) navigation.navigate("Home");
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
    </SafeAreaView>
  );
}
