import React, { Component } from 'react'
import Builder from '../Builder'
import styles from './app.module.css'

class App extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     text: 'Not Connected',
  //     interfaces: []
  //   }
  // }

  render() {
    return (
      <div className={styles.app}>
        <h1>Keeper</h1>
        <p>Demo below:</p>
        <Builder />
      </div>
    )
  }
}

export default App
