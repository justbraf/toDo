Template.header.helpers({
    myHeader() {
        if (this.dataMode == 1) {
            let surname = Meteor.user().profile.surname;
            if (Meteor.user().profile.gender == "male") {
                surname = "Mr. " + surname;
            }
            else {
                surname = "Ms. " + surname;
            }
            surname += "'s To Do List"
            return surname;
        }
        return "Our To Do List";
    }
});