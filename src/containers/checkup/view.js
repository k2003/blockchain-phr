import React, { Component } from 'react'
class CheckupViewerPage extends Component {
  state = {}
  render() {
    const id = this.props.match.params.id
    return (
      <div className='containerMain'>
        <div className='card'>
         {id}
        </div>
      </div>
    )
  }
}

export default CheckupViewerPage