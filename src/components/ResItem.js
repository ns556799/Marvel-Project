import React, {Component} from 'react'

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
    const {name, id} = this.props.data
    return (
      <div onClick={this.handleChecked.bind(this, name)} data-name={name}>
        {name}
        {id}
      </div>
    )
  }
}

export default ResItem
