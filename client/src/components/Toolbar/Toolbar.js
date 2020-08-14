import React from 'react';
import classes from './Toolbar.module.css'
import NavigationItems from './NavigationItems/NavigationItems';

const Toolbar = () => {
    return (
        <header className={classes.toolbar}>
            <nav>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
