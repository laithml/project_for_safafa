import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import Colors from "../constants/Colors";
import Carousel from "react-native-snap-carousel";

import Footer from "./Footer";

export default function AboutUs() {
  // Placeholder data for carousel items
  const carouselItems = [
    {
      title: "رسالتنا",
      description:
          "نحن، مجلس إدارة جمعية بيت صفافا شرفات المسجلة، نعمل انطلاقا من مسؤوليتنا الاجتماعية والاقتصادية تجاه سكان بيت صفافا وشرفات. نحن ندعم مبادراتهم وحركاتهم الديمقراطية، بما يتماشى مع احتياجاتهم ورغباتهم من خلال المسؤولية المتبادلة، المشتركة الشراكة والمشاركة المجتمعية. نتعاون مع مختلف المؤسسات القائمة في المدينة من خلال بناء استراتيجيات مجتمعية لتطوير وتحسين الخدمات المحلية، لا سيما في مجالات التعليم والبنية التحتية وجوانب الحياة المختلفة. نقدم البرامج والأنشطة والفعاليات الداعمة في المجالات الثقافية والتعليمية والصحية والترفيهية والدينية والرياضية والبيئية والاجتماعية والتطوعية لمختلف الفئات العمرية، ضمن بيئة مريحة ومناسبة."    },
    {
      title: "أهدافنا",
      description:
          "تشمل أهدافنا تطوير وإنشاء القيادة الشعبية المحلية وإشراك المجتمع المحلي في تصميم وتخطيط السياسات المستقبلية للمدينة. ونحن نهدف إلى تمثيل مصالح المجتمع المحلي أمام السلطات ويكون لها تأثير على صناع القرار داخل البلدية و والجهات الأخرى ذات العلاقة، ويعتبر المجلس وإدارته وموظفوه مصدراً لمساعدة الأهالي وخدمة البلدة وسكانها في الأمور المتعلقة بالمصلحة العامة وتحسين الخدمات المحلية، ونركز على تعزيز قدرات ومهارات المجلس الموظفين على تقديم الخدمات للمجتمع المحلي بأفضل صورة ممكنة، ونعطي الأولوية لقضايا المرأة ونقدم البرامج والأنشطة المتنوعة لتمكينها وتثقيفها وتعزيز مكانتها ودورها داخل الأسرة والمجتمع، بالإضافة إلى ذلك، نولي الاهتمام كبار السن وتوفير البيئة المناسبة والمريحة لهم والأنشطة والفعاليات التي تلبي احتياجاتهم.",    },
    {
      title: "قيمنا",
      description:
          "نطمح أن يشعر كل فرد في المجتمع بأن المجلس هو بيته الثاني. ونحن نستمد قيمنا في نهج عملنا وتقديم الخدمات من ثقافة وعادات وتقاليد المجتمع المحلي.",    },
  ];
  const staffMembers = [
    {
      name: "باسمة صلاح",
      title: "مركزة قسم الجيل الذهبي",
      image: require('../assets/beit_safaf_staff/basema_salah.jpeg'),
    },
    {
      name: "بتول عثمان",
      title: "مركزة قسم النساء",
      image: require('../assets/beit_safaf_staff/batool.jpeg'),
    },
    {
      name: "فريد جابر",
      title: "مركز النشاطات الغير منهجية",
      image: require('../assets/beit_safaf_staff/Fareed.jpeg'),
    },
    {
      name: "هالة عليان",
      title: "مدققة حسابات",
      image: require('../assets/beit_safaf_staff/Hala_alyan.jpeg'),
    },

    {
      name: "ريم سرحان",
      title: "مديرة",
      image: require('../assets/beit_safaf_staff/Reem.jpeg'),
    },
    {
      name: "حنين عليان",
            title: "مركزة الشباب والثقافة ونشاط لكل ولد",
            image: require('../assets/beit_safaf_staff/Haneen.jpeg'),
          },

  ];


  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");

  const openPopup = (description) => {
    setPopupText(description);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openPopup(item.description)}
        >
          <Text style={styles.buttonText}>المزيد</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const StaffCarouselItem = ({ name, title, image }) => {
    return (
      <View style={styles.staffCarouselItem}>
        <Image source={image} style={styles.staffImage} />
        <Text style={styles.staffName}>{name}</Text>
        <Text style={styles.staffTitle}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.baseText}>
          <Text style={styles.titleText}>المركز الجماهيري بيت صفاف - شرفات</Text>
          <Carousel
            data={carouselItems}
            renderItem={renderItem}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.8}
            layout="default"
          />
          <Text style={styles.titleText}>الطاقم</Text>
          <Carousel
            data={staffMembers}
            renderItem={({ item }) => (
              <StaffCarouselItem
                name={item.name}
                title={item.title}
                image={item.image}
              />
            )}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.8}
            layout="default"
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </ScrollView>
      <Footer />

      <Modal visible={showPopup} animationType="slide" transparent={true}>
        <View style={styles.popupContainer}>
          <ScrollView contentContainerStyle={styles.popupContent}>
            <Text style={styles.popupText}>{popupText}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closePopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  baseText: {
    flex: 1,
    margin: 20,
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.gray,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  staffCarouselItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.lightPrimary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  staffImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  staffName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  staffTitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: "center",
  },
  popupContainer: {
    flex: 1,
    marginTop: 90,
    backgroundColor: "rgba(211, 211, 211,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    margin: 20,
    flexGrow: 1,
  },
  popupText: {
    fontSize: 16,
    lineHeight: 30, // Adjust the line height here
    textAlign: "center",
    margin: 16,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: 50,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
