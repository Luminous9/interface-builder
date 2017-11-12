import React, { Component } from 'react'
import { test } from '../../client'
import './app.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Not Connected'
    }
  }

  componentDidMount() {
    test().then(res => {
      this.setState({ text: res.message })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.text}</p>
      </div>
    )
  }
}

export default App
