Template.addTask.events({
    'click #js-add'() {
        let newTask = $("#newTask").val();
        if (validateTask(newTask)) {
            addNewTask(newTask);
        }
    },
    'keypress #newTask'(event) {
        if (event.keyCode == 13) {
            let newTask = $("#newTask").val();
            if (validateTask(newTask)) {
                addNewTask(newTask);
            }
        }
    },
    'click .privateTask'() {
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

let addNewTask = (newTask) => {
    tododb.insert({
        "task": newTask
    });
    $("#newTask").val("");
}