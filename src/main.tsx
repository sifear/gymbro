import React, { useState } from "react";

const Main: React.FC = () => {
    const [text, setText] = useState('a');

    console.log('text', text)

    const clickHandler = async () => {
        const res = await fetch('/cucc');
        const _res = await res.json();
        setText(_res.data);
        console.log(_res)
    }

    return (
        <div>
            <p>Main page of the app: {text}</p>
            <button onClick={clickHandler}>Click</button>
        </div>
    );
};

export default Main;
