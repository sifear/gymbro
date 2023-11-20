import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from "./main";
import registerSW from "./register_sw";

registerSW();

const appRoot = document.querySelector("#app");
if (!appRoot) throw Error("Cannot find applicaiton root in html.");

const root = createRoot(appRoot);
root.render(<Main />);


