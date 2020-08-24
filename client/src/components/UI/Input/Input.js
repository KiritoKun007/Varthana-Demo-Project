import React, { Fragment } from 'react'

import classes from './Input.module.css'

const Input = (props) => {

    let inputElement = null
    let inputClasses = []
    let validationError = null

    if (props.inValid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    if (props.inValid && props.touched) {
        validationError =  <p className={classes.ValidationErrorMessage}>{props.validationErrorMsg}</p>
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                defaultValue={props.value}
                onChange={props.inputHandler} />
            break;

        default:
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                defaultValue={props.value}
                onChange={props.inputHandler} />
            break;
    }

    return (
        <Fragment>
            {inputElement}
            {validationError}
        </Fragment>
    )
}

export default Input;