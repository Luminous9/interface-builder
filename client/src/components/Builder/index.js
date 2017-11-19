// page for building interfaces
import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import uniqid from 'uniqid'
import styles from './builder.module.css'

class Builder extends Component {
  constructor() {
    super()
    this.state = {
      freeze: false,
      gridStyles: {
        rows: [150, 150, 150], // unit is pixels (px)
        columns: [1, 1] // unit is fractions (fr)
      },
      gridData: [
        [
          {
            fields: [
              { value: 'testing0', id: uniqid('field-') },
              { value: 'testing1', id: uniqid('field-') }
            ],
            cellId: uniqid('cell-')
          },
          {
            fields: [{ value: 'testing2', id: uniqid('field-') }],
            cellId: uniqid('cell-')
          }
        ],
        [
          {
            fields: [{ value: 'testing3', id: uniqid('field-') }],
            cellId: uniqid('cell-')
          },
          {
            fields: [{ value: 'testing4', id: uniqid('field-') }],
            cellId: uniqid('cell-')
          }
        ],
        [
          {
            fields: [{ value: 'testing5', id: uniqid('field-') }],
            cellId: uniqid('cell-')
          },
          {
            fields: [],
            cellId: uniqid('cell-')
          }
        ]
      ],
      borderSize: 0 // unit is pixels (px)
    }
  }

  toggleGrid = () => {
    this.setState(prevState => {
      if (prevState.borderSize === 0) {
        return {
          borderSize: 1
        }
      } else {
        return {
          borderSize: 0
        }
      }
    })
  }

  getGridStyles = () => {
    const { rows, columns } = this.state.gridStyles
    return {
      gridTemplateRows: rows.reduce((total, row) => `${total} ${row}px`, ''),
      gridTemplateColumns: columns.reduce((total, column) => `${total} ${column}fr`, '')
    }
  }

  getCellStyles = rowHeight => {
    const { borderSize } = this.state
    return {
      margin: `0 -${borderSize}px 0 0`,
      height: rowHeight - borderSize + 'px'
    }
  }

  onDragStart = () => {
    this.setState({
      freeze: true
    })
    document.body.classList.toggle('dragging', true)
  }

  onDragEnd = () => {
    this.setState({
      freeze: false
    })
    document.body.classList.toggle('dragging', false)
  }

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <div className={styles.builder}>
          <h2>Interface Builder</h2>
          <button onClick={this.toggleGrid}>Toggle Grid</button>
          <div className={styles.grid} style={this.getGridStyles()}>
            {this.state.gridData.map((row, rowIndex) => {
              const rowHeight = this.state.gridStyles.rows[rowIndex]
              return row.map((column, colIndex) => {
                const cellId = this.state.gridData[rowIndex][colIndex].cellId
                return (
                  // cell
                  <Droppable key={cellId} droppableId={cellId} direction="horizontal">
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        className={styles.cell}
                        style={this.getCellStyles(rowHeight)}
                      >
                        {this.state.gridData[rowIndex][colIndex].fields.map(field => {
                          return (
                            // individual field
                            <div key={field.id} className={styles.field}>
                              {field.value}
                            </div>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )
              })
            })}
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default Builder
