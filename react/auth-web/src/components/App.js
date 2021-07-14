import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Base from './Base';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          logged_in: localStorage.getItem('token') ? true : false,
          username: '',
        };
    }

    // check login and get user.username
    componentDidMount() {
        if (this.state.logged_in) {
            fetch('http://localhost:8001/users/current_user/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(json => {
                this.setState({
                    username: json.username
                });
            });
        }
    }

    // to pass as prop
    set_parameters_from_child = (data) => {
        this.setState({
            logged_in: data.logged_in,
            username: data.username,
        });
    }

    // to pass as prop
    handle_logout = (e) => {
        e.preventDefault();
        console.log('Start logout process');
        localStorage.removeItem('token');
        this.setState({ 
            logged_in: false, 
            username: '',
        });
    };

    say_hello = () => {
        console.log('Helloooooo from parent!!');
    }

    render() {
        return(
            <BrowserRouter>
                <Base logged_in={this.state.logged_in} onLogout={this.handle_logout}>
                    <Switch>
                        <Route 
                            exact path="/" 
                            render={(props) => (
                                <Home 
                                    {...props} 
                                    username={this.state.username} 
                                    logged_in={this.state.logged_in} 
                                    onLogout={this.handle_logout}
                                    set_params={this.set_parameters_from_child}
                                />
                            )} 
                        />
                        <Route 
                            exact path="/signup" 
                            render={(props) => (
                                <SignUp
                                    {...props}
                                    username={this.state.username} 
                                    logged_in={this.state.logged_in} 
                                    onLogout={this.handle_logout}
                                    set_params={this.set_parameters_from_child}
                                />
                            )}
                        />
                    </Switch>
                </Base>
            </BrowserRouter>
        );
    }
}

export default App;