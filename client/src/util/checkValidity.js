export const checkValidity = (value, rules) => {
    let isValid = true
    let validationMsg = ''

    if (rules.required) {
        isValid = value.trim() !== '' && isValid
        validationMsg = 'This field is required.'
    }

    if (rules.isEmail) {
        const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        isValid = pattern.test(value) && isValid;
        validationMsg = 'Invalid Email.'
    }

    return {
        isValid: isValid,
        message: validationMsg
    }
}