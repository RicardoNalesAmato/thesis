import React, {Component, PropTypes} from 'react';
import {createGraph} from './graphs'
// import './App.scss'

export default class App extends Component {
    render() {

        return (
            <div>

                <h1> Fully implemented on React with SSR!!!</h1>
                <svg width="960" height="600"></svg>

            </div>
        );
    }

    componentDidMount() {
        createGraph();
    }
}
