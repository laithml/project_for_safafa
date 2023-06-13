import React, { useContext, useEffect, useState, useRef } from "react";

import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    StyleSheet, Platform,
} from "react-native";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import { UserContext } from "../context/UserContext";
import RBSheet from "react-native-raw-bottom-sheet";
import RNPickerSelect from "react-native-picker-select";
import { getCourses } from "../services/cousesServices";

const windowWidth = Dimensions.get("window").width;

export default function Payment({ route, navigation }) {
    const { user } = useContext(UserContext);

    const [courseName, setCourseName] = useState("");
    const [coursePrice, setCoursePrice] = useState(0);

    useEffect(() => {
        (async () => {
            const courses = await getCourses();
            const course = courses.find(course => course.id === courseId);
            if (course) {
                setCourseName(course.name);
                setCoursePrice(course.price); // assuming the price field in Firestore is named "price"
            }
        })();
    }, [courseId]);

    useEffect(() => {
        if (!user) {
            navigation.replace("Login");
        }
    }, [user]);

    const { courseId } = route.params;
    const [nameOnCard, setNameOnCard] = useState("");
    const [id, setId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [cvv, setCvv] = useState("");
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const refRBSheet = useRef();

    const handlePurchase = () => {
        // Process the payment here
    };

    const handleMonthChange = (value) => {
        setMonth(value);
    };

    const handleYearChange = (value) => {
        setYear(value);
    };

    const handleDonePress = () => {
        setIsDateSelected(true);
        refRBSheet.current.close();
    };

    const currentYear = new Date().getFullYear();

    const monthItems = Array.from({ length: 12 }, (_, i) => ({
        label: `${String(i + 1).padStart(2, '0')}`,
        value: `${String(i + 1).padStart(2, '0')}`,
    }));


    const yearItems = Array.from({ length: 50 }, (_, i) => ({
        label: `${currentYear + i}`,
        value: `${currentYear + i}`,
    }));

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
                        Payment Details
                    </Text>
                    <Text
                        style={{
                            fontSize: FontSize.medium,
                            maxWidth: "60%",
                            textAlign: "center",
                        }}
                    >
                        Please enter your payment details to complete the purchase of the
                        course.
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: Spacing }}>
                        <Text
                            style={{
                                fontSize: FontSize.medium,
                                fontWeight: "bold",
                            }}
                        >
                            Course: {courseName}
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.medium,
                                fontWeight: "bold",
                                marginLeft: Spacing * 2,  // Increase the space here
                            }}
                        >
                            Price: ₪{coursePrice}
                        </Text>
                    </View>

                </View>

                <View style={{ marginVertical: Spacing }}>
                    <TextInput
                        placeholder="Name On Card"
                        onChangeText={(text) => setNameOnCard(text)}
                        style={componentStyles.input}
                    />
                    <TextInput
                        placeholder="ID"
                        onChangeText={(text) => setId(text)}
                        style={componentStyles.input}
                    />
                    <TextInput
                        placeholder="Card Number"
                        onChangeText={(text) => setCardNumber(text)}
                        style={componentStyles.input}
                    />
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity
                            style={componentStyles.dateButton}
                            onPress={() => refRBSheet.current.open()}
                        >
                            <Text style={componentStyles.dateButtonText}>
                                {isDateSelected ? `${month}/${year}` : "Expiration Date"}
                            </Text>
                        </TouchableOpacity>
                        <RBSheet
                            ref={refRBSheet}
                            closeOnDragDown={true}
                            height={300}
                            openDuration={250}
                            customStyles={{
                                wrapper: {
                                    backgroundColor: "transparent",
                                },
                                container: {
                                    backgroundColor: Colors.primary,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                },
                            }}
                        >
                            <View style={componentStyles.sheetContainer}>
                                <Text
                                    style={[
                                        componentStyles.modalTitle,
                                        { fontSize: FontSize.large, textAlign: "center" },
                                    ]}
                                >
                                    Select Expiry Date
                                </Text>
                                <View style={componentStyles.pickerContainer}>
                                    <RNPickerSelect
                                        onValueChange={handleMonthChange}
                                        items={monthItems}
                                        style={componentStyles.pickerInput}
                                        placeholder={{ label: "Month", value: null }}
                                    />
                                    <RNPickerSelect
                                        onValueChange={handleYearChange}
                                        items={yearItems}
                                        style={componentStyles.pickerInput}
                                        placeholder={{ label: "Year", value: null }}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={handleDonePress}
                                    style={componentStyles.doneButton}
                                >
                                    <Text style={componentStyles.doneButtonText}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </RBSheet>
                        <TextInput
                            placeholder="CVV"
                            onChangeText={(text) => setCvv(text)}
                            style={componentStyles.cvvInput}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={handlePurchase}
                        style={componentStyles.purchaseButton}
                    >
                        <Text style={componentStyles.buttonText}>Purchase</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={componentStyles.cancelButton}
                    >
                        <Text style={componentStyles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const componentStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        backgroundColor: Colors.lightPrimary,
        borderRadius: Spacing,
        padding: Spacing * 2,
        marginVertical: Spacing,
        borderColor: Colors.gray,
    },
    dateButton: {
        borderWidth: 1,
        backgroundColor: Colors.lightPrimary,
        borderRadius: Spacing,
        padding: Spacing * 2,
        marginVertical: Spacing,
        borderColor: Colors.gray,
        width: windowWidth * 0.6,
    },
    dateButtonText: {
        color: Colors.darkText,
        fontSize: FontSize.medium,
    },
    sheetContainer: {
        flex: 1,
        padding: Spacing,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: FontSize.large,
        marginBottom: Spacing,
        color: Colors.onPrimary,
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: Spacing,
    },
    pickerInput: {
        viewContainer: {
            flex: 1,
            marginHorizontal: Spacing,
            borderWidth: 1,
            borderColor: Colors.gray,
            borderRadius: Spacing,
            paddingVertical: Spacing,
            paddingHorizontal: Spacing * 2,
        },
        inputIOS: {
            fontSize: FontSize.medium,
            fontWeight: "bold",
            color: Colors.gray, // change the color to white
        },
        inputAndroid: {
            fontSize: FontSize.medium,
            fontWeight: "bold",
            color: Colors.gray, // change the color to white
        },
        placeholder: {
            fontSize: FontSize.medium,
            fontWeight: "bold",
            color: Colors.gray,
        },
    },
    doneButton: {
        width: '80%',
        paddingVertical: Spacing,
        paddingHorizontal: Spacing * 2,
        backgroundColor: Colors.onPrimary,
        borderRadius: Spacing,
        alignItems: "center",
        justifyContent: 'center',
        marginTop: Spacing * 2,
    },
    doneButtonText: {
        fontSize: FontSize.large,
        fontWeight: "bold",
        color: Colors.primary,
    },
    cvvInput: {
        borderWidth: 1,
        backgroundColor: Colors.lightPrimary,
        borderRadius: Spacing,
        padding: Spacing * 2,
        marginVertical: Spacing,
        borderColor: Colors.gray,
        width: windowWidth * 0.3,
    },
    purchaseButton: {
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
        width: '45%',
    },
    cancelButton: {
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
        width: '45%',
    },
    buttonText: {
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.large,
    },
});
