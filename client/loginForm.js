Template.loginForm.events({
    'click .js-logout'() {
        AccountsTemplates.logout();
    }
});

Template.loginForm.helpers({
    username() {
        return Meteor.user().username;
    },
    salutation() {
        //Mr. Wick
        //Ms. Doe
        let surname = Meteor.user().profile.surname;
        if (Meteor.user().profile.gender == "male") {
            surname = "Mr. " + surname;
        }
        else {
            surname = "Ms. " + surname;
        }
        return surname;
    }
});