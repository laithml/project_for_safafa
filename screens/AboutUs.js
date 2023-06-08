import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
} from "react-native";
import Colors from "../constants/Colors";
import Footer from "./Footer";

export default function AboutUs() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.baseText}>
                    <Text style={styles.titleText}>تعرف علينا</Text>
                    <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "bold", textAlign: "right" }}>
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
                                borderWidth: 10,
                                backgroundColor: "beige",
                                marginTop: 50,
                                height: 300,
                                width: Dimensions.get("window").width - 80,
                                marginRight: 50,
                                marginLeft: 18,
                                alignItems: "center",
                                paddingTop: 10,
                            }}
                        >
                            <Text style={styles.Header}>رؤيتنا</Text>
                            <Text style={{ textAlign: "right" }}>
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

                        <View styles={{ backgroundColor: "white", height: 300, width: 500 }}></View>
                        <View
                            style={{
                                borderColor: Colors.primary,
                                borderWidth: 10,
                                backgroundColor: "beige",
                                marginTop: 50,
                                height: 300,
                                width: Dimensions.get("window").width - 80,
                                marginRight: 50,
                                marginLeft: 18,
                                alignItems: "center",
                                paddingTop: 10,
                            }}
                        >
                            <Text style={styles.Header}>أهدافنا</Text>
                            <Text style={{ textAlign: "right" }}>
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
                        <View styles={{ backgroundColor: "white", height: 300, width: 500 }}></View>
                        <View
                            style={{
                                borderColor: Colors.primary,
                                borderWidth: 10,
                                backgroundColor: "beige",
                                marginTop: 50,
                                height: 300,
                                width: Dimensions.get("window").width - 80,
                                marginRight: 50,
                                marginLeft: 18,
                                alignItems: "center",
                                paddingTop: 10,
                            }}
                        >
                            <Text style={styles.Header}>قيمنا</Text>
                            <Text style={{ textAlign: "right" }}>
                                نحن نصبو لأن يشعر كل فرد من أهالي البلدة بالمجلس كبيته الثاني
                                ونستمد قيمنا في أسلوب عملنا وتقديم خدماتنا من ثقافة المجتمع المحلي
                                وعاداته وتقاليده
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
            <Footer />
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
