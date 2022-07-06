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
    if (!dueDate) {
        dueDate = new Date();
        dueDate = date.addDays(dueDate, 1);
        $("#dueDate").val(date.format(dueDate, 'YYYY-MM-DD'));
    }
    else {
        dueDate = date.parse(dueDate, 'YYYY-MM-DD');
    }
    // console.log("days remaining:", Math.round(date.subtract(dueDate, new Date()).toDays()));
    if (validateTask(newTask)) {
        tododb.insert({
            "task": newTask,
            "private": $(".isPrivate").hasClass("fa-eye-slash"),
            "dueDate": dueDate,
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