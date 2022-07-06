Template.listTasks.helpers({
    theTasks() {
        return tododb.find({ "trashBin": false });
    }
});

Template.listTasks.events({
    'click .js-trashIt'() {
        let taskId = this._id;
        tododb.update({ _id: taskId }, {
            $set: {
                "trashBin": true
            }
        });
    },
    'dblclick .myTask'(event) {
        if (!$(".list-group-item textarea").hasClass("editing")) {
            let editInput = document.createElement("textarea");
            editInput.type = "text";
            editInput.classList = "editing w-100";
            editInput.value = this.task;
            event.currentTarget.replaceWith(editInput);
            $(".editing").focus();
        }
    },
    'keyup .editing'(event) {
        if (event.keyCode == 13) {
            let uId = this._id;
            let newVal = $(".editing").val();
            let savedInput = document.createElement("span");
            savedInput.classList = "myTask";
            savedInput.innerHTML = newVal;
            event.currentTarget.replaceWith(savedInput);
            tododb.update({ _id: uId }, {
                $set: {
                    "task": newVal
                }
            });
        }
        if (event.keyCode == 27) {
            console.log("cancel");
            let cancelInput = document.createElement("span");
            cancelInput.classList = "myTask";
            cancelInput.innerHTML = this.task;
            event.currentTarget.replaceWith(cancelInput);
        }
    }
});