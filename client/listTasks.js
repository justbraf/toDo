Template.listTasks.helpers({
    theTasks() {
        return tododb.find();
    }
});