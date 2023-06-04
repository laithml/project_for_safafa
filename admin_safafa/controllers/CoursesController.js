const {doc, setDoc, deleteDoc, getDoc, updateDoc, collection, getDocs} = require("firebase/firestore");
const {db} = require("../config/Firebase");
const e = require("express");


// Get all courses
exports.getCourses = (req,res) => {
    const refCourses = collection(db, "Courses");
    // Create an empty array to store the courses
    let coursesList = [];

    getDocs(refCourses).then((doc) => {
        doc.forEach((course) => {
            coursesList.push(course.data());
        });
        res.status(200).send(coursesList);
    });
}



// Get a single course
exports.getCourse = (req,res) => {
    const refCourse = doc(db, "Courses", req.params.id);
    getDoc(refCourse).then((doc) => {
        if (doc.exists()) {
            res.status(200).send(doc.data());
        } else {
            res.status(404).send({message: "Course not found"});
        }
    });
}

// Create a new course
exports.createCourse = (req,res) => {
    console.log(req.body);
    //generate id for the data
    //TODO : EXITS COURSE !!!
    const id= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const data = {
        id: id,
        name: req.body.name,
        img: req.body.img,
        price: req.body.price,
        description: req.body.description,
    }
    console.log(data);
    const refCourse = doc(db, "Courses", data.id);
    setDoc(refCourse, data).then(() => {
        res.status(201).send({message: "Course created successfully"});
    });
}

// Update a course
exports.updateCourse = (req,res) => {
    const refCourse = doc(db, "Courses", req.params.id);
    updateDoc(refCourse, req.body).then(() => {
        res.status(200).send({message: "Course updated successfully"});
    });
}

// Delete a course
exports.deleteCourse = (req,res) => {
    const refCourse = doc(db, "Courses", req.params.id);
    deleteDoc(refCourse).then(() => {
        res.status(200).send({message: "Course deleted successfully"});
    });
}

// Get Student's courses
exports.getStudentCourses = (req,res) => {
    const refStudent = doc(db, "Students", req.params.id);
    getDoc(refStudent).then((doc) => {
        if (doc.exists()) {
            res.status(200).send(doc.data().courses);
        } else {
            res.status(404).send({message: "Student not found"});
        }
    });
}