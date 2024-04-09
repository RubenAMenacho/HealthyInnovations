//ImperialForm.js

import React from 'react';


export class ImperialForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {feet: 0, inches:0}
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleFeetChange = this.handleFeetChange.bind(this);
        this.handleInchChange = this.handleInchChange.bind(this);
        this.handleHeightChange = this.handleHeightChange.bind(this);
    }

    handleWeightChange(e) {
        // convert lbs value to kg before storing in parent state
        const weight = e.target.value;
        this.props.weightChange(weight*0.453592);
    }

    handleAgeChange(e){
        const age = e.target.value;
        this.props.ageChange(age);
    }

    handleFeetChange(e){
        let newFeet = e.target.value;
        if (newFeet.length === 0){
            newFeet = 0;
        }
        this.setState({feet: newFeet});
        this.handleHeightChange();
    }

    handleInchChange(e){
        let newInches = e.target.value;
        // TODO: error handling for inches > 11
        if(newInches.length === 0){
            newInches = 0;
        } 
        this.setState({inches: newInches});
        this.handleHeightChange();
        
    }

    handleHeightChange(){
        // feet/inches values converted to cm before setting state in parent component
        const FEET_TO_CM = 30.48;
        const IN_TO_CM = 2.54; 
        const totalHeight = (this.state.feet*FEET_TO_CM) + (this.state.inches*IN_TO_CM);
        this.props.heightChange(totalHeight); 
    }

    render(){
        return (
            <div class="form-inputs">
                <label for="product_name">Weight</label>
                <input id="product_name"  type="text" maxLength="6" class="form-control" placeholder="(lbs)" onChange={this.handleWeightChange}/>
            
                <label for="product_name">Age</label>
                <input id="product_name" type="text" maxLength="3" class="form-control" placeholder="(years 0-120)"onChange={this.handleAgeChange}/>
                
                <label for="product_name">Height - Feet</label>
                <input id="product_name" type="number" maxLength="5" class="form-control" name="feet" onChange={this.handleFeetChange}/>
                <label for="product_name">Height - Inches</label>
                <input id="product_name" type="number" maxLength="5" class="form-control" name="inches" onChange={this.handleInchChange}/>
                
            </div>
        );
    }
}
