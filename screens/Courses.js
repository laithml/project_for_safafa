import React, { useEffect } from "react";
import { CourseCard } from "../components/courseCard";
import { FlatList, StyleSheet } from "react-native";
import { getCourses } from "../services/cousesServices";

export default function Courses({ navigation }) {
  function renderCourse({ item: course }) {
    return (
      <CourseCard
        {...course}
        onPress={() => {
          navigation.navigate("Events", { courseID: course.id });
        }}
      />
    );
  }

  const [courses, setCourses] = React.useState(getCourses);

  return (
    <FlatList
      style={styles.coursesList}
      contentContainerStyle={styles.coursesListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={courses}
      renderItem={renderCourse}
    />
  );
}

const styles = StyleSheet.create({
  coursesList: {
    backgroundColor: "#eeeeee",
  },
  coursesListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
