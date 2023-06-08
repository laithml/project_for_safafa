//made by ghoshehh
import React, {useState} from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions, Linking, TouchableOpacity, Modal,
} from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";
import Footer from "./Footer";



export default function AboutUs() {

  return (
    <ScrollView>
      <View style={styles.baseText}>
        <Text style={styles.titleText}>تعرف علينا</Text>
        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "bold" }}>
          المجلس الاداري بيت صفافا شرفات
        </Text>
        <Image
          source={{
            uri: "https://images.jpost.com/image/upload/f_auto,fl_lossy/c_fill,g_faces:center,h_428,w_640/514217",
          }}
          style={{ height: 200, width: 350, marginTop: 20 }}
        />
        <ScrollView horizontal={true}>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 50,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 50,
              marginLeft: 18,
              alignItems: "center", // center horizontally
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text style={styles.Header}>رؤيتنا</Text>
            <Text>
              نحن المجلس الإداري بيت صفافا شرفات جمعية مسجلة نعمل من منطلق
              مسؤوليتنا الاجتماعية والاقتصادية تجاه الأهالي في بيت صفافا وشرفات
              بدعم مبادراتهم وحراكهم الديموقراطي وبما يتوافق مع احتياجاتهم
              ورغباتهم على أساس المسؤولية التبادلية والمشتركة والشراكة المجتمعية
              معهم ومع مختلف المؤسسات القائمة في البلدة من خلال بناء استراتيجيات
              مجتمعية لتطوير ولتحسين الخدمات المحلية وبالذات رفع مستوى التربية
              والتعليم والبنية التحتية ومجالات الحياة بمختلف مناحيها وتوفير
              البرامج والأنشطة والفعاليات الداعمة من ثقافية وتعليمية وصحية
              وترفيهية ودينية ورياضية وبيئية واجتماعية وتطوعية وغيرها لمختلف
              الفئات العمرية في بيئة مريحة ومناسبة
            </Text>
          </View>

          <View
            styles={{ backgroundColor: "white", height: 300, width: 500 }}
          ></View>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 50,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 50,
              marginLeft: 18,
              alignItems: "center", // center horizontally
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text style={styles.Header}>أهدافنا</Text>
            <Text>
              أهدافنا تطوير وخلق قيادة جماهيرية محلية ومشاركة الجمهور المحلي
              بتصميم وتخطيط سياسة البلدة المستقبلية. تمثيل مصالح الجمهور المحلي
              أمام السلطات والتأثير على متخذي القرار بالبلدية والسلطات المختلفة.
              المجلس وادارته وموظفيه بمثابة العنوان لمساعدة الأهالي وخدمة البلدة
              وجمهورها بكل ما يتعلق بالمصلحة العامة وتحسين الخدمات المحلية تطوير
              وتنمية قدرات ومهارات موظفي المجلس لتقديم الخدمات للمجتمع المحلي
              على أكمل وجه الاهتمام بالمرأة وتقديم البرامج والأنشطة المختلفة
              لتمكينها وتوعيتها وتعزيز مكانتها ودورها في الأسرة والمجتمع
              الاهتمام بالجيل الذهبي(المسنين) وتوفير بيئة مناسبة ومريحة وأنشطة
              وفعاليات
            </Text>
          </View>
          <View
            styles={{ backgroundColor: "white", height: 300, width: 500 }}
          ></View>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 50,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 50,
              marginLeft: 18,
              alignItems: "center", // center horizontally
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text style={styles.Header}>قيمنا</Text>
            <Text>
              نحن نصبو لأن يشعر كل فرد من أهالي البلدة بالمجلس كبيته الثاني
              ونستمد قيمنا في أسلوب عملنا وتقديم خدماتنا من ثقافة المجتمع المحلي
              وعاداته وتقاليده
            </Text>
          </View>
        </ScrollView>
        <ScrollView horizontal={true}>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 30,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 25,
              marginLeft: 18,
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text style={[styles.Header, { fontSize: 30 }]}>اتصل بنا</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                margin: 20,
              }}
            >
              <Image
                source={{
                  uri: "https://assets.stickpng.com/thumbs/5a4525b2546ddca7e1fcbc82.png",
                }}
                style={{ height: 70, width: 70, paddingTop: 50 }}
              />
              <Text style={{ fontSize: 30, paddingLeft: 20 }}>
                02-679-0717{"\n"}02-678-0894
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Image
                source={{
                  uri: "https://assets.stickpng.com/images/584856b4e0bb315b0f7675ac.png",
                }}
                style={{ height: 100, width: 120 }}
              />
              <Text style={{ fontSize: 20, paddingTop: 20 }}>
                beitzafa{"\n"}@matnasim.org.il
              </Text>
            </View>
          </View>
          <View
            style={{
              borderColor: Colors.primary,
              borderWidth: 10, // add border width
              backgroundColor: "beige",
              marginTop: 30,
              height: 300,
              width: Dimensions.get("window").width - 80,
              marginRight: 25,
              marginLeft: 18,
              paddingTop: 10, // add padding to the top to align the text to the top of the view
            }}
          >
            <Text style={[styles.Header, { fontSize: 30 }]}>اتصل بنا</Text>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                margin: 10,
              }}
            >
              <Image
                source={{
                  uri: "data:image/png;base64,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",
                }}
                style={{ height: 100, width: 100 }}
              />
              <Text style={{ fontSize: 20, marginTop: 20 }}>
                المجلس الإداري بيت صفافا - شرفات شارع التوحيد 91 بجانب ملعب كرة
                القدم ومسجد الرحمن
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
        <Footer />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  baseText: {
    flex: 0,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  Header: {
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
  },
});
