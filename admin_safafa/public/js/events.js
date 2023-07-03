$(document).ready(() => {

    let eventTable = $("#events").DataTable({
        data: [],
        columns: [ {data: "name"}, {data: "image"},{data:"capacity"} ,{data: "desc"},{data: "manage"}]
    });

    fetch("/event").then((res) => {
        res.json().then((data) => {
            eventTable.clear();
            Object.values(data).forEach((events) => {
                let eventsData = $('<tr>').append('<td>' + events.name + '</td>').
                append('<td>' + '<img class="rounded-circle" width="200px" height="128px" src=' + events.img + '>' + '</td>').
                append('<td>' + events.capacity + '</td>').
                append('<td>' + events.description + '</td>').append($('<td>').html(`
                                              <button class="btn btn-primary btn-circle excel" data-name="${events.name}" data-id="${events.id}"><i class="fas fa-file-excel"></i></button>
               <button class="btn btn-success btn-circle list" data-id="${events.id}"><i class="fas fa-list"></i></button>
               <button class="btn btn-secondary btn-circle edit" data-id="${events.id}"><i class="fas fa-edit"></i></button>
               <button class="btn btn-danger btn-circle delete" data-id="${events.id}"><i class="fas fa-minus-circle"></i></button>`));
                eventTable.row.add(eventsData);
            });
            eventTable.draw();
        }).catch(error => console.error(error))
    })
});

$(document).on("click", ".edit", function () {
    // Get the event details from the current event item
    let eventId = $(this).data("id")
    // Fetch the event details from the server
    fetch(`/event/${eventId}`)
        .then((res) => res.json())
        .then((event) => {
            // Fill the modal form fields with the event details
            $("#eventId").val(eventId);
            $("#eventName").val(event.name);
            $("#eventImg").val(event.img);
            $("#eventDescription").val(event.description);
            $("#eventCapacity").val(event.capacity);
            // Show the edit event modal
            $("#editEventModal").modal("show");
        })
        .catch((error) => console.error(error));
});

$("#saveChangesBtn").click(function () {
    // Get the updated event details from the form
    console.log("save changes");
    let eventId = $("#eventId").val();
    let eventName = $("#eventName").val();
    let eventImg = $("#eventImg").val();
    let eventCapacity= $("#eventCapacity").val();
    let eventDescripiton = $("#eventDescription").val();

    let event = {
        name: eventName,
        img: eventImg,
        capacity: eventCapacity,
        description: eventDescripiton
    }
    console.log(event);


    // Save the changes to the database using an AJAX request
    $.ajax({
        url: "/event/" + eventId,
        method: "PUT",
        data: JSON.stringify(event),
        contentType: "application/json",
        success: function (response) {
            console.log("Event updated successfully!");
            $("#editEventModal").modal("hide");
            window.location.reload();
        },
        error: function (error) {
            console.log("Error updating event:", error);
        }
    });
});


$(document).on("click", ".delete", function () {
    let eventId = $(this).data("id");

    // Show the delete modal
    $("#deleteEventModal").modal("show");

    // Handle the delete button click inside the modal
    $("#confirmDeleteBtn").click(function () {
        // Make an AJAX request to delete the event
        $.ajax({
            url: `/event/${eventId}`,
            type: "DELETE",
            success: function () {
                // Handle the success response or update the UI accordingly
                console.log("Event deleted successfully");
                // Close the delete modal
                $("#deleteEventModal").modal("hide");
                // Reload the page to reflect the updated event list
                window.location.reload();
            },
            error: function (error) {
                // Handle the error response or display an error message
                console.error("Error deleting event:", error);
            }
        });
    });
});

// Get the modal element
var modal = document.getElementById("createEventModal");

// Get the button that opens the modal
var btn = document.getElementById("createEventBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    $("#createEventModal").modal("show");
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
document.getElementById("submitEvent").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve the input values
    let eventName = document.getElementById("createEventName").value;
    let eventImage = document.getElementById("createEventImage").value;
    let eventCapacity = document.getElementById("createEventCapacity").value;
    let eventDescription = document.getElementById("createEventDescription").value;

    // Create an object with the event details
    let eventData = {
        name: eventName,
        img: eventImage,
        capacity: eventCapacity,
        description: eventDescription
    };
    console.log(eventData);
    fetch("/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventData)
    })
        .then(function (response) {
            if (response.ok) {
                // Hide the modal
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


$(document).on("click", ".list", function () {
    let id = $(this).data("id");
    fetch("/event/" + id+"/users")
        .then((res) => res.json())
        .then((data) => {

            if(data.length == 0){
                //there is no users in this course put it inside the modal
                $("#listUsersBody").html("<h3>There is no users in this course</h3>");

                // Show the modal
                $("#userModal").modal("show");


            }else {

                // Create the HTML content for the user details
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
                data.forEach((user) => {
                    tableContent += `
                    <tr>
                        <td>${user.fullName}</td>
                        <td>${user.email}</td>
                        <td>${user.phoneNumber}</td>
                    </tr>
                `;
                });
                tableContent += `
                    </tbody>
                </table>
            `;
                // Put the HTML content inside the modal
                $("#listUsersBody").html(tableContent);

                // Show the modal
                $("#userModal").modal("show");

            }
        })
        .catch((error) => console.error(error));
});


$(document).on("click", ".excel", function () {
    let eventId = $(this).data("id");
    let eventName = $(this).data("name");
    fetch("/event/" + eventId+"/users")
        .then((res) => res.json())
        .then((data) => {
            // Generate the Excel file and download it
            generateExcelFile(eventName,data);
        })
        .catch((error) => console.error(error));
});

function generateExcelFile(eventName,data) {
    // Remove the "id" , "purchasedCourses" and "passwords" properties from each student object
    const filteredData = data.map(({ id, purchasedCourses,password, ...student }) => student);

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = eventName+"users.xlsx";
    link.click();
}
