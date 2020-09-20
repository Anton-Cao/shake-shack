import React, { Component } from 'react';
import AreaChart from '../graphs/AreaChart';
import FileUpload from './FileUpload';
import { withRouter } from "react-router";

class User extends Component {
    getKey = () => {
        const key = this.props.match.params.key;
        if (key) {
            return (
                <div className="upload">
                    <AreaChart name={key} />
                    <FileUpload />
                </div>
            );
        } else {
            return (
                <div className="upload">
                    <AreaChart />
                    <FileUpload />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.getKey()}
            </div>
        );
    }
}

export default withRouter(User); 