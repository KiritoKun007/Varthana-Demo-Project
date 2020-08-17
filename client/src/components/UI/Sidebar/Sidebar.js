import React from 'react';
import classes from './Sidebar.module.css';
import { NavLink, useRouteMatch } from 'react-router-dom';

const Sidebar = () => {

    let { url } = useRouteMatch()
    console.log(url)

    return (
        <div className={classes.Sidebar}>

            <ul>
                <li>
                    <NavLink to={url} activeClassName={classes.is_active} exact >Profile</NavLink>
                </li>
                <li>
                    <NavLink to={`${url}/logout`} activeClassName={classes.is_active} >Logout</NavLink>
                </li>
            </ul>

        </div>
    )
}

export default Sidebar
