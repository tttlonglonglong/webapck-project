import React, { Component } from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import Child from './child/child.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <p>{_.join(['this', ' is ', 'App'])}</p>
        <Child />
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'))
