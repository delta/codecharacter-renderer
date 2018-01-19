import React                                from "react";
import ReactDOM                             from "react-dom";
import * as PIXI from 'pixi.js';
import "./stylesheets/renderer.css";
import { initRenderer, initGame }     from  "./javascripts/driver.js";

export default class CodeCharacterRenderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        initGame(this.props.logFile);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logFile.toString()
        != this.props.logFile.toString()) {
            initGame(nextProps.logFile);
        }
    }

    render() {
        return (
            <div id="renderer-container" />
        );
    }
}

export function initializeRendererAssets() {
    initRenderer();
}


// TEST DRIVER, NOT PART OF THE COMPONENT
// initRenderer();
// fetch('proto/game.log').then((response) => {
//     response.arrayBuffer().then((buffer) => {
//         let logFile = new Uint8Array(buffer);
//         ReactDOM.render((
//             <CodeCharacterRenderer logFile={logFile} />
//         ), document.getElementById("root"));
//     });
// });