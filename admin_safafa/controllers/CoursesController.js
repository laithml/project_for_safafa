const {doc, setDoc, deleteDoc, getDoc, updateDoc, collection, getDocs} = require("firebase/firestore");
const {db} = require("../config/Firebase");
const e = require("express");


// Get all courses
exports.getCourses = (req, res) => {
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
exports.getCourse = (req, res) => {
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
exports.createCourse = (req, res) => {
    console.log(req.body);
    //generate id for the data
    //TODO : EXITS COURSE !!!
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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
exports.updateCourse = (req, res) => {
    const refCourse = doc(db, "Courses", req.params.id);
    updateDoc(refCourse, req.body).then(() => {
        res.status(200).send({message: "Course updated successfully"});
    });
}

// Delete a course
exports.deleteCourse = (req, res) => {
    const refCourse = doc(db, "Courses", req.params.id);
    deleteDoc(refCourse).then(() => {
        res.status(200).send({message: "Course deleted successfully"});
    });
}

// Get Student's courses
exports.getStudentCourses = (req, res) => {
    console.log("getStudentCourses");
    const courseId = req.params.id;
    //get the students ids from courses students array get the id of them and go t retrieve the student data
    const refCourse = doc(db, "Courses", courseId);
    getDoc(refCourse).then((docCourse) => {
        //pass on the students array and for each element get the students data
        let studentsList = docCourse.data().students;
        let studentsDataPromises = Object.values(studentsList).map((student) => {
            //remove the spaces from the student id
            const trimmedStudent = student.trim();
            let refStudent = doc(db, "users", trimmedStudent);
            return getDoc(refStudent).then((studentsDoc) => {
                return studentsDoc.data();
            });
        });

        Promise.all(studentsDataPromises)
            .then((studentsData) => {
                res.status(200).send(studentsData);
            })
            .catch((error) => {
                res.status(500).send("Error occurred while fetching student data");
            });
    });
};

