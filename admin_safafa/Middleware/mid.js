const {auth} = require("../config/Firebase");
const {doc, getDoc} = require("firebase/firestore");
const {db} = require("../config/Firebase");
function requireAuth(req, res, next) {
    const user = auth.currentUser;
    if (user) {
        // User is logged in, proceed to the next middleware/route handler
        //check if the user is admin

        const refUser = doc(db, "users", user.uid);
        getDoc(refUser).then((doc) => {
            if (doc.exists()) {
                if (doc.data().role == "admin") {
                    next();
                }else{
                    res.send(
                        '<script>alert("You do not have admin privileges."); window.location.href="/login";</script>'
                    );                }
            }
        });

    } else {
        // User is not logged in, redirect to the login page or return an error
        res.redirect("/login");
    }
}

module.exports = requireAuth;
