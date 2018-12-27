import React, {Component} from 'react'

class ResItem extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    console.log(this.props)
    const {name, id} = this.props.data
    return (
      <div>
        {name}
        {id}
      </div>
    )
  }
}

export default ResItem
