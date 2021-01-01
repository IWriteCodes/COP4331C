import React, {Component} from 'react';


import axios from 'axios';

export default class CreateItem extends Component {
    constructor(props)
    {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = 
        {
            name: '',
            description: '',
            cost: 0,  
        }
    }

    onChangeName(e)
    {
        this.setState({name: e.target.value});
    }
    onChangeDescription(e)
    {
        this.setState({description: e.target.value});
    }
    onChangeCost(e)
    {
        this.setState({price: e.target.value});
    }

    onSubmit(e)
    {
        e.preventDefault();

        const item = 
        {
            name: this.state.name,
            description: this.state.description,
            cost: this.state.cost
        }

        console.log(item);

        axios.post('http://localhost:5000/items/add', item)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render()
    {
        return (
            <div>
                <h3>Create new item</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Name: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.name}
                            onChange = {this.onChangeName}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Description: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.description}
                            onChange = {this.onChangeDescription}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Cost: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.cost}
                            onChange = {this.onChangeCost}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Create New Item" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}