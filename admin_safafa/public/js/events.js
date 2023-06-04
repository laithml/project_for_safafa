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
                                                <button class="btn btn-secondary btn-circle " data-id="${events.id}"> <i class="fas fa-edit"></i> </button>
                                                <button class="btn btn-danger btn-circle " data-id="${events.id}"> <i class="fas fa-minus-circle"></i> </button> `));
                eventTable.row.add(eventsData);
            });
            eventTable.draw();
        }).catch(error => console.error(error))
    })
});