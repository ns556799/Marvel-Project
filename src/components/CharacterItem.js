import React, {Component} from 'react'

class CharacterItem extends Component {
    render() {
        const { id, name, thumbnail,  } = this.props.data;
        const {path, extension} = thumbnail

        return(
            
          <div>
              <p>{name}</p>
              <p>{id}</p>
              <img src={`${path}.${extension}`} />
          </div>  
        )
    }
}


export default CharacterItem