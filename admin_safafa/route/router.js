const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeController");
const CourseController = require("../controllers/CoursesController");
const EventController = require("../controllers/EventsController");
const requireAuth = require("../Middleware/mid");

router.get("/",requireAuth ,HomeController.Main);

router.get("/login", HomeController.login);

router.get("/events",requireAuth ,HomeController.events );

router.get("/not-found", HomeController.notFound);


//----------------------------------------------------------------------
router.get("/courses",requireAuth, CourseController.getCourses);

router.get("/courses/:id",requireAuth, CourseController.getCourse);

router.post("/courses",requireAuth, CourseController.createCourse);

router.put("/courses/:id",requireAuth, CourseController.updateCourse);

router.delete("/courses/:id",requireAuth, CourseController.deleteCourse);

router.get("/students/:id",requireAuth, CourseController.getStudentCourses);

router.get("/event",requireAuth, EventController.getEvents );

router.post("/event",requireAuth, EventController.createEvent );

router.get("/event/:id",requireAuth, EventController.getEvent );

router.get("/event/:id/users",requireAuth, EventController.getEventUsers );

router.put("/event/:id",requireAuth, EventController.updateEvent);

router.delete("/event/:id",requireAuth, EventController.deleteEvent);





router.get("*", (req, res) => {
    res.redirect("/not-found");
});

module.exports = router;
