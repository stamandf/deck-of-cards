import React from 'react';
import axios from 'axios';
import Card from './Card';
import EightCards from './EightCards';
import './Deck.css';


// API to Shuffle a deck: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
// API to Draw a card = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`;
const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";
const DECK_COUNT = "new/shuffle/?deck_count=1"; //Number of decks is one for now

export default class Deck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deck: null,
            // card: null,
            isDeckOfOne: false,
            drawn: [],
            isRemaining: true
        }
    }

    componentDidMount() {
        const deckURL = API_BASE_URL + DECK_COUNT;
        axios.get(deckURL).then((response) => {
            this.setState({
                deck: response.data    
            })
        }).catch((error) => {
            console.log("Unable to access:", error);
            
        });
    }

    // async componentDidMount() {
    //     const DECK_SHUFFLE_API = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    //     let response = await axios.get(urlShuffle);  //Shuffle the deck and get the deck_id;
    //     console.log("response=",response);
    //     this.setState({
    //         success: response.data.success,
    //         deck_id: response.data.deck_id,
    //         shuffled: response.data.shuffled,
    //         remaining: response.data.remaining    
    //     })
    //     console.log("State in didMount=", this.state);
    //     console.log("COMPONENTDIDMOUNT!");
        
    // }

    drawACard = () => {
        let deckID = this.state.deck.deck_id;
        let cardURL = `${API_BASE_URL}/${deckID}/draw/?count=1`;
            axios.get(cardURL).then((response) => {
                if (!response.data.success) {
                    this.setState({ isRemaining: false});
                } else {
                    this.setState(st => ({
                        // card: response.data.cards[0],
                        isDeckOfOne: true, //request one card
                        drawn: [
                            ...st.drawn,
                            {
                                id: response.data.cards[0].code,
                                image: response.data.cards[0].image,
                                name: `${response.data.cards[0].value} of ${response.data.cards[0].suit}`
                            }
                        ]
                    }));
                }
                // console.log("drawACard", this.state.drawn);
            }).catch((error) => {
                console.log("Unable to access:", error);
                
            })
    }

    draw8Cards = () => {
        // console.log("Drawing 8 cards!");
        let deckID = this.state.deck.deck_id;
        let cardURL = `${API_BASE_URL}/${deckID}/draw/?count=8`;
            axios.get(cardURL).then((response) => {
                console.log("response = ", response.data)
                if(!response.data.success) {
                    this.setState({isRemaining: false})
                } else {
                    this.setState({
                        isDeckOfOne: false,  //request 8 cards
                        drawn: response.data.cards
                    })
                }
                // console.log("draw8Cards Drawn=", this.state.drawn);
            }).catch((error) => {
                console.log("Unable to access:", error);
                
            })
            
    }
    render() {
 
        let cards = null;
        if (this.state.isDeckOfOne) {
            cards = this.state.drawn.map(card => (
            <Card key={card.id} image={card.image} name={card.name}/>
        ));
        } else {
            cards = this.state.drawn.map((card, index) => (
                <EightCards  key={card.code} index={index} image={card.image} name={card.suit} />
            ))
        }
        
        return (
            <div className="Deck">
                <h1 className="Deck-title">♦︎ Card Dealer︎︎♦︎</h1>
                <h2 className="Deck-title subtitle">♦︎ A little demo made with React ♦︎</h2>
                {
                    this.state.isRemaining ? 
                    <button className="Deck-btn" onClick={this.drawACard}>GIMME A CARD!</button> : 
                    <p className="Deck-btn">NO MORE CARDS!</p>
                }
                {this.state.isRemaining && <button className="Deck-btn" onClick={this.draw8Cards} >GIMME 8 CARDS!</button>} 
                <div className="Deck-cardarea">{cards}</div>
            </div>
        )
    }
}