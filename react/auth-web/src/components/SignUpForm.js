import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Login.css';

class SignUpForm extends React.Component {
    render() {
        return(
            <div>
                <div className="container py-2 mt-2">
                    <div className="container">
                        <h3 className="fs-3 mt-5 text-center fw-lighter Login__title">Registrarse</h3>
                    </div>
                    <div className="container-sm">
                        <div className="mt-4 row justify-content-center">
                            <form className="col-3" onSubmit={e => this.props.onSignup(e, this.props.formValues)}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input value={this.props.formValues.username} onChange={this.props.onChange} required name="username" type="text" className="form-control"/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input value={this.props.formValues.password} onChange={this.props.onChange} required name="password" type="password" className="form-control"/>
                                </div>
                                <hr/>
                                {this.props.error && (
                                    <div className="mb-3 text-center">
                                        <p className="Login__error fst-italic">Usuario no válido</p>
                                    </div>
                                )}
                                <div className="mb-3 text-center">
                                    <button type="submit" className="btn btn-info">Registrarse</button>
                                </div>
                                <div className="mb-2 row justify-content-center">
                                    <Link to="/" className="text-center Login__no_login">Si tiene una
                                            cuenta, entre aquí</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpForm;