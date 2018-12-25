import React, {Component} from 'react'
import '../css/Searchbar.css'

class Searchbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='app-searchbar'>
        <div className='wrap'>
          <div className='app-searchbar__wrapper'>
            <input type='text' placeholder='Search' />
          </div>
        </div>
      </div>
    )
  }
}

export default Searchbar
