import React from 'react';
import './ThumbButton.css'

interface Props {
   onClick: (...args: any) => void;
}

const ThumbButton:React.FC<Props> = ({onClick}) => {
   return <div className='thumb-button' onClick={onClick}></div>
}

export default ThumbButton