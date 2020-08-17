import React, { useEffect, useState } from 'react'
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
import Button from '../UI/Button/Button';

const Colors = () => {

    const colors = useSelector(state => state.colors.colors)

    const favColorsId = useSelector(state => state.colors.newFavColorsId)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(actions.getUser());

        dispatch(actions.getColors());

        dispatch(actions.getFavColorsId());

    }, [dispatch])

    const [isDisabled, setisDisabled] = useState(true)

    let allColorExceptFav = []
    let favColors = []

    if(colors.length !== 0) {
        allColorExceptFav = colors.filter(color => color.is_fav === false )
        favColors = colors.filter(color => color.is_fav === true)
    }

    const favouriteColor = (id) => {
        setisDisabled(false)
        dispatch(actions.favColor(id))
    }

    const [{isOver}, drop] = useDrop({
        accept: ItemTypes.CHIP,
        drop: (item, monitor) => favouriteColor(item.id), 
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    })

    const onCancelHandler = () => {
        window.location = "/color";
    }

    const onSaveHandler = (e) => {
        e.preventDefault();
        dispatch(actions.saveFavColors(favColorsId))
    }

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
                <div>
                    <h4>Favourite Colors</h4>
                    <div className={classes.dFlex}>
                        <FavColorBox 
                            colors={favColors}
                            isDrag={false} />
                    </div>
                </div>
                <div className={classes.btnContainer}>
                    <Button 
                        btnType="cancel" 
                        isDisabled={isDisabled}
                        clicked={onCancelHandler} >CANCEL</Button>
                    <Button 
                        btnType="save" 
                        isDisabled={isDisabled}
                        clicked={e => onSaveHandler(e)} >SAVE</Button>
                </div>
            </div>
        </div>
    )
}

export default Colors
