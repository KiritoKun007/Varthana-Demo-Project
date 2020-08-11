import React from 'react';
import classes from './Button.module.css'

const Button = ({ btnType, isDisabled, children, clicked }) => {
    return (
        <button 
            className={classes[btnType]}
            disabled={isDisabled}
            onClick={clicked} >{children}</button>
    )
}

export default Button
