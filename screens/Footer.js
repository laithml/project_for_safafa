import React, { useRef } from "react";
import {
    View,
    TouchableOpacity,
    Modal,
    Text,
    StyleSheet,
    Image,
    Linking,
} from "react-native";
import Colors from "../constants/Colors";
import RBSheet from "react-native-raw-bottom-sheet";

const Footer = () => {
    const handleWazeClick = () => {
        Linking.openURL("https://waze.com/ul/hsv9h95es0");
    };

    const handleYoutubeClick = () => {
        Linking.openURL("https://www.youtube.com/channel/UC44RVlWMlvptWUo0WmRoL9A");
    };

    const handleFacebookClick = () => {
        Linking.openURL("https://www.facebook.com/majlesbaitsfafa/");
    };

    const handleInstagramClick = () => {
        Linking.openURL("https://www.instagram.com/majls17");
    };

    const emailAddress = "beitzafa@matnasim.org.il";


    const handleEmailClick = () => {
        refEmailRBSheet.current.open();
    };

    const handleEmailSelection = () => {
        Linking.openURL(`mailto:${emailAddress}`);
    };

    const phoneNumbers = ["02-679-0717", "02-678-0894"];

    const refPhoneRBSheet = useRef();
    const refEmailRBSheet = useRef();

    const handlePhoneClick = () => {
        refPhoneRBSheet.current.open();
    };

    const handlePhoneSelection = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <View style={styles.footer}>
            <View style={styles.iconGroup}>
                <Text style={styles.iconGroupText}>Social Media</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        onPress={handleYoutubeClick}
                        style={styles.iconContainer}
                    >
                        <Image
                            source={require("../assets/youtube.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleFacebookClick}
                        style={styles.iconContainer}
                    >
                        <Image
                            source={require("../assets/Facebook.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleInstagramClick}
                        style={styles.iconContainer}
                    >
                        <Image
                            source={require("../assets/Instagram.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.iconGroup}>
                <Text style={styles.iconGroupText}>Location</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        onPress={handleWazeClick}
                        style={styles.iconContainer}
                    >
                        <Image
                            source={require("../assets/icon-waze.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.iconGroup}>
                <Text style={styles.iconGroupText}>Contact Info</Text>
                <View style={styles.iconRow}>
                    <TouchableOpacity
                        onPress={handleEmailClick}
                        style={styles.iconContainer}
                    >
                        <Image
                            source={require("../assets/Gmail.png")}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handlePhoneClick}
                        style={styles.iconContainer}
                    >
                        <Image source={require("../assets/call.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <RBSheet
                ref={refPhoneRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
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
                <View style={styles.sheetContainer}>
                    <Text style={styles.modalTitle}>Select Phone Number</Text>
                    {phoneNumbers.map((phoneNumber) => (
                        <TouchableOpacity
                            key={phoneNumber}
                            onPress={() => {
                                refPhoneRBSheet.current.close();
                                handlePhoneSelection(phoneNumber);
                            }}
                            style={styles.phoneNumberButton}
                        >
                            <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </RBSheet>
            <RBSheet
                ref={refEmailRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={200}
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
                <View style={styles.sheetContainer}>
                    <Text style={styles.modalTitle}>Contact via Email</Text>
                    <Text style={styles.emailText}>{emailAddress}</Text>
                    <TouchableOpacity
                        onPress={handleEmailSelection}
                        style={styles.emailButton}
                    >
                        <Text style={styles.emailButtonText}>Send an Email</Text>
                    </TouchableOpacity>
                </View>
            </RBSheet>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: 100,
        backgroundColor: Colors.primary,
    },
    iconContainer: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    iconGroup: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 20,
    },
    iconGroupText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    iconRow: {
        flexDirection: "row",
    },
    sheetContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    phoneNumberButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    phoneNumberText: {
        fontSize: 16,
    },
    emailText: {
        fontSize: 16,
        marginBottom: 20,
    },
    emailButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#ddd",
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    emailButtonText: {
        fontSize: 16,
    },
});
