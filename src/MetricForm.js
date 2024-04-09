//MetricForm.js

import React from 'react';


export class MetricForm extends React.Component{
    constructor(props) {
        super(props);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    handleWeightChange(e) {
        const weight = e.target.value;
        this.props.weightChange(weight);
        
    }

    handleAgeChange(e){
        const age = e.target.value;
        this.props.ageChange(age);
    }

    handleHeightChange(e){
        const height = e.target.value;
        this.props.heightChange(height);
    }

    render(){
        return (
            <div class="form-inputs">
                <label for="product_name">Weight</label>
                <input id="product_name"  type="text" maxlength="6" placeholder="(kg)" class="form-control" onChange={this.handleWeightChange}/>
            
                <label for="product_name">Age</label>
                <input id="product_name" type="text" maxlength="3" placeholder="(years 0-120)"class="form-control" onChange={this.handleAgeChange}/>

                <label for="product_name">Height</label>
                <input id="product_name" type="text" maxlength="5" placeholder="(cm)"class="form-control"onChange={this.handleHeightChange}/>
            </div>
        );
    }
}