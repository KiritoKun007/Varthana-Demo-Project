import React from 'react'
import ColorChip from '../Chip/ColorChip'

const FavColorBox = ({ colors, isDrag }) => {

    console.log(colors)

    let colorChips = null
    if (colors.length !== 0) {
        colorChips = colors.map(color => (
            <ColorChip 
                key={color.color_id}
                color={color} />
        ))
    } 

    return colorChips
}

export default FavColorBox
