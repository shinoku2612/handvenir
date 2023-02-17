const USER_INFO = {
    personal: [
        { id: 'first_name', label: 'First name', type: 'text' },
        { id: 'last_name', label: 'Last name', type: 'text' },
        { id: 'date_of_birth', label: 'Birthday', type: 'date' },
        {
            id: 'email',
            label: 'Email',
            type: 'email',
        },
        { id: 'phone_number', label: 'Phone', type: 'tel' },
    ],
    shipping: [
        { id: 'country', label: 'Country' },
        { id: 'city', label: 'City' },
        { id: 'district', label: 'District' },
        { id: 'town', label: 'Town' },
        { id: 'street', label: 'Street' },
    ],
    password: [
        { id: 'new_password', label: 'New password', type: 'password' },
        {
            id: 'confirm_password',
            label: 'Confirm new password',
            type: 'password',
        },
    ],
};

export default USER_INFO;
