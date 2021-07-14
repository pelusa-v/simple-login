import React from 'react';
import axios from 'axios'

import LoginForm from '../components/LoginForm';

class Home extends React.Component {

    state = {
        form: {
            username: '',
            password: '',
        },
        error: false,
    }

    handle_change = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value, 
            }
        })
    }


    handle_login = (e, data) => {
        e.preventDefault();
        console.log('Start login process!!');
        const user_data = JSON.stringify(data);
        const headers = {
            'Content-Type': 'application/json',
        }
          
        axios
            .post('http://localhost:8001/token-auth/', user_data, {
                headers: headers,
            })
            .then(res => res.data)
            .then(json => {
                localStorage.setItem('token', json.token);

                this.props.set_params({
                    logged_in: true,
                    username: json.user.username,
                });

                this.setState({
                    form: {
                        username: '',
                        password: '',
                    },
                    error: false
                });
                console.log('Set token here!')
                //console.log(json)
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error);
            });
    }


    render() {
        if (this.props.logged_in) {
            return(
                <React.Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="mt-3 col-6">
                                <h1 className="fw-lighter">Welcome {this.props.username}!</h1>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } 
        else {
            return(
                <React.Fragment>
                    <LoginForm 
                        onChange={this.handle_change} 
                        formValues={this.state.form} 
                        onLogin={this.handle_login}
                        error={this.state.error}
                    />
                </React.Fragment>
            );
        }
    }
}

export default Home;