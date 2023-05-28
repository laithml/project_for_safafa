import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export function getCourses() {
  const refCourses = collection(db, "Courses");
  // Create an empty array to store the courses
  let coursesList = [];

  getDocs(refCourses).then((doc) => {
    doc.forEach((course) => {
      coursesList.push(course.data());
    });
  });

  return coursesList;
}
