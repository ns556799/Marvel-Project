import React, {Component} from 'react'
import Axios from 'axios'

import '../css/SearchContainer.css'
import CryptoJS from 'crypto-js'
import ResultList from './ResultList'

let API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
let API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

class SearchContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      charResults: [],
      selectedResults: []
    }
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    })
  }

  searchCharacters() {
    const searchQuery = this.state.inputValue
    Axios.get(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${searchQuery}&ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
      .then((res) => {
        this.setState({
          charResults: [...this.state.charResults, [].concat.apply([], res.data.data.results)]
        })
      })
  }

  saveCharacter(e, name) {
    console.log('add', e.target.dataset.name)
    console.log('add', e.target)
    this.setState({
      selectedResults: [...this.state.selectedResults, e.target.dataset.name]
    })
  }
  removeCharacter(e, name) {
    console.log('remove', e.target.dataset.name)
    let array = [...this.state.selectedResults] // make a separate copy of the array
    let index = array.indexOf(e.target.dataset.name)
    if (index !== -1) {
      array.splice(index, 1)
      this.setState({selectedResults: array})
    }
  }

  onCloseResultList() {
    this.props.closeResults(this.state.selectedResults)
    this.setState({
      inputValue: '',
      charResults: [],
      selectedResults: []
    })
  }

  render() {
    return (
      <div className='app-searchbar'>
        <div className='wrap'>
          <div className='app-searchbar__wrapper'>
            <input value={this.state.inputValue} onChange={e => this.updateInputValue(e)} />
            <button onClick={this.searchCharacters.bind(this)}>Search</button>
          </div>
          { this.state.charResults.map((item, i) => {
            return <ResultList key={i} data={item} save={this.saveCharacter.bind(this)}
              remove={this.removeCharacter.bind(this)} closeRes={this.onCloseResultList.bind(this)} />
          })}
        </div>
      </div>
    )
  }
}

export default SearchContainer
