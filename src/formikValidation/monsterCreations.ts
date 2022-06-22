const monsterValidate = (values: any) => {
    interface CharacterErrors {
        name?: string;
        hp?: string;
        attack?: string;
        armor_class?: string;
        level?: string;
        size?: string
    }

    const errors: CharacterErrors = {};

    if (!values.name) {
        errors.name = 'Name Required';
    }

    if (!values.hp) {
        errors.hp = 'Hit Points Required';
    }

    if (!values.attack) {
        errors.attack = 'Attack Required';
    }

    if (!values.armor_class) {
        errors.armor_class = 'AC Required';
    }

    if (!values.level) {
        errors.level = 'Level Required';
    }

    if (!values.size) {
        errors.size = 'Size Required';
    }

    return errors;
};

export default monsterValidate