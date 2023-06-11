import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function getEvents() {
  const refCourses = collection(db, "events");
  // Create an empty array to store the courses
  let eventList = [];

  await getDocs(refCourses).then((doc) => {
    doc.forEach((event) => {
      eventList.push(event.data());
    });
  });

  return eventList;
}
