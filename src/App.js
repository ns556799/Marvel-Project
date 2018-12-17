import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CryptoJS from 'crypto-js'
import Axios from 'axios';
import ls from 'localstorage-ttl'

import CharacterList from './components/CharacterList'

const publicKey = '306e2c7a911a16b8c95ac6996801dd65'
const privateKey = 'c92da84ea1eaa998b871e88d942448bc4cefd9dc'
const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString()
let offset = 0

// Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${offset}`)
// .then((res) => {
//   console.log(res.data.data.results)
//   console.log('first')
//   offset = offset + 100
//   Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${offset}`)
//   .then((result) => {
//     console.log(result.data.data.results)
//   })
// })
// .catch((err) => {
//   console.log(err)
// })


class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       chars: []
    }
 }

 componentWillMount() {
   console.log('mounted')
   if (!ls.get('offset100')) {
    Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100&offset=${offset}`)
    .then((char) => {
      ls.set('offset100', JSON.stringify(char.data.data.results), 86400000);
      this.setState({
        chars: [...this.state.chars, JSON.parse(ls.get('offset100'))]
      })
    })
   } else {
    this.setState({
      chars: [...this.state.chars, JSON.parse(ls.get('offset100'))]
    })
   }
 }
//  1545137051469
  render() {
    function renderCharacters() {
      // if (this.state.chars.length) {
      //   this.state.chars.map(item => {
      //   console.log(item)
      //   return <CharacterItem key={item.id} data={item}/>
      //   })
      // } else {
      //   return
      // }
    }
       
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {this.state.chars.map((item, i) => {
         return <CharacterList key= {i} data={item} />
        })}
      </div>
    );
  }
}

export default App;
