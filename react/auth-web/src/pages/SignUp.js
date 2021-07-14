import React from 'react';
import axios from 'axios';

import SignUpForm from '../components/SignUpForm';

class SignUp extends React.Component {

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


    handle_signup = (e, data) => {
        e.preventDefault();
        console.log('Start signup process!!');
        const user_data = JSON.stringify(data);
        const headers = {
            'Content-Type': 'application/json',
        }
          
        axios
            .post('http://localhost:8001/users/create_user/', user_data, {
                headers: headers,
            })
            .then(res => res.data)
            .then(json => {
                localStorage.setItem('token', json.token);

                this.props.set_params({
                    logged_in: true,
                    username: json.username,
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
            .then(() => {
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({error: true});
                console.log(error);
            });
    }


    render() {
        return(
            <React.Fragment>
                <SignUpForm 
                    onChange={this.handle_change}
                    formValues={this.state.form}
                    onSignup={this.handle_signup}
                    error={this.state.error}
                />
            </React.Fragment>
        );
    }
}

export default SignUp;