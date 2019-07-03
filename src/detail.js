import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  render() {
    return (
      <div>
        <p>This is list detail</p>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
