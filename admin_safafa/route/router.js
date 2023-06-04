const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const CourseController = require("../controllers/CoursesController");
const EventController = require("../controllers/EventsController");
const requireAuth = require("../Middleware/mid");

router.get("/", HomeController.Main);

router.get("/login", HomeController.login);

router.get("/events", HomeController.events );


router.get("/not-found", HomeController.notFound);

router.get("/courses", CourseController.getCourses);

router.get("/courses/:id", CourseController.getCourse);

router.post("/courses", CourseController.createCourse);

router.put("/courses/:id", CourseController.updateCourse);

router.delete("/courses/:id", CourseController.deleteCourse);

router.get("/students/:id", CourseController.getStudentCourses);

router.get("/event", EventController.getEvents );

router.get("*", (req, res) => {
    res.redirect("/not-found");
});

module.exports = router;
