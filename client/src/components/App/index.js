import React, { Component } from 'react'
import { getApiVersion, getInterfaces } from '../../client'
import './app.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      text: 'Not Connected',
      interfaces: []
    }
  }

  componentDidMount() {
    getApiVersion().then(res => {
      this.setState({ text: res.message })
    })

    getInterfaces().then(res => {
      this.setState({ interfaces: res })
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.text}</p>
        <p>Stored interfaces:</p>
        {this.state.interfaces.map((gameInterface, i) => {
          return <p key={i}>{`${gameInterface.name} by ${gameInterface.author}`}</p>
        })}
      </div>
    )
  }
}

export default App
