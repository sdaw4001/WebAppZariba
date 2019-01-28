import * as React from 'react';
import "./Error.css";
import { Redirect } from 'react-router-dom';

class Errors extends React.Component {
    constructor(props: any){
        super(props);
    }

    public render() {
        return(
            <div className="whole-landing">
                <Redirect to="/"/>
            </div>
        );
    }
}
export default Errors;