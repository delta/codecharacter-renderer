import React                                                from "react";
import ReactDOM                                             from 'react-dom';
import CodeCharacterRenderer                                from './index.js';
import { initializeRendererAssets }                         from './index.js';

document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.margin = "0";
document.body.style.padding = "0";

initializeRendererAssets(initGameLog);

function initGameLog() {
    fetch('proto/game.log').then((response) => {
        response.arrayBuffer().then((buffer) => {
            let logFile = new Uint8Array(buffer);
            let options = {
                logFunction: console.log,
                playerID: 1
            };
            ReactDOM.render((
                <CodeCharacterRenderer logFile={logFile} options={options} />
            ), document.getElementById("root"));
        });
    });
}
