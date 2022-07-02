Template.trashBin.helpers({
    theTasks() {
        return tododb.find({ "trashBin": true });
    }
});

Template.trashBin.events({
    'click .js-restoreIt'() {
        let taskId = this._id;
        tododb.update({ _id: taskId }, {
            $set: {
                "trashBin": false
            }
        });
    },
    'click .js-deleteIt'() {
        let taskId = this._id;
        tododb.remove({ _id: taskId });
    },
    'click .js-trashCollapseBtn'() {
        if ($.trim($(".js-trashCollapseBtn").text()) == "Show Trash Bin") {
            $(".js-trashCollapseBtn").text("Hide Trash Bin");
        }
        else {
            $(".js-trashCollapseBtn").text("Show Trash Bin");
        }
    }
});