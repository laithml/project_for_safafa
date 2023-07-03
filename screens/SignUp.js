import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Modal,
    Platform,
} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import moment from 'moment';
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DatePickerModal from "../components/DatePickerModal";

import { useNavigation } from "@react-navigation/native";
import { SignUpFireBase } from "../services/auth";
import { auth } from "../config/firebase";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "react-native-actionsheet/lib/styles";

export default function SignUp() {
    const navigation = useNavigation();

    // TextInput references
    const fullNameRef = useRef(null);
    const birthdateDayRef = useRef(null);
    const birthdateMonthRef = useRef(null);
    const birthdateYearRef = useRef(null);
    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const passwordRef = useRef(null);


    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessageName, setErrorMessageName] = useState("");
    const [errorMessagePhone, setErrorMessagePhone] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessageBirthdate, setErrorMessageBirthdate] = useState("");
    const [errorMessageGender, setErrorMessageGender] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessageDay, setErrorMessageDay] = useState(null);
    const [errorMessageMonth, setErrorMessageMonth] = useState(null);
    const [errorMessageYear, setErrorMessageYear] = useState(null);


    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => 1950 + index);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    // Helper function to check if date is valid and not in the future
    const isValidDate = (day, month, year) => {
        const inputDate = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
        return inputDate.isValid() && inputDate.isSameOrBefore(moment());
    };

// Helper function to check if value is in correct format
    const isValidFormat = (value, format) => {
        return moment(value, format, true).isValid();
    };


    useEffect(() => {
        if (gender) {
            setTimeout(() => emailRef.current?.focus(), 100);
        }
    }, [gender]);

    const handleDayChange = (value) => {
        if (!isValidFormat(value, 'DD')) {
            setErrorMessageDay('Invalid day format');
            setDay(value);
        } else {
            setErrorMessageDay('');
            setDay(value);
        }
    };

    const handleMonthChange = (value) => {
        if (!isValidFormat(value, 'MM')) {
            setErrorMessageMonth('Invalid month format');
            setMonth(value);
        } else {
            setErrorMessageMonth('');
            setMonth(value);
        }
    };

    const handleYearChange = (value) => {
        if (!isValidFormat(value, 'YYYY')) {
            setErrorMessageYear('Invalid year format');
            setYear(value);
        } else {
            setErrorMessageYear('');
            setYear(value);
        }
    };


    const formatDate = () => {
        const formattedDay = day.padStart(2, "0"); // Ensure two-digit day format
        const formattedMonth = month.padStart(2, "0"); // Ensure two-digit month format

        return `${formattedDay}-${formattedMonth}-${year}`;
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === "ios"); // if platform is iOS, we need to show the date picker again.

        // Adjust the date to your local timezone
        let localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);

        setDate(localDate);
        setBirthdate(localDate.toISOString().split("T")[0]); // store date in YYYY-MM-DD format
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleBirthdateBlur = () => {
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdateRegex.test(birthdate)) {
            setErrorMessageBirthdate("Birthdate must be in the format YYYY-MM-DD");
        } else {
            setErrorMessageBirthdate("");
        }
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessageEmail("Invalid email address");
        } else {
            setErrorMessageEmail("");
        }
    };

    const handleNameBlur = () => {
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
    };

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

    const handleGenderBlur = () => {
        if (!["Male", "Female"].includes(gender)) {
            setErrorMessageGender("Gender must be either Male or Female");
        } else {
            setErrorMessageGender("");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
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
                            ref={fullNameRef}
                            placeholder="Full Name"
                            onChangeText={(text) => setFullName(text)}
                            placeholderTextColor={Colors.darkText}
                            returnKeyType="next" // label the return key as "next"
                            onSubmitEditing={() => birthdateDayRef.current?.focus()}
                            blurOnSubmit={false}
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

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={{ margin: 20, fontSize: FontSize.small, marginBottom: Spacing }}>
                                Enter your birthdate:
                            </Text>
                            <TextInput
                                ref={birthdateDayRef}
                                placeholder="Day"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    handleDayChange(text);
                                    if (text.length === 2) {
                                        birthdateMonthRef.current?.focus();
                                    }
                                }}
                                value={day}
                                placeholderTextColor={Colors.darkText}
                                returnKeyType="next"
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.lightPrimary,
                                    borderRadius: Spacing,
                                    padding: Spacing * 2,
                                    marginRight: Spacing,
                                }}
                            />

                            <TextInput
                                ref={birthdateMonthRef}
                                placeholder="Month"
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    handleMonthChange(text);
                                    if (text.length === 2) {
                                        birthdateYearRef.current?.focus();
                                    }
                                }}
                                value={month}
                                placeholderTextColor={Colors.darkText}
                                returnKeyType="next"
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.lightPrimary,
                                    borderRadius: Spacing,
                                    padding: Spacing * 2,
                                    marginRight: Spacing,
                                }}
                            />

                            <TextInput
                                ref={birthdateYearRef}
                                onSubmitEditing={() => setModalVisible(true)}
                                placeholder="Year"
                                keyboardType="numeric"
                                onChangeText={handleYearChange}
                                value={year}
                                placeholderTextColor={Colors.darkText}
                                returnKeyType="done"
                                style={{
                                    flex: 1,
                                    backgroundColor: Colors.lightPrimary,
                                    borderRadius: Spacing,
                                    padding: Spacing * 2,
                                }}
                            />
                        </View>

                        {errorMessageDay || errorMessageMonth || errorMessageYear ? (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "red", marginRight: 5 }}>
                                    {errorMessageDay || errorMessageMonth || errorMessageYear}
                                </Text>
                                <Ionicons name="ios-warning-outline" size={20} color="red" />
                            </View>
                        ) : null}

                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{
                                borderWidth: 1,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                padding: Spacing * 2,
                                marginVertical: Spacing,
                                borderColor: errorMessageGender ? "red" : Colors.gray,
                            }}
                        >
                            <Text style={{ color: gender ? Colors.placeholderText : Colors.darkText }}>
                                {gender ? gender : "Select gender"}
                            </Text>
                        </TouchableOpacity>


                        {errorMessageGender ? (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "red", marginRight: 5 }}>{errorMessageGender}</Text>
                                <Ionicons name="ios-warning-outline" size={20} color="red" />
                            </View>
                        ) : null}

                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(!modalVisible)}
                        >
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                <View style={{ backgroundColor: "white", borderRadius: 20, padding: 20, alignItems: "center", width: "80%" }}>
                                    <Text style={{ fontSize: FontSize.large, fontWeight: "bold",marginBottom: Spacing, color: Colors.text }}>Select your gender</Text>

                                    <TouchableOpacity
                                        style={{
                                            position: 'absolute',
                                            top: 10, // position where you want
                                            right: 10, // position where you want
                                        }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Ionicons name="close" size={30} color={Colors.darkText} />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            padding: Spacing * 2,
                                            backgroundColor: gender === "Male" ? Colors.primary : Colors.lightPrimary,
                                            marginVertical: Spacing,
                                            borderRadius: Spacing,
                                        }}
                                        onPress={() => {
                                            setGender("Male");
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={{ color: gender === "Male" ? Colors.onPrimary : Colors.darkText, textAlign: "center" }}>
                                            Male
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            padding: Spacing * 2,
                                            backgroundColor: gender === "Female" ? Colors.primary : Colors.lightPrimary,
                                            marginVertical: Spacing,
                                            borderRadius: Spacing,
                                        }}
                                        onPress={() => {
                                            setGender("Female");
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={{ color: gender === "Female" ? Colors.onPrimary : Colors.darkText, textAlign: "center" }}>
                                            Female
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>



                        <TextInput
                            ref={emailRef}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={Colors.darkText}
                            returnKeyType="next"
                            onSubmitEditing={() => phoneNumberRef.current?.focus()}
                            blurOnSubmit={false}
                            style={{
                                borderWidth: 1,
                                backgroundColor: Colors.lightPrimary,
                                borderRadius: Spacing,
                                padding: Spacing * 2,
                                marginVertical: Spacing,
                                borderColor: errorMessageEmail ? "red" : Colors.gray,
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
                            ref={phoneNumberRef}
                            placeholder="Phone Number"
                            onChangeText={(text) => setPhoneNumber(text)}
                            placeholderTextColor={Colors.darkText}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            blurOnSubmit={false}
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
                            ref={passwordRef}
                            placeholder="Password"
                            secureTextEntry={true} // Add this line
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={Colors.darkText}
                            returnKeyType="done"
                            blurOnSubmit={true}
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
                    </View>
                    <TouchableOpacity
                        onPress={async () => {

                            setErrorMessageBirthdate('');

                            // Add the date validation here
                            if (!isValidDate(day, month, year)) {
                                setErrorMessageBirthdate('Invalid or future date');
                                return;
                            }
                            if (
                                errorMessageEmail ||
                                errorMessageName ||
                                errorMessagePhone ||
                                errorMessagePassword ||
                                errorMessageBirthdate ||
                                errorMessageGender
                            ) {
                                // Display error message or prevent sign-up process
                                return;
                            }

                            const result = await SignUpFireBase(
                                email,
                                password,
                                fullName,
                                phoneNumber,
                                formatDate(),
                                gender
                            );

                            if (result === true) {
                                // Immediately sign out after successful signup
                                await auth.signOut();

                                navigation.navigate("Login");
                            } else {
                                // Handle sign-up error
                                console.log("Sign-up failed");
                                console.log(formatDate());
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
        </KeyboardAvoidingView>
    );
}
