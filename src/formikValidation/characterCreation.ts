const characterValidate = (values: any) => {
    interface CharacterErrors {
        first_name?: string;
        last_name?: string;
    }

    const errors: CharacterErrors = {};

    if (!values.first_name) {
        errors.first_name = 'First Name Required';
    }

    if (!values.last_name) {
        errors.last_name = 'Last Name Required';
    }

    return errors;
};

export default characterValidate