import React from 'react';
import classes from './ColorChip.module.css';

const ColorChip = ({ color }) => {

    return (
        <div
            className={classes.colorChipContainer} >
            <div style={{backgroundColor: color.hex_code}} className={classes.colorChip}>
                <p>{color.name}</p>
            </div>
        </div>
    )
}

export default ColorChip
