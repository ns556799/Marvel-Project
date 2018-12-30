import React, {Component} from 'react'
import ResItem from './ResItem'

class ResultList extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const data = this.props.data
    return (
      <div className='result-container'>
        <div className='results-container__wrapper'>
          <span>Click a character to add them to the main screen</span>
          <button onClick={this.props.closeRes}> X </button>
        </div>
        {data.map((item, i) => {
          return <ResItem key={i} data={item} save={this.props.save} remove={this.props.remove} />
        })}
      </div>
    )
  }
}

export default ResultList
