import React from 'react';
import { createRoot } from 'react-dom/client';
import registerSW from "./register_sw";
import App from './components/App';
import './reset.css';

// registerSW();

const appRoot = document.querySelector("#app");
if (!appRoot) throw Error("Cannot find applicaiton root in html.");

const root = createRoot(appRoot);
root.render(<App />);


