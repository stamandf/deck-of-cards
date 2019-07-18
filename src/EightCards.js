import React from 'react';
import './EightCards';

export default class EightCards extends React.Component {
    constructor(props) {
        super(props);

        let n = this.props.index;
        let angle = n === 0 ? -30 : 5 * n - 30;
        let xPos = n === 0 ? 60 : n * -120;
        let yPos = n === 0 ? 60 : 80 + (n * (n-6) * 10);
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }
    render() {
        console.log("n=", this.props.index, "-", this._transform);
        
        return (
            <img
            style={{ transform: this._transform }}
            className='EightCards'
            src={this.props.image}
            alt={this.props.name}
          />
        )
    }
}