import React from 'react';
import Navbar from './Navbar'

function Base (props) {

    return (
        <React.Fragment>
            <Navbar logged_in={props.logged_in} onLogout={props.onLogout}/>
            {props.children}
        </React.Fragment>
    );
}

export default Base;