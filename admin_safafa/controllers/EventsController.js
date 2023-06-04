const {doc, setDoc, deleteDoc, getDoc, updateDoc, collection, getDocs} = require("firebase/firestore");
const {db} = require("../config/Firebase");

// Get all events
exports.getEvents = (req,res) => {
    const refEvents = collection(db, "events");
    // Create an empty array to store the courses
    let eventList = [];

    getDocs(refEvents).then((doc) => {
        doc.forEach((event) => {
            eventList.push(event.data());
        });
        res.status(200).send(eventList);
    });
}

// Get a single event
exports.getEvent = (req,res) => {

    const refEvent = doc(db, "events", req.params.id);
    getDoc(refEvent).then((doc) => {
        if (doc.exists()) {
            res.status(200).send(doc.data());
        } else {
            res.status(404).send({message: "Event not found"});
        }
    });

}

// Create a new event
exports.createEvent = (req,res) => {
    const refEvent = doc(db, "events", req.body.id);
    setDoc(refEvent, req.body).then(() => {
        res.status(201).send({message: "Event created successfully"});
    });
}

// Update a event
exports.updateEvent = (req,res) => {
    const refEvent = doc(db, "events", req.params.id)
    updateDoc(refEvent, req.body).then(() => {
        res.status(200).send("Course updated successfully");
    });
}

// Delete a event
exports.deleteEvent = (req,res) => {
    const refEvent = doc(db, "events", req.params.id);
    deleteDoc(refEvent).then(() => {
        res.status(200).send({message: "Event deleted successfully"});
    });
}

