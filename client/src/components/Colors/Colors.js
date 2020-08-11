import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// actions
import * as actions from '../../store/actions';

// css
import classes from './Color.module.css'

// component
import ColorBox from './Box/ColorBox';
import FavColorBox from './Box/FavColorBox';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../util/items';

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

    const favouriteColor = (id) => {
        dispatch(actions.favColor(id))
    }

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.CHIP,
        drop: (item, monitor) => favouriteColor(item.id), 
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <div className={classes.screenBackground}>
            <div className={classes.leftBox}>
                <h4>Colors</h4>
                <div className={classes.dFlex}>
                    <ColorBox 
                        colors={allColorExceptFav}
                        isDrag={true} />
                </div>
            </div>
            <div 
                className={classes.rightBox} 
                ref={drop}
                style={{
                    boxShadow: isOver? '3px 3px 6px #ccc': '3px 3px 6px #eee',
                }} >
                <h4>Favourite Colors</h4>
                <div className={classes.dFlex}>
                    <FavColorBox 
                        colors={favColors}
                        isDrag={false} />
                </div>
            </div>
        </div>
    )
}

export default Colors
