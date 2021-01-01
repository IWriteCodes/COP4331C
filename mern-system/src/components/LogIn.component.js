import React, {Component} from 'react';
import axios from 'axios';

export default class LogIn extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = 
        {
            username: '',
            password: '',
            userType: 'user'
        }
    }

    onChangeUsername(e)
    {
        this.setState({username: e.target.value});
    }

    onChangePassword(e)
    {
        this.setState({password: e.target.value});
    }

    onChangeUserType(e)
    {
        this.setState({userType: e.target.value});
    }

    componentDidMount(e)
    {
        this.setState({userType: this.state.userType});
        localStorage.setItem("isLoggedOut", "yes");
    }


    onSubmit(e)
    {
        e.preventDefault();

        const user = 
        {
            username: this.state.username,
            password: this.state.password,
            userType: this.state.userType
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        const itemOrder = 
        {
            username: this.state.username,
            itemList: [],
            cost: 0,
            isReady: false,
            status: ''
        }

        axios.post('http://localhost:5000/itemOrders/add', itemOrder)
            .then(res => console.log(res.data));

        localStorage.setItem("Username", user.username);
        localStorage.setItem("UserType", user.userType);
        localStorage.setItem("isLoggedOut", "no");

        if (user.userType === "worker")
        {
            window.location = '/workerOrders';
        }
        else
        {
            window.location = '/item';
        }

    }

    render()
    {
        return (
            <div>
                <h3 className = "thead-dark" >New User or Log In</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.username}
                            onChange = {this.onChangeUsername}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Password: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.password}
                            onChange = {this.onChangePassword}
                        />
                    </div>
                    <label>
                        Select if you are a user or worker:
                        <select defaultValue = {this.state.userType} onChange = {this.onChangeUserType}>
                            <option value = "customer">User</option>
                            <option value = "worker">Worker</option>
                        </select>
                    </label>
                    <div className = "form-group">
                        <input type = "submit" value = "New User or Log In" className = "btn btn-light"/>
                    </div>
                </form>
            </div>
            
        );
    }
}