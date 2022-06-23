const monsterValidate = (values: any) => {
    interface CharacterErrors {
        species?: string;
        hp?: string;
        attack?: string;
        ac?: string;
        level?: string;
        size?: string
    }

    const errors: CharacterErrors = {};

    if (!values.species) {
        errors.species = 'Species Required';
    }

    if (!values.hp) {
        errors.hp = 'Hit Points Required';
    }

    if (!values.attack) {
        errors.attack = 'Attack Required';
    }

    if (!values.ac) {
        errors.ac = 'AC Required';
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