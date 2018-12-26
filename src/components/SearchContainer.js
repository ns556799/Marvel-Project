import React, {Component} from 'react'
import Axios from 'axios'

import '../css/SearchContainer.css'
import CryptoJS from 'crypto-js'

let API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
let API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

let timer = null

class SearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  renderResults(e) {
    if (this.state.inputValue.length) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const searchQuery = encodeURIComponent((this.state.inputValue).trim())
        if (searchQuery.length) {
          console.log(searchQuery)
          Axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
            .then((res) => {
              console.log(res.data.data)
            })
            .catch((err) => { console.log(err) })
        }
      }, 1000)
    } else {
    }
  }
  render() {
    return (
      <div className='app-searchbar'>
        <div className='wrap'>
          <div className='app-searchbar__wrapper'>
            <input value={this.state.inputValue} onChange={e => this.updateInputValue(e)} onKeyDown={e => this.renderResults(e)} />
          </div>
          {this.renderResults(this.state.inputValue)}
        </div>
      </div>
    )
  }
}

export default SearchContainer
