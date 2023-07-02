$(document).ready(() => {

//jj
    let coursesTable = $("#courses").DataTable({
        data: [],
        columns: [
            {data: "id"},
            {data: "name"},
            {data: "image"},
            {data: "price"},
            {data: "description"},
            {data: "manage"},
        ],
    });

    fetch("/courses")
        .then((res) => res.json())
        .then((data) => {
            coursesTable.clear();
            Object.values(data).forEach((course) => {
                let courseData = $("<tr>")
                    .append("<td>" + course.id + "</td>")
                    .append("<td>" + course.name + "</td>")
                    .append(
                        '<td><img class="rounded-circle" width="200px" height="128px" src="' +
                        course.img +
                        '"></td>'
                    )
                    .append("<td>" + course.price + "</td>")
                    .append("<td>" + course.description + "</td>")
                    .append(
                        $("<td>").html(

                            ` <button class="btn btn-primary btn-circle excel" data-id="${course.id}"><i class="fas fa-file-excel"></i></button>
               <button class="btn btn-success btn-circle list" data-id="${course.id}"><i class="fas fa-list"></i></button>
               <button class="btn btn-secondary btn-circle edit" data-id="${course.id}"><i class="fas fa-edit"></i></button>
               <button class="btn btn-danger btn-circle delete" data-id="${course.id}"><i class="fas fa-minus-circle"></i></button>
       `
                        )
                    );
                coursesTable.row.add(courseData);
            });
            coursesTable.draw();
        })
        .catch((error) => console.error(error));

    $(document).on("click", ".excel", function () {
        let courseId = $(this).data("id");
        fetch("/students/" + courseId)
            .then((res) => res.json())
            .then((data) => {
                // Generate the Excel file and download it
                generateExcelFile(data);
            })
            .catch((error) => console.error(error));
    });

    function generateExcelFile(data) {
        // Remove the "id" and "purchasedCourses" properties from each student object
        const filteredData = data.map(({ id, purchasedCourses,password, ...student }) => student);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "students.xlsx";
        link.click();
    }




    $(document).on("click", ".list", function () {
        let id = $(this).data("id");
        fetch("/students/" + id)
            .then((res) => res.json())
            .then((data) => {
                // Create the HTML content for the student details
                let tableContent = `
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
                data.forEach((student) => {
                    tableContent += `
                    <tr>
                        <td>${student.fullName}</td>
                        <td>${student.email}</td>
                        <td>${student.phoneNumber}</td>
                    </tr>
                `;
                });
                tableContent += `
                    </tbody>
                </table>
            `;

                // Create the modal pop-up window
                let modalHtml = `
                <div id="studentModal" class="modal" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">Student Details</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ${tableContent}
                            </div>
                            <div class="modal-footer"> <!-- Added modal footer -->
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Dismiss</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
                // Append the modal HTML to the body
                $("body").append(modalHtml);

                // Show the modal
                $("#studentModal").modal("show");

                // Remove the modal from the DOM when it's hidden
                $("#studentModal").on("hidden.bs.modal", function () {
                    $(this).remove();
                });
            })
            .catch((error) => console.error(error));
    });


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
        let courseLimit = $("#newCourseAge").val();
        let courseDescription = $("#courseDescription").val();

        // Create an object with the updated course details
        let updatedCourse = {
            name: courseName,
            img: courseImage,
            price: coursePrice,
            limit: courseLimit,
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
                // ...
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
    var courseName = document.getElementById("newCourseName").value;
    var courseImage = document.getElementById("newCourseImage").value;
    var coursePrice = document.getElementById("newCoursePrice").value;
    var courseDescription = document.getElementById("newCourseDescription").value;

    // Create an object with the course details
    var courseData = {
        name: courseName,
        img: courseImage,
        price: coursePrice,
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


