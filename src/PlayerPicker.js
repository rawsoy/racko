import React from 'react'
import styled from 'styled-components'

const PlayerContainer = styled.div`
  display: flex;
  margin: auto;
`

const Player = styled.span`
  border: 1px solid blue;
  border-radius: 50%;
  padding: 20px;
  margin: 50px;
  cursor: pointer;
`

const PlayerPicker = props => {
  return (
    <React.Fragment>
      <h2>Pick a player</h2>
      <PlayerContainer>
        <Player onClick={() => props.setPlayer('esti')}>Esti</Player> 
        <Player onClick={() => props.setPlayer('yoni')}>Yoni</Player> 
      </PlayerContainer>
    </React.Fragment>

  )
}

export default PlayerPicker