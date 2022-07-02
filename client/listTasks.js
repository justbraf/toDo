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
    }
});