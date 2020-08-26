import React, { useEffect, useState, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// actions
import * as actions from '../../store/actions';

// css
import 'react-toastify/dist/ReactToastify.css';
import './Color.css'

// component
import ColorBox from './Box/ColorBox';
import FavColorBox from './Box/FavColorBox';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../util/items';
import Button from '../UI/Button/Button';

import { ToastContainer, toast } from 'react-toastify';

const Colors = () => {

    const colors = useSelector(state => state.colors.colors)

    const favColorsId = useSelector(state => state.colors.newFavColorsId)

    const successMsg = useSelector(state => state.colors.successMsg)

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(actions.getUser());

        dispatch(actions.getColors());

        dispatch(actions.getFavColorsId())

    }, [dispatch])

    useEffect(() => {
        if(successMsg !== '') {
            toast.success(successMsg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setisDisabled(false);

    }, [successMsg])

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
        setisDisabled(false);
        dispatch(actions.onCancel());
    }

    const onSaveHandler = (e) => {
        e.preventDefault();
        dispatch(actions.saveFavColors(favColorsId))

    }

    return (
        <Fragment>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

                <div className='screenBackground'>
                    <div className='leftBox'>
                        <h4>Colors</h4>
                        <div className='dFlex'>
                            <ColorBox 
                                colors={allColorExceptFav}
                                isDrag={true} />
                        </div>
                    </div>
                    <div 
                        className='rightBox' 
                        ref={drop}
                        style={{
                            boxShadow: isOver? '3px 3px 6px #ccc': '3px 3px 6px #eee',
                        }} >
                        <div>
                            <h4>Favourite Colors</h4>
                            <div className='dFlex'>
                                <FavColorBox 
                                    colors={favColors}
                                    isDrag={false} />
                            </div>
                        </div>
                        <div className='btnContainer'>
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

        </Fragment>
    )
}

export default Colors
