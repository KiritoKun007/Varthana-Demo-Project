import React from 'react'
import ColorChip from '../Chip/ColorChip'

const ColorBox = ({ colors, handleColorModal }) => {

    console.log(colors)

    let colorChips = null
    if (colors.length !== 0) {
        colorChips = colors.map(color => (
            <ColorChip 
                key={color.color_id}
                color={color}
                handleColorModal={() => handleColorModal(color.color_id)} />
        ))
    } 

    return colorChips
}

export default ColorBox
