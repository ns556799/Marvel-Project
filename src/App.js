import React, { Component } from 'react'
import './css/App.css'
import CryptoJS from 'crypto-js'
import Axios from 'axios'
import ls from 'localstorage-ttl'

import Header from './components/Header'
import Footer from './components/Footer'
import CharacterList from './components/CharacterList'

let API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
let API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characters: [
        'Spider-Man',
        'Captain America',
        'Iron Man',
        'Thor',
        'Hulk',
        'Black Widow',
        'Black Panther',
        'Falcon',
        'Loki',
        'Hawkeye',
        'Vision',
        'War Machine (Parnell Jacobs)',
        'Scarlet Witch',
        'Ultron',
        'Thanos',
        'Wolverine'
      ],
      marvelData: []
    }
  }

  componentWillMount() {
    if (!ls.get('marvelData') || (JSON.parse(ls.get('marvelData'))).length !== this.state.characters.length) {
      console.log('Connecting to API')
      this.state.characters.forEach((el) => {
        const encodedName = encodeURIComponent(el.trim())
        Axios.get(`http://gateway.marvel.com/v1/public/characters?name=${encodedName}&ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
          .then((res) => {
            this.setState({
              marvelData: [...this.state.marvelData, res.data.data.results]
            })
            ls.set('marvelData', JSON.stringify(this.state.marvelData), 86400000)
          })
          .catch((err) => { console.log(err) })
      })
    } else {
      console.log('Connecting to localStorage')
      this.setState({
        marvelData: [...this.state.marvelData, [].concat.apply([], JSON.parse(ls.get('marvelData')))]
      })
    }
  }
  render() {
    return (
      <div className='App'>
        <Header />
        <div className='wrap'>
          <div className='character-list'>
            { this.state.marvelData.map((item, i) => {
              return <CharacterList key={i} data={item} />
            })}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default App
