import React from 'react'
import { Jumbotron } from 'react-bootstrap'
import Background from '../images/jumboBackground.jpg'

const HomeJumbotron = () => {
  return (
    <Jumbotron style={{ 'max-height': '25%', 'background-image': `url(${Background})`, 'background-size': 'cover' }}>
      <h1>Welcome to CANALU</h1>
      <p>Explore the World of Recycled Aluminum Art</p>
    </Jumbotron>
  )
}

export default HomeJumbotron
