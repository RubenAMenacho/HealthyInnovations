//ActivityLevel.js

import React from 'react';

export class ActivityLevel extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const activity = e.target.value;
        this.props.onChange(activity);
    }

    render(){
        return (
            <div class="activity-level">
                <label for="activity">Activity Level</label>
                <select name="activity" id="activity" class="browser-default custom-select" onChange={this.handleChange}>
                    <optgroup>
                        <option value="" disabled selected>Select your activity level</option>
                        <option value="none">No exercise (or very litte)</option>
                        <option value="light">Light exercise (1-3 days per week)</option>
                        <option value="moderate">Moderate Exericse (3-5 days a week)</option>
                        <option value="heavy">Heavy Exercise (6-7 days a week)</option>
                        <option value="v-heavy">Very Heavy Exercise (twice a day/active job)</option>
                    </optgroup>  
                </select>
            </div>
        );
    }
}
