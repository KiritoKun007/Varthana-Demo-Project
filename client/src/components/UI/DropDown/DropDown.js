import React from 'react'

import styles from './DropDown.module.css'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const DropDown = (props) => {

    let dropDownList = null

    if(props.show) {
        dropDownList = (
            <div className={styles.DropDownList}>
                 <ul>
                     {props.dropDownList.map(link => {
                         return (
                            <li key={link.pathName} onClick={props.openCloseDropDown} >
                                <Link to={link.path}>
                                    {link.pathName}
                                </Link>
                            </li>
                       )
                     })}
                 </ul>
             </div>
        )
    }

    const classes = [styles.DropDown]

    return (
        <div className={classes.join(' ')}>
            <button 
                onClick={e => props.openCloseDropDown(e)}
                onMouseOver={props.openDropDown} >
                {props.children}    
            </button>         
            {dropDownList}   
        </div>
    )
}

export default DropDown
