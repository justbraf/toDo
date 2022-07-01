Template.listTasks.helpers({
    theTasks() {
        return tododb.find();
    }
});

Template.listTasks.events({
    'click .js-trashIt'() {
        let taskId = this._id;
        // tododb.remove({ _id: taskId });
    }
})