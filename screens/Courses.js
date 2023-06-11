import React, { useEffect, useState } from "react";
import { CourseCard } from "../components/courseCard";
import { FlatList, StyleSheet } from "react-native";
import { getCourses } from "../services/cousesServices";
import Footer from "./Footer";
export default function Courses({ navigation }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  function renderCourse({ item: course }) {
    return <CourseCard {...course} />;
  }

  return (
    <>
      <FlatList
        style={styles.coursesList}
        contentContainerStyle={styles.coursesListContainer}
        keyExtractor={(item) => item.id.toString()}
        data={courses}
        renderItem={renderCourse}
      />
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  coursesList: {
    backgroundColor: "#eeeeee",
  },
  coursesListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 16,
    marginHorizontal: 16,
  },
});
