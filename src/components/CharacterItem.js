import React, {Component} from 'react'

class CharacterItem extends Component {
    render() {
        const { id } = this.props.data;

        return(
            
          <div>{id}</div>  
        )
    }
}


export default CharacterItem