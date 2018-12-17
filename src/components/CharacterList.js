import React, {Component} from 'react'
import CharacterItem from './CharacterItem'

class CharacterList extends Component {
    render() {
        const data = this.props.data
        return(
           data.map((item, i) => {
               return <CharacterItem key = {i} data={item} />
           })
        )
    }
}

export default CharacterList