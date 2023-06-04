$(document).ready(() => {

    let eventTable = $("#events").DataTable({
        data: [],
        columns: [{data: "id"}, {data: "name"}, {data: "image"}, {data: "desc"}, {data: "manage"}]
    });

    fetch("/event").then((res) => {
        res.json().then((data) => {
            eventTable.clear();
            Object.values(data).forEach((events) => {
                console.log(events);
                let eventsData = $('<tr>').append('<td>' + events.id + '</td>').append('<td>' + events.name + '</td>').append('<td>' + '<img class="rounded-circle" width="200px" height="128px" src=' + events.img + '>' + '</td>').append('<td>' + events.description + '</td>').append($('<td>').html(`
                                                <button class="btn btn-secondary btn-circle edit" id="${events.id}"> <i class="fas fa-edit"></i> </button>
                                                <button class="btn btn-danger btn-circle delete" data-id="${events.id}"> <i class="fas fa-minus-circle"></i> </button> `));
                eventTable.row.add(eventsData);
            });
            eventTable.draw();
        }).catch(error => console.error(error))
    })
});

$(document).on("click", ".edit", function () {
    // Get the event details from the current event item
    var eventId = $(this).attr("id")


    // Set the event details in the edit event form
 $("#eventId").val(eventId);



    // Open the edit event modal
    $("#editEventModal").modal("show");
});

$("#saveChangesBtn").click(function () {
    // Get the updated event details from the form
    var eventId = $("#eventId").val();
    console.log(eventId);
    var eventName = $("#eventName").val();
    var eventImg = $("#eventImg").val();
    var eventDescripiton = $("#eventDescription").val();

    // Save the changes to the database using an AJAX request
    $.ajax({
        url: "http://localhost:3000/event/" + eventId, // Replace with the actual endpoint to update the event
        method: "PUT",
        data: {
            name: eventName,
            img: eventImg,
            description: eventDescripiton
        },
        success: function (response) {
            // Handle the success response
            console.log("Event updated successfully!");
            // Close the edit event modal
            $("#editEventModal").modal("hide");
            window.location.reload();
        },
        error: function (error) {
            // Handle the error response
            console.log("Error updating event:", error);
        }
    });
});


// $(document).on("click", ".delete", function () {
//
// }