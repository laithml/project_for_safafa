import React, { useContext, useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { getDoc, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../config/firebase";
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
  const [course, setCourse] = useState(0);

  useEffect(() => {
    (async () => {
      const courses = await getCourses();
      const course = courses.find((course) => course.id === courseId);
      if (course) {
        setCourseName(course.name);
        setCoursePrice(course.price); // assuming the price field in Firestore is named "price"
        setCourse(course);
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
  const [cvv, setCvv] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const refRBSheet = useRef();

  const handlePurchase = () => {
    if (!id || !nameOnCard || !cvv || !cardNumber || !month || !year) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate an asynchronous purchase process
    setTimeout(() => {
      setIsLoading(false);
      const docRef = doc(db, "Courses", course.id);
      const studentsArrayUnion = arrayUnion(user.id);

      updateDoc(docRef, { students: studentsArrayUnion })
        .then(() => {
          console.log(
            "A new student has been added to the course successfully"
          );
        })
        .catch((error) => {
          console.log("Error adding student to the course:", error);
        });
      alert("Payment successful");
      navigation.navigate("Courses");
    }, 2000);
  };

  const handleMonthChange = (value) => {
    setMonth(value);
  };

  const handleYearChange = (value) => {
    setYear(value);
  };

  const handleDonePress = () => {
    setIsDateSelected(true);
    setMonth(month); // Set the selected month
    setYear(year); // Set the selected year
    refRBSheet.current.close();
  };

  const currentYear = new Date().getFullYear();

  const monthItems = Array.from({ length: 12 }, (_, i) => ({
    label: `${String(i + 1).padStart(2, "0")}`,
    value: `${String(i + 1).padStart(2, "0")}`,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: Spacing,
            }}
          >
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
                marginLeft: Spacing * 2,
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
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Card Number"
            onChangeText={(text) => setCardNumber(text)}
            style={componentStyles.input}
            keyboardType="numeric"
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => refRBSheet.current.open()}
              style={componentStyles.dateButton}
            >
              <Text style={componentStyles.dateButtonText}>
                Expiration Date:{" "}
                {isDateSelected ? `${month}/${year}` : "Select"}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="CVV"
              onChangeText={(text) => setCvv(text)}
              style={componentStyles.cvvInput}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={handlePurchase}
            style={componentStyles.purchaseButton}
            disabled={isLoading} // Disable the button when loading
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.onPrimary} />
            ) : (
              <Text style={componentStyles.buttonText}>Purchase</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={componentStyles.cancelButton}
          >
            <Text style={componentStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

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
              value={month} // Add this line to set the selected value
            />

            <RNPickerSelect
              onValueChange={handleYearChange}
              items={yearItems}
              style={componentStyles.pickerInput}
              placeholder={{ label: "Year", value: null }}
              value={year} // Add this line to set the selected value
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
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: FontSize.large,
    marginBottom: Spacing,
    color: Colors.onPrimary,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
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
      color: Colors.gray,
    },
    inputAndroid: {
      fontSize: FontSize.medium,
      fontWeight: "bold",
      color: Colors.gray,
    },
    placeholder: {
      fontSize: FontSize.medium,
      fontWeight: "bold",
      color: Colors.gray,
    },
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
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    marginRight: Spacing,
  },
  cancelButton: {
    padding: Spacing * 2,
    backgroundColor: Colors.gray,
    marginVertical: Spacing * 3,
    borderRadius: Spacing,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    marginLeft: Spacing,
  },
  buttonText: {
    textAlign: "center",

    color: Colors.text,
    fontSize: FontSize.medium,
    fontWeight: "bold",
  },
  doneButton: {
    width: "80%",
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 2,
    backgroundColor: Colors.onPrimary,
    borderRadius: Spacing,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing * 2,
  },
  doneButtonText: {
    fontSize: FontSize.large,
    fontWeight: "bold",
    color: Colors.primary,
  },
});
