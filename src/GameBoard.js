import React, { useState } from 'react';
import styled, { css } from 'styled-components'

const Deck = styled.div`
  border: 1px solid black;
  height: 200px;
  width: 150px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 5px;
  cursor: pointer;
  flex-direction: column;
  display: flex;
`

const Page = styled.div`
  display: flex;
  flex-direction: row;
`

const Board = styled.div`
  display: flex;
  flex-direction: column;
  flex: 80%
`

const Rack = styled.div`
  display: flex;
  flex-direction: row;
`

const MyHand = styled.div`
  display: flex;
  flex-direction: column;
`

const CardIndicator = styled.div`
  height: 57px;
  margin-right: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`

const Card = styled.span`
  height: 55px;
  width: 200px;
  display: flex;
  border: 1px solid black;
  margin-bottom: 10px;
  flex-direction: row;
  position: relative;
  ${props => props.clickable && css`
    cursor: pointer;
  `}
`

const CardNumber = styled.span`
  font-weight: 600;
  position: absolute;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  background: #E94B58;
  color: white;
  width: 18px;
  ${props => css`
    left: calc(${props.value}% - 13px);
  `};
  padding: 2px;
  display: flex;
  justify-content: center;
`

const CardPiles = styled.div`
  display: flex;
  flex-direction: row;
`

const DiscardPile = styled.div`
  font-weight: 600;
  justify-content: flex-end;
  display: flex;
  border: 1px solid black;
  margin-bottom: 10px;
  flex-direction: row;
  padding: 5px;
  height: 200px;
  width: 150px;
  margin-left: 10px;
  cursor: pointer;
`

const DrawnCard = styled.div`
  font-weight: 600;
  justify-content: flex-end;
  display: flex;
  border: 1px solid black;
  margin-bottom: 10px;
  flex-direction: row;
  padding: 5px;
  height: 300px;
  width: 150px;
`

const indicators = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5]

const GameBoard = props => {
  const deck = props.game.deck;
  const hand = props.hand;
  const [drawnCard, setDrawnCard] = useState(null)
  const discardPile =  props.game.discard


  const drawFromDeck = () => {
    setDrawnCard(props.drawFromDeck())
  }

  const drawFromDiscard = () => {
    let newDrawn;

    if (drawnCard) {
      newDrawn = props.drawFromDiscard(drawnCard)
    }
    else {
      newDrawn = props.drawFromDiscard()
    }
    setDrawnCard(newDrawn)
  }

  const replaceCard = card => {
    props.replaceCard(card, drawnCard)
    
    setDrawnCard(null)
  }

  return (
    <Page>
    <Board>
      <h1>{props.player === 'yoni' ? 'Stop Cheating Esti' : "You're Playing As: Esti"}</h1>
        <CardPiles>
          <Deck onClick={drawFromDeck}>
            <span>Draw From Deck</span>
            <span>Cards Left: {deck.length}</span>
          </Deck>
          <DiscardPile onClick={drawFromDiscard}>
            {discardPile.length === 0 ? 'Discard Pile' : discardPile[discardPile.length - 1]}
          </DiscardPile>
        </CardPiles>
        {drawnCard && <DrawnCard>{drawnCard}</DrawnCard>}
        <h4>{props.game.turn}'s Turn</h4>
      </Board>
      <Rack>
        <MyHand>
          {indicators.map((val) => <CardIndicator key={val}>{val}</CardIndicator>)}
        </MyHand>
        <MyHand>
          {hand.map(card => 
            <Card 
              key={card} 
              clickable={drawnCard !== null} 
              onClick={() => replaceCard(card)} 
            >
              <CardNumber value={(card/60) * 100}>{card}</CardNumber>
            </Card>)}
        </MyHand>
      </Rack>      
    </Page>
  );
}

export default GameBoard