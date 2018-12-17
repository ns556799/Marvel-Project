import React, { Component } from 'react'
import './App.css'
import CryptoJS from 'crypto-js'
import Axios from 'axios'
import ls from 'localstorage-ttl'

import CharacterList from './components/CharacterList'

let API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
let API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chars: [],
      total: null
    }
  }

  componentWillMount() {
    // Get total of characters in db
    let total = Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=1`).then((res) => res.data.data.total)

    async function myfunc() {
      total = await total
      console.log(total)
      var quotient = Math.floor(y/x);
      var remainder = y % x;
    }

    myfunc()
    console.log()
    let offset = 0

    Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=1`)
      .then((res) => {
        this.setState({
          total: res.data.data.total
        })
      }).catch((err) => {
        console.log(err)
      })

    if (!ls.get('offset100')) {
      Axios.get(`http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}&limit=100&offset=${offset}`)
        .then((char) => {
          ls.set('offset100', JSON.stringify(char.data.data.results), 86400000)
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
  render() {
    return (
      <div className='App'>
        <div className='wrap'>
          <div className='character-list'>
            {this.state.chars.map((item, i) => {
              return <CharacterList key={i} data={item} />
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App
