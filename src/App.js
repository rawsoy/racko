import { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GamePicker from './GamePicker';
import PlayerPicker from './PlayerPicker';
import firebase from "firebase/app";
import { db } from './firebase/firebase'

const App = props => {
  const [games, setGames] = useState([])
  const [game, setGame] = useState(null)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    db.collection('games')
    .onSnapshot(snapshot => {
      if (snapshot.size) {
        let newGames = []
          for (let g of snapshot.docs) {
            let toAdd = g.data()
            newGames.push({id: g.id, ...toAdd})
          }
          setGames(newGames.sort((a,b) => a.name < b.name ? -1 : 1))          
        }
      })
  return () => {
      firebase.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (game) {
      let newGame = games.find(e => e.name === game.name)
      setGame({...newGame})
    }
  }, [games])

  useEffect(() => {
    if (game && game.turn === 'comp1') {
      runComp1Turn()
      
    }
  }, [game])

  const runComp1Turn = () => {
    let action = Math.random() < 0.5 ? 'deck' : 'discard'

      if (action === 'discard') {
        let drawnCard = drawFromDiscard()

        //  put it back
        if (Math.random() < 0.5) {
          drawFromDiscard(drawnCard)
        }
        // put it somehwere in his hand
        else {
          replaceCard(game.comp1[Math.floor(Math.random() * 10)], drawnCard)
        }
      }
      else {
        let drawnCard = drawFromDeck()

        //  put it back
        if (Math.random() < 0.5) {
          drawFromDiscard(drawnCard)
        }
        // put it somehwere in his hand
        else {
          replaceCard(game.comp1[Math.floor(Math.random() * 10)], drawnCard)
        }
      }
  }

  const handlePickGame = newGame => {
    setGame(newGame)
  }

  const saveGame = (newGame, endTurn) => {
    if (endTurn) {
      let nextTurn;
      if (newGame.turn === 'esti') {
        nextTurn = 'yoni'
      }
      else if (newGame.turn === 'yoni') {
        nextTurn = 'comp1'
      }
      else if (newGame.turn === 'comp1') {
        nextTurn = 'esti'
      }
      db.collection('games').doc(game.id).set({ ...newGame, turn: nextTurn })
    }
    else {
      setGame(newGame)
    }
  }

  const replaceCard = (card, drawnCard) => {
    if (drawnCard && (game.turn === player || game.turn === 'comp1')) {
      let newGame = {...game}
      let playerToUse = newGame.turn === 'comp1' ? 'comp1' : player
      
      let idx = newGame[playerToUse].findIndex(e => e === card)
      newGame[playerToUse].splice(idx, 1, drawnCard)
      newGame.discard.push(card)
      
      saveGame(newGame, true)
    }
  }

  const drawFromDeck = () => {
    if (game.turn === player || game.turn === 'comp1') {
      let newGame = {...game}
      let newDrawn = game.deck.splice(0, 1)
  
      saveGame(newGame)
      return newDrawn[0]
    }
  }

  const drawFromDiscard = drawnCard => {
    if (game.turn === player || game.turn === 'comp1') {
      let newGame = {...game}
      if (drawnCard) {
        newGame.discard.push(drawnCard)
        saveGame(newGame, true)
        return null
      }
      else {
        saveGame(newGame)
        return newGame.discard.pop()
      }
    }
  }
   
  if (!game) {
    return <GamePicker handlePickGame={handlePickGame} games={games} />
  }

  else if (game && player) {
    return <GameBoard game={game} drawFromDeck={drawFromDeck} replaceCard={replaceCard} drawFromDiscard={drawFromDiscard} hand={game[player]} player={player} />
  }
  else if (game && !player) {
    return <PlayerPicker setPlayer={setPlayer} />
  }
}

export default App;
