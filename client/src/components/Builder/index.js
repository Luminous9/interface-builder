// page for building interfaces
import React, { Component } from 'react'
import styles from './builder.module.css'

class Builder extends Component {
  constructor() {
    super()
    this.state = {
      grid: {
        rows: [200, 200, 200], // unit is pixels (px)
        columns: [1, 1], // unit is fractions (fr)
        borderSize: 1 // unit is pixels (px)
      },
      fields: []
    }
  }

  getGridStyles = () => {
    const { rows, columns } = this.state.grid
    return {
      gridTemplateRows: rows.reduce((total, row) => `${total} ${row}px`, ''),
      gridTemplateColumns: columns.reduce((total, column) => `${total} ${column}fr`, '')
    }
  }

  getCellStyles = rowHeight => {
    const { borderSize } = this.state.grid
    return {
      margin: `0 -${borderSize}px 0 0`,
      height: rowHeight - borderSize + 'px'
    }
  }

  render() {
    const { rows, columns } = this.state.grid
    return (
      <div className={styles.builder}>
        <h2>Interface Builder</h2>
        <div className={styles.grid} style={this.getGridStyles()}>
          {rows.map(row => {
            return columns.map((column, i) => {
              return <div key={i} className={styles.cell} style={this.getCellStyles(row)} />
            })
          })}
        </div>
      </div>
    )
  }
}

export default Builder
