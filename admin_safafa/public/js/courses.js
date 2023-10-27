$(document).ready(() => {

    let coursesTable = $("#courses").DataTable({
        data: [],
        columns: [
            { data: "name" },
            { data: "image" },
            { data: "price" },
            { data: "capacity" },
            { data: "description" },
            { data: "manage" },
        ],
    });

    fetch("/courses")
        .then((res) => res.json())
        .then((data) => {
            coursesTable.clear();
            Object.values(data).forEach((course) => {
                if (course.isHidden) {
                    course.isHidden = '<button class="btn btn-warning btn-circle show" data-id="' + course.id + '"><i class="fas fa-eye-slash"></i></button>';
                } else {
                    course.isHidden = '<button class="btn btn-warning btn-circle hide" data-id="' + course.id + '"><i class="fas fa-eye"></i></button>';
                }

                let courseData = $("<tr>")
                    .append("<td>" + course.name + "</td>")
                    .append(
                        '<td><img class="rounded-circle" width="200px" height="128px" src="' +
                        course.img +
                        '"></td>'
                    )
                    .append("<td>" + course.price + "</td>")
                    .append("<td>" + course.capacity + "</td>")
                    .append("<td>" + course.description + "</td>")
                    .append(
                        $("<td>").html(
                            ` <button class="btn btn-primary btn-circle excel" data-name="${course.name}" data-id="${course.id}"><i class="fas fa-file-excel"></i></button>
                            <button class="btn btn-secondary btn-circle edit" data-id="${course.id}"><i class="fas fa-edit"></i></button>
                            ` +
                            course.isHidden +
                            `
                            <button class="btn btn-danger btn-circle delete" data-id="${course.id}"><i class="fas fa-minus-circle"></i></button></td>
                        `
                        )
                    );
                coursesTable.row.add(courseData);
            });
            coursesTable.draw();
        })
        .catch((error) => console.error(error));

    $(document).on("click", ".hide", function () {
        let courseID = $(this).data("id");

        console.log(courseID + " hide");

        fetch(`/courses/${courseID}/hide`, {
            method: "PUT", // Use the HTTP PUT method to update the resource
        })
            .then(() => {
                console.log("Course hidden successfully");
                location.reload();
            })
            .catch((error) => console.error(error));
    });

    $(document).on("click", ".show", function () {
        let courseID = $(this).data("id");

        console.log(courseID + " show");

        fetch(`/courses/${courseID}/show`, {
            method: "PUT", // Use the HTTP PUT method to update the resource
        })
            .then(() => {
                console.log("Course shown successfully");
                location.reload();
            })
            .catch((error) => console.error(error));
    });




$(document).on("click", ".excel", function () {
        let courseId = $(this).data("id");
        let courseName = $(this).data("name");
        fetch("/students/" + courseId)
            .then((res) => res.json())
            .then((data) => {
                // Generate the Excel file and download it
                generateExcelFile(courseName,data);
            })
            .catch((error) => console.error(error));
    });

    function generateExcelFile(courseName,data) {
        // Remove the "id" , "purchasedCourses" and "passwords" properties from each student object
        const filteredData = data.map(({ id, purchasedCourses,password, ...student }) => student);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = courseName+"_students.xlsx";
        link.click();
    }


    $(document).on("click", ".edit", function () {
        let id = $(this).data("id");
        // Populate the modal form with the existing course details
        fetch(`/courses/${id}`)
            .then((res) => res.json())
            .then((course) => {
                // Fill the modal form fields with the course details
                $("#courseName").val(course.name);
                $("#courseImage").val(course.img);
                $("#coursePrice").val(course.price);
                $("#courseLimit").val(course.limit);
                $("#courseDescription").val(course.description);
                $("#courseLimit").val(course.ageLimit);
                $("#courseCapacity").val(course.capacity);
                //add the course id to the hidden input field
                $("#courseId").val(course.id);

                // Show the modal
                $("#editCourseModal").modal("show");
            })
            .catch((error) => console.error(error));
    });

    $("#saveChangesBtn").click(function () {
        let courseId = $("#courseId").val();
        let courseName = $("#courseName").val();
        let courseImage = $("#courseImage").val();
        let coursePrice = $("#coursePrice").val();
        let courseLimit = $("#courseLimit").val();
        let courseCapacity = $("#courseCapacity").val();
        let courseDescription = $("#courseDescription").val();

        // Create an object with the updated course details
        let updatedCourse = {
            name: courseName,
            img: courseImage,
            price: coursePrice,
            ageLimit: courseLimit,
            capacity: courseCapacity,
            description: courseDescription,
        };

        // Make an AJAX request to update the course details
        $.ajax({
            url: `/courses/${courseId}`,
            type: "PUT",
            data: JSON.stringify(updatedCourse),
            contentType: "application/json",
        })
            .done(() => {
                // Handle the success response or update the UI accordingly
                console.log("Course details updated:");
                // Close the modal
                $("#editCourseModal").modal("hide");
                window.location.reload();
            })
            .fail((error) => {
                // Handle the error response or display an error message
                console.error("Error updating course details:", error);
            });
    });
});

$(document).on("click", ".delete", function () {
    let courseId = $(this).data("id");

    // Show the delete modal
    $("#deleteCourseModal").modal("show");

    // Handle the delete button click inside the modal
    $("#confirmDeleteBtn").click(function () {
        // Make an AJAX request to delete the course
        $.ajax({
            url: `/courses/${courseId}`,
            type: "DELETE",
            success: function () {
                // Handle the success response or update the UI accordingly
                console.log("Course deleted successfully");
                // Close the delete modal
                $("#deleteCourseModal").modal("hide");
                // Reload the page to reflect the updated course list
                window.location.reload();
            },
            error: function (error) {
                // Handle the error response or display an error message
                console.error("Error deleting course:", error);
                // ...
            }
        });
    });
});


// Get the modal element
var modal = document.getElementById("createCourseModal");

// Get the button that opens the modal
var btn = document.getElementById("createCourseBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
$("#createCourseModal").modal("show");

}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve the input values
    let courseName = document.getElementById("newCourseName").value;
    let courseImage = document.getElementById("newCourseImage").value;
    let coursePrice = document.getElementById("newCoursePrice").value;
    let courseLimit = document.getElementById("newCourseAge").value;
    let courseCapacity = document.getElementById("newCourseCapacity").value;
    let courseDescription = document.getElementById("newCourseDescription").value;

    // Create an object with the course details
    var courseData = {
        name: courseName,
        img: courseImage,
        price: coursePrice,
        ageLimit: courseLimit,
        capacity: courseCapacity,
        description: courseDescription
    };
    fetch("/courses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(courseData)
    })
        .then(function (response) {
            if (response.ok) {

                // Hide the modal
                var modal = document.getElementById("createCourseModal");
                modal.style.display = "none";
                window.location.reload();
                // Do something with the response from the server if needed
                console.log(response.json());
            }
        })
        .catch(function (error) {
            console.error("Error:", error);
        });
});


