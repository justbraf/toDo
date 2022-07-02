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
        if ($(".fa-xmark").hasClass("d-none")) {
            $(".fa-check").addClass("d-none");
            $(".fa-xmark").removeClass("d-none");
        }
        else {
            $(".fa-check").removeClass("d-none");
            $(".fa-xmark").addClass("d-none");
        }
    }
});

let validateTask = (task) => {
    let valid = true;
    $("#js-addTaskGroup").removeClass("errorBox");
    if (task == "") {
        console.log("Cannot be empty");
        $("#js-addTaskGroup").addClass("errorBox");
        valid = false;
    }
    return valid;
}

let addNewTask = () => {
    let newTask = $("#newTask").val();
    if (validateTask(newTask)) {
        tododb.insert({
            "task": newTask,
            "private": $(".fa-xmark").hasClass("d-none"),
            "trashBin": false
        });
        $("#newTask").val("");
        $(".fa-check").addClass("d-none");
        $(".fa-xmark").removeClass("d-none");
    }
}