import React, {Component} from 'react'
import CryptoJS from 'crypto-js'
import Axios from 'axios'

const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

class CharacterItem extends Component {
  handleClick(id, e) {
    Axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
      .then((res) => {
        const {id, name, description } = res.data.data.results[0]
        console.log(id, name, description)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    const {id, name, thumbnail} = this.props.data
    const {path, extension} = thumbnail
    const imgUrl = `${path}.${extension}`

    return (
      <div className='character-item' data-id={id} onClick={this.handleClick.bind(this, id)}>
        <div className='character-item__wrapper'
          style={{backgroundImage: 'url(' + imgUrl + ')'}} />
        <div className='character-item__name'>{name}</div>
      </div>
    )
  }
}

export default CharacterItem
