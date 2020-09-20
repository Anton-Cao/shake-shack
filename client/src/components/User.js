import React, { Component } from 'react';
import CountyMap from '../graphs/CountyMap';
import WorldMap from '../graphs/WorldMap';
import FileUpload from './FileUpload';
import { withRouter } from "react-router";

class User extends Component {
    getKey = () => {
        const key = this.props.match.params.key;
        if (key) {
            if (this.props.map === 'usa') {
                return (
                    <div className="upload">
                        <CountyMap name={key} />
                        <FileUpload />
                    </div>
                );
            } else {
                return (
                    <div className="upload">
                        <WorldMap name={key} />
                        <FileUpload />
                    </div>
                );
            }
        } else {
            return (
                <div className="upload">
                    <CountyMap />
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