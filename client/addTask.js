import date from 'date-and-time';

Template.addTask.events({
    'click .js-add'() {
        addNewTask();
    },
    'keypress #newTask'(event) {
        if (event.keyCode == 13) {
            addNewTask();
        }
    },
    'click .js-privateTask'() {
        // Check if HTML element has a particular class
        if ($(".isPrivate").hasClass("fa-eye")) {
            $(".isPrivate").addClass("fa-eye-slash");
            $(".isPrivate").removeClass("fa-eye");
            $(".privateBtn").text(" Private");
        }
        else {
            $(".isPrivate").removeClass("fa-eye-slash");
            $(".isPrivate").addClass("fa-eye");
            $(".privateBtn").text(" Public");
        }
    }
});

let validateTask = (task) => {
    let valid = true;
    $("#js-addTaskGroup").removeClass("errorBox");
    if (task == "") {
        $("#js-addTaskGroup").addClass("errorBox");
        valid = false;
    }
    return valid;
}

let addNewTask = () => {
    let newTask = $("#newTask").val();
    let dueDate = $("#dueDate").val();
    if (validateTask(newTask)) {
        tododb.insert({
            "task": newTask,
            "private": $(".isPrivate").hasClass("fa-eye-slash"),
            // "dueDate": dueDate,
            "ownId": Meteor.userId(),
            "trashBin": false
        });
        $("#newTask").val("");
        $("#dueDate").val("");
        $(".isPrivate").removeClass("fa-eye-slash");
        $(".isPrivate").addClass("fa-eye");
        $(".privateBtn").text(" Public");
    }
}