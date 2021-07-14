import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    render() {
        return(
            <React.Fragment>
                {this.props.message}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid"> 
                        <div className="collapse navbar-collapse">
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <form className="container-fluid justify-content-start">
                                    <Link to="/"><button className="btn btn-sm btn-outline-secondary me-2" type="button">Home</button></Link>
                                    {!this.props.logged_in && (
                                        <Link to="/signup"><button className="btn btn-sm btn-outline-secondary" type="button">SignUp</button></Link>
                                    )}
                                </form>
                            </div>
                            {this.props.logged_in && (
                                <form className="d-flex">
                                    <button onClick={this.props.onLogout} className="btn btn-sm btn-outline-danger">Logout</button>
                                </form>
                            )}
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }  
}

export default Navbar;