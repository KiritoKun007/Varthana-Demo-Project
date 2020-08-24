import React from 'react';
import classes from './ColorChip.module.css';
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../../util/items';

const ColorChip = ({ color }) => {

    const [{isDragging}, drag] = useDrag({
        item: {
            type: ItemTypes.CHIP,
            id: color.color_id,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    return (
        <div
            className={classes.colorChipContainer}
            ref={drag}
            style={{
                opacity: isDragging? 0.2: 1
            }} >
            <div style={{backgroundColor: color.hex_code}} className={classes.colorChip}>
                <div className={classes.draggableElement}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>{color.name}</p>
            </div>
        </div>
    )
}

export default ColorChip
