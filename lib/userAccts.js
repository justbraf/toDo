AccountsTemplates.configure({
    // confirmPassword: false
    forbidClientAccountCreation: false,
});

let pwd = AccountsTemplates.removeField("password");
AccountsTemplates.removeField("email");
AccountsTemplates.addFields([
    {
        _id: 'username',
        type: 'text',
        required: true,
        displayName: "Username"
    },
    {
        _id: 'firstname',
        type: 'text',
        required: true,
        displayName: "First Name"
    },
    {
        _id: 'surname',
        type: 'text',
        required: true,
        displayName: "Surname"
    },
    {
        _id: "gender",
        type: "select",
        displayName: "Gender",
        select: [
            {
                text: "Male",
                value: "male",
            },
            {
                text: "Female",
                value: "female",
            },
        ],
    },
    pwd
]);