const USER_INFO = {
    personal: [
        { id: "name", label: "User name", type: "text" },
        {
            id: "email",
            label: "Email",
            type: "email",
            readonly: true,
        },
        { id: "phone", label: "Phone", type: "tel" },
        { id: "date_of_birth", label: "Birthday", type: "date" },
    ],
    shipping: [
        { id: "country", label: "Country" },
        { id: "city", label: "City" },
        { id: "district", label: "District" },
        { id: "town", label: "Town" },
        { id: "street", label: "Street" },
    ],
};

export default USER_INFO;
