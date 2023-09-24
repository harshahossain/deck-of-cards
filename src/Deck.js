import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const API_BASE_URL='https://deckofcardsapi.com/api/deck/';

class Deck extends Component{
    constructor(props){
        super(props);
        this.state={deck:null,drawnCards:[]}
        this.getCard=this.getCard.bind(this)
    }

    async componentDidMount(){
        let deck= await axios.get(`${API_BASE_URL}new/shuffle/`); //so it doesnt return promise instead it will show us the result with async amd we await the get request
        this.setState({deck:deck.data})
       // console.log(deck)
       // console.log(deck.data)
    }

    async getCard(){//we dont have to bind cause arrow fucntions doesnt need no
        //https://deckofcardsapi.com/api/deck/${deck_id}/draw/ use this link to get a new card
       
        //make request and set stae  using new card info from upper link
            //console.log(...cardRes.data.cards)
        try{
            let cardRes= await axios.get(`${API_BASE_URL}${this.state.deck.deck_id}/draw/`)
            if(!cardRes.data.success){
                throw new Error('No cards remaining!')
            }
            let card=cardRes.data.cards[0];
            console.log(card)
            this.setState(st=>({
                drawnCards:[
                    ...st.drawnCards,
                    { id:card.code, 
                      image: card.image,
                      name:`${card.value} of ${card.suit}`  
                    }
                ]
            }))
        }catch(err){
            alert(err)
        }

       
    }

    render(){ 
        const cards=this.state.drawnCards.map(c=>(
            <Card key={c.id} image={c.image} name={c.name}/>
        ))  
        return(
            <div className='Deck'>
                <h1 className='Deck-title'>♦️Card Dealer♦️</h1>
                <h2 className='Deck-title Deck-subtitle'>♦️A little Demo Made With React♦️</h2>
                <button className='Deck-btn' onClick={this.getCard}>Get Card</button>
                <section className='Deck-cardarea'>
                    {cards}
                </section>
                
            </div>
        )
    }
}

export default Deck;