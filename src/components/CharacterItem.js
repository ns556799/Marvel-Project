import React, {Component} from 'react'
import CryptoJS from 'crypto-js'
import Axios from 'axios'
import '../css/CharacterItem.css'

const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY

const ts = new Date().getTime()
const hash = CryptoJS.MD5(ts + API_PRIVATE_KEY + API_PUBLIC_KEY).toString()

class CharacterItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ShowDescription: false
    }
  }

  handleClick(id, e) {
    this.setState({ShowDescription: !this.state.ShowDescription})
  }

  render() {
    const {id, name, thumbnail, description, comics, events, resourceURI, series, stories, urls} = this.props.data
    const {path, extension} = thumbnail
    const imgUrl = `${path}.${extension}`

    const {available, collectionURI, items} = comics

    const GetDescription = () => {
      if (this.state.ShowDescription) {
        if (description) {
          return (
            <div className='character-item__description'>
              {description}
            </div>
          )
        } else {
          return (
            <div className='character-item__description'>
                'No description available'
            </div>
          )
        }
      } else {
        return null
      }
    }

    return (
      <div className='character-item' data-id={id} onClick={this.handleClick.bind(this, id)}>
        <div className=' character-item__wrapper'
          style={{backgroundImage: 'url(' + imgUrl + ')'}}>
          <div className='character-overlay'>
            <div className='character-item__name'>
              {name}
            </div>
          </div>
        </div>
        <GetDescription />
      </div>
    )
  }
}

export default CharacterItem
