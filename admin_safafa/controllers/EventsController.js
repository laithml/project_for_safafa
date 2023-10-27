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

exports.hideEvent = (req, res) => {
    console.log("hideEvent "+ req.params.id);
    const refEvent = doc(db, "events", req.params.id);
    updateDoc(refEvent, {isHidden: true}).then(() => {
        res.status(200).send({message: "Event updated successfully"});
    });
}

exports.showEvent = (req, res) => {
    console.log("showEvent "+ req.params.id);

    const refEvent = doc(db, "events", req.params.id);
    updateDoc(refEvent, {isHidden: false}).then(() => {
        res.status(200).send({message: "Event updated successfully"});
    });
}

// Create a new event
exports.createEvent = (req,res) => {
    console.log("create event" );
    //generate id
    const id= Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const data = {
        id: id,
        name: req.body.name,
        img: req.body.img,
        capacity: req.body.capacity,
        description: req.body.description
    }
    const refEvent = doc(db, "events",id );
    console.log(req.body);
    setDoc(refEvent, data).then(() => {
        res.status(201).send({message: "Event created successfully"});
    });
}

// Update a event
exports.updateEvent = (req,res) => {
    console.log(req.body);
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

exports.getEventUsers = (req, res) => {
    console.log("getEventUsers");
    const eventId = req.params.id;
    //get the users ids from events users array get the id of them and go t retrieve the user data
    const refEvent = doc(db, "events", eventId);
    getDoc(refEvent).then((docEvent) => {
        //pass on the users array and for each element get the users data
        let usersList = docEvent.data().users;
        if (usersList == undefined || usersList.length == 0) {
            res.status(200).send([]);
        }else {
            let usersDataPromises = Object.values(usersList).map((user) => {
                //remove the spaces from the user id
                const trimmedUser = user.trim();
                let refUser = doc(db, "users", trimmedUser);
                return getDoc(refUser).then((usersDoc) => {
                    return usersDoc.data();
                });
            });

            Promise.all(usersDataPromises)
                .then((usersData) => {
                    res.status(200).send(usersData);
                })

                .catch((error) => {
                    res.status(500).send("Error occurred while fetching user data");
                });
        }
    });
};
