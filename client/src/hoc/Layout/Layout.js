import React, { Fragment } from 'react'
import Toolbar from '../../components/Toolbar/Toolbar'

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Toolbar />
            {children}
        </Fragment>
    )
}

export default Layout
