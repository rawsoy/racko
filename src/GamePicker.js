import { db } from './firebase/firebase'
import React from 'react'
import styled from 'styled-components'

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Game = styled.span`
  height: 50px;
  width: 100px;
  border: 1px solid black;
  margin: 10px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NewGameButton = styled.span`
  padding: 10px;
  border: 1px solid green;
  cursor: pointer;
`

const GamePicker = props => {
  const games = props.games

  const handleNewGame = () => {
    let deck = []
    for (let i = 1; i <= 60; i++) {
      deck.push(i)
    }
    deck = shuffle(deck)

    let esti = []
    let yoni = []
    let comp1 = []
    for (let i = 0; i < 10; i++) {
      esti = esti.concat(deck.splice(0, 1))
      yoni = yoni.concat(deck.splice(0, 1))
      comp1 = comp1.concat(deck.splice(0, 1))
    }    
    
    let newGame = db.collection('games').doc()
    newGame.set({
      name: `Game ${games.length}`,
      deck,
      esti,
      yoni, 
      comp1,
      discard: [],
      turn: Math.random() < 0.5 ? 'yoni' : 'esti'     
    })
  }

  const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  return (
    <React.Fragment>
      <GameContainer>
        <h2>Pick a game</h2>
        {games.map(game => 
          <Game key={game.name} onClick={() => props.handlePickGame(game)}>{game.name}</Game>
        )}

      </GameContainer>
      <NewGameButton onClick={handleNewGame}>New Game</NewGameButton>
    </React.Fragment>
  )
}

export default GamePicker