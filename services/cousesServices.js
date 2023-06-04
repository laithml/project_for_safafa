import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getCourses() {
  const refCourses = collection(db, "Courses");
  // Create an empty array to store the courses
  let coursesList = [];

  await getDocs(refCourses).then((doc) => {
    doc.forEach((course) => {
      coursesList.push(course.data());
    });
  });

  return coursesList;
}
