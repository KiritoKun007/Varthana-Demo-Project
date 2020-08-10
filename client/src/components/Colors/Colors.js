import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// actions
import * as actions from '../../store/actions';

// css
import classes from './Color.module.css'

// component
import ColorBox from './Box/ColorBox';


const Colors = () => {

    const colors = useSelector(state => state.colors.colors)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.getColors())
    }, [dispatch])

    let allColorExceptFav = []
    let favColors = []

    if(colors.length !== 0) {
        allColorExceptFav = colors.filter(color => color.is_fav === false )
        favColors = colors.filter(color => color.is_fav === true)
    }

    return (
        <div className={classes.screenBackground}>
            <div className={classes.leftBox}>
                <ColorBox 
                    colors={allColorExceptFav} />
            </div>
            <div className={classes.rightBox}>
                <ColorBox 
                    colors={favColors}
                    isFav={true} />
            </div>
        </div>
    )
}

export default Colors
