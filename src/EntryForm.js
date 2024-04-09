//EntryForm.js

import React from 'react';
import {MetricForm} from './MetricForm';
import {ImperialForm} from './ImperialForm';
import {ActivityLevel} from './ActivityLevel';
import {Result} from './Result';

export class EntryForm extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = { age: '', gender: '', weight: '', activity: '', height: '', measurement: '',
                    measurementSelected: false, result: '', showResult: false, resultForm: ''};
        this.handleMeasurementChange = this.handleMeasurementChange.bind(this);
        this.changeGender = this.changeGender.bind(this);
        this.changeWeight = this.changeWeight.bind(this);
        this.changeAge = this.changeAge.bind(this);
        this.changeHeight = this.changeHeight.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        this.getCalories = this.getCalories.bind(this);
        this.validEntry = this.validEntry.bind(this);
    }

    handleMeasurementChange(event){
        this.setState({
            measurement: event.target.value, measurementSelected: true
        });
    }

    changeGender(event){
        this.setState({
            gender: event.target.value
        });
    }

    changeWeight(newWeight){
        this.setState({
            weight: newWeight
        });
    }

    changeAge(newAge){
        this.setState({
            age: newAge
        })
    }

    changeHeight(newHeight){
        this.setState({
            height: newHeight
        })
    }

    changeActivity(newActivity) {
        this.setState({
            activity: newActivity
        });
    }

    validEntry(){
        // Check that all input fields are valid before getting result
        let fields = [this.state.gender,this.state.age,this.state.weight,this.state.height,this.state.activity];
        var i;

        // check that any of the fields arent empty 
        for (i in fields){
            if (fields[i].length === 0){
                return false;
            }
        }

        // check each field is in a valid range
        if (this.state.age < 0 || this.state.age > 120){
            return false;
        } 
        if (this.state.weight < 0){
            return false;
        } 
        if (this.state.height < 0){
            return false;
        }

        return true;
    }

    getCalories(event){
        if (this.validEntry()){
            this.setState({
                showResult: true,
                resultForm: <Result calories={this.calculateCalories()} measurementType={this.state.measurement}/>
            })
        } else {
            alert("Please make sure that you have entered valid information in every field.");
        }
        
    }

    // Calculate BMR from form data using Harris-Benedict Equation
    calculateCalories(){
        let bmr = 0;
        // use equation to get bmr (calroies burned at rest)
        if (this.state.gender === 'male'){
            bmr = 66.473 + (13.75116*this.state.weight) + (5.033*this.state.height)-(6.755*this.state.age);
        } else {
            bmr = 655.0955 + (9.5634*this.state.weight) + (1.8496*this.state.height)-(4.6756*this.state.age);
        }
        // adjust bmr according to activity level
        switch (this.state.activity){
            case 'none':
                bmr = bmr * 1.2;
                break;
            case 'light':
                bmr = bmr * 1.375;
                break;
            case 'moderate':
                bmr = bmr * 1.55;
                break;
            case 'heavy':
                bmr = bmr * 1.725;
                break;
            case 'v-heavy':
                bmr = bmr * 1.9;
                break;
        }
        return Math.round(bmr);
    }


    render() {
        return (
          <div>
             <div className="form-container">
                <form>
                    <p>Select unit of measurement:</p>
                    <div class="measurement-choice">
                        <input type="radio" id="metric" value="metric" checked={this.state.measurement === "metric"} onChange={this.handleMeasurementChange}/>
                        <label for="metric">Metric (kg/cm)</label>
                        <input type="radio" id="imperial"  value="imperial" checked={this.state.measurement === "imperial"}onChange={this.handleMeasurementChange}/>
                        <label for="female">Imperial (lbs/feet+inches)</label>
                    </div>

                    <div className='form-group'>
                        <label for='gender'>Gender</label>
                        <select name='gender' id='gender' class="browser-default custom-select" onChange={this.changeGender}>
                            <option value="" disabled selected>Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    
                    {this.state.measurement === 'metric' && <MetricForm weightChange={this.changeWeight} ageChange={this.changeAge} heightChange={this.changeHeight}/>}
                    {this.state.measurement === 'imperial' && <ImperialForm weightChange={this.changeWeight} ageChange={this.changeAge} heightChange={this.changeHeight}/>}
                    {this.state.measurementSelected && <ActivityLevel onChange={this.changeActivity}/>}
                    {this.state.measurementSelected &&  
         <button className="login-button form-submit" type="button" class="btn btn-primary" id="calculate-btn" onClick={this.getCalories}>Calculate my calories</button>}
                </form>
            </div>
            <div >
                {this.state.showResult && this.state.resultForm}
            </div>
           
          </div>
        );
    }
}