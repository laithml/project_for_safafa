import { db } from "../config/firebase";
import {collection, doc, getDoc, getDocs} from "firebase/firestore";

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


export async function getUserCourses(userId) {
  let userCourses = [];

  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    const userData = userDoc.data();
    const purchasedCourseIds = userData.purchasedCourses || [];

    for(let i = 0; i < purchasedCourseIds.length; i++) {
      const courseDocRef = doc(db, "Courses", purchasedCourseIds[i]);
      const courseDoc = await getDoc(courseDocRef);

      if (courseDoc.exists()) {
        userCourses.push(courseDoc.data());
      } else {
        console.log(`No document exists for the course ID ${purchasedCourseIds[i]}`);
      }
    }
  }

  return userCourses;
}
