import React, { useContext, useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";
import { useNavigation } from "@react-navigation/native";
import { LoginFireBase } from "../services/auth";
import { UserContext } from '../context/UserContext';
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from "../config/firebase";

export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    const handleLogin = async () => {
        setIsLoading(true);
        const user = await LoginFireBase(email, password);
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
                navigation.navigate("الرئيسية");
            } else {
                console.log('No such document!');
            }
        } else {
            console.log("Login failed");
        }
        setIsLoading(false);
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
                        Welcome back! You've been missed!
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
                        onPress={() => navigation.navigate("تغير كلمة المرور")}
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
                    onPress={handleLogin}
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
                    {isLoading ? (
                        <ActivityIndicator color={Colors.onPrimary} />
                    ) : (
                        <Text
                            style={{
                                color: Colors.onPrimary,
                                textAlign: "center",
                                fontSize: FontSize.large,
                            }}
                        >
                            Sign In
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("إنشاء حساب")}
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
