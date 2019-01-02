import React, {Component} from 'react'

import '../css/ResultItem.css'

class ResItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charChecked: true
    }
  }

  handleChecked(e, name) {
    this.setState(prevState => ({
      charChecked: !prevState.charChecked
    }))
    console.log(this.state.charChecked)
    if (this.state.charChecked) {
      this.props.save(name)
    } else {
      this.props.remove(name)
    }
  }

  render() {
    const {name, id, thumbnail} = this.props.data
    const {path, extension} = thumbnail
    const imgUrl = `${path}.${extension}`
    return (
      <div className='result-item' onClick={this.handleChecked.bind(this, name)} data-name={name}>
        <div className='result-item__wrapper' data-name={name}
          style={{backgroundImage: 'url(' + imgUrl + ')'}} />
        {name}
        {id}
      </div>
    )
  }
}

export default ResItem
