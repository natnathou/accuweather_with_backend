//json of our input
const formField = {
    login:
        [
            {
                type        : "email",
                label       : false,
                textLabel   : null,
                id          : null,
                required    : true,
                name        : "username",
                placeholder : "Email",
                initialValue: "",
                autocomplete: "on",
                error       : "You have to enter an email!"
            },
            {
                type        : "password",
                label       : false,
                textLabel   : null,
                id          : "password",
                required    : true,
                name        : "password",
                placeholder : "Password",
                initialValue: "",
                autocomplete: "off",
                error       : "You have to enter a passport"
            }
        ],
    signup:
        [
            {
                type        : "email",
                label       : false,
                textLabel   : null,
                id          : null,
                required    : true,
                name        : "username",
                placeholder : "Email",
                initialValue: "",
                autocomplete: "on",
                error       : "You have to enter an username!"
            },
            {
                type        : "password",
                label       : false,
                textLabel   : null,
                id          : "password",
                required    : true,
                name        : "password",
                placeholder : "Password",
                initialValue: "",
                autocomplete: "off",
                error       : "You have to enter a passport"
            },
            {
                type        : "password",
                label       : false,
                textLabel   : null,
                id          : "passwordConfirmation",
                required    : true,
                name        : "passwordConfirmation",
                placeholder : "Password Confirmation",
                initialValue: "",
                autocomplete: "off",
                error       : "You have to confirm your passport"
            }
        ],
    forgotPassword:
        [
            {
                type        : "email",
                label       : false,
                textLabel   : null,
                id          : null,
                required    : true,
                name        : "email",
                placeholder : "Email",
                initialValue: "",
                autocomplete: "on",
                error       : "You have to enter an email!"
            }
        ],
    updatePassword:
        [
            {
                type        : "password",
                label       : false,
                textLabel   : null,
                id          : "password",
                required    : true,
                name        : "password",
                placeholder : "Password",
                initialValue: "",
                autocomplete: "off",
                error       : "You have to enter a passport"
            },
            {
                type        : "password",
                label       : false,
                textLabel   : null,
                id          : "passwordConfirmation",
                required    : true,
                name        : "passwordConfirmation",
                placeholder : "Password Confirmation",
                initialValue: "",
                autocomplete: "off",
                error       : "You have to confirm your passport"
            }
        ]
};

export default formField;