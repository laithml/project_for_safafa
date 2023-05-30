$(document).ready(() => {

    let coursesTable = $("#courses").DataTable({
        data: [],
        columns: [{data: "id"}, {data: "name"}, {data: "image"}, {data: "price"}, {data: "desc"}, {data: "manage"}]
    });

    fetch("/courses").then((res) => {
        res.json().then((data) => {
            coursesTable.clear();
            Object.values(data).forEach((course) => {
                let courseData = $('<tr>').append('<td>' + course.id + '</td>').append('<td>' + course.name + '</td>').append('<td>' + '<img class="rounded-circle" width="200px" height="128px" src=' + course.img + '>' + '</td>').append('<td>' + course.price + '</td>').append('<td>' + course.description + '</td>').append($('<td>').html(`<button class="btn btn-success btn-circle " data-id="${course.id}"> <i class="fas fa-list"></i> </button>
                                                <button class="btn btn-secondary btn-circle " data-id="${course.id}"> <i class="fas fa-edit"></i> </button>
                                                <button class="btn btn-danger btn-circle " data-id="${course.id}"> <i class="fas fa-minus-circle"></i> </button> `));
                coursesTable.row.add(courseData);

            });
            coursesTable.draw();
        }).catch(error => console.error(error));
    });

});