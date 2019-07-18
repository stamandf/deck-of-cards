import React from 'react';
import './Card.css';

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        let angle = Math.random() * 90 - 45;
        let xPos = Math.random() * 40 - 20;
        let yPos = Math.random() * 40 - 20;
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
    }
    render() {
      console.log('transform:', this._transform);
        return (
          <img
            style={{ transform: this._transform }}
            className='Card'
            src={this.props.image}
            alt={this.props.name}
          />
        );
      }
    }