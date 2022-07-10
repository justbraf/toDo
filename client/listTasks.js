import date from 'date-and-time';

Session.set({
    "sortWhat": 0,
    "dateOrder": 1,
    "taskOrder": 1,
    "pages": 0,
    "pageSize": 3
});

Template.listTasks.helpers({
    theTasks() {
        let taskData;
        if (Session.equals("sortWhat", 0)) {
            // Sort by dueDate
            taskData = tododb.find({ "trashBin": false },
                {
                    sort: {
                        "dueDate": Session.get("dateOrder")
                    },
                    limit: Session.get("pageSize"),
                    skip: Session.get("pages")
                });
        }
        else {
            // Sort by task
            taskData = tododb.find({ "trashBin": false },
                {
                    sort: {
                        "task": Session.get("taskOrder")
                    },
                    limit: Session.get("pageSize"),
                    skip: Session.get("pages")
                });
        }
        return taskData;
    },
    dueDays() {
        let timeRem = date.subtract(this.dueDate, new Date()).toDays();
        if (timeRem < 0) {
            timeRem = "Overdue";
        }
        else if (timeRem < 1) {
            timeRem = date.subtract(this.dueDate, new Date()).toHours();
            timeRem = parseInt(timeRem, 10) + " hours";
        }
        else {
            timeRem = parseInt(timeRem, 10) + " days";
        }
        return timeRem;
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
            let taskData = this.task;
            taskData = taskData.replace(/[\n\r]/g, '');
            let editInput = document.createElement("textarea");
            editInput.type = "text";
            editInput.classList = "editing w-100";
            editInput.value = taskData;
            event.currentTarget.replaceWith(editInput);
            document.querySelector(".editing").focus();
        }
    },
    'keyup .editing'(event) {
        if (event.keyCode == 13) {
            let uId = this._id;
            let newVal = $(".editing").val();
            newVal = newVal.replace(/[\n\r]/g, '');
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
    },
    "click .js-sortDate"() {
        Session.set("sortWhat", 0);
        if (Session.equals("dateOrder", 1)) {
            Session.set("dateOrder", -1);
            $(".js-sortDate").removeClass("fa-arrow-down-1-9");
            $(".js-sortDate").addClass("fa-arrow-up-9-1");
        }
        else {
            Session.set("dateOrder", 1);
            $(".js-sortDate").removeClass("fa-arrow-up-9-1");
            $(".js-sortDate").addClass("fa-arrow-down-1-9");
        }
    },
    "click .js-sortTask"() {
        Session.set("sortWhat", 1);
        if (Session.equals("taskOrder", 1)) {
            Session.set("taskOrder", -1);
            $(".js-sortTask").removeClass("fa-arrow-down-a-z");
            $(".js-sortTask").addClass("fa-arrow-up-z-a");
        }
        else {
            Session.set("taskOrder", 1);
            $(".js-sortTask").removeClass("fa-arrow-up-z-a");
            $(".js-sortTask").addClass("fa-arrow-down-a-z");
        }
    },
    "click .js-prev"() {
        let pageSize = Session.get("pageSize");
        Session.set("pages", (Session.get("pages") - pageSize));
        if (Session.get("pages") < 0) {
            Session.set("pages", 0);
        }
    },
    "click .js-next"() {
        let pageSize = Session.get("pageSize");
        // Find maximum number of Documents
        let maxPage = tododb.find({ "trashBin": false }).count();
        // Calculate maximum number of pages
        maxPage = Math.ceil(maxPage / pageSize) - 1;
        Session.set("pages", (Session.get("pages") + pageSize));
        if (Session.get("pages") >= (maxPage * pageSize)) {
            Session.set("pages", (maxPage * pageSize));
        }
    },
    "change .js-numPages"(event) {
        Session.set("pageSize", parseInt(event.currentTarget.value, 10));
    }
});