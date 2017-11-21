// page for building interfaces
import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import uniqid from 'uniqid'
import DraggableField from '../DraggableField'
import styles from './builder.module.css'

class Builder extends Component {
  constructor() {
    super()
    this.state = {
      gridStyles: {
        rows: [150, 150, 150], // unit is pixels (px)
        columns: [1, 1] // unit is fractions (fr)
      },
      gridData: [
        [
          {
            fields: [{ value: 'testing0', id: uniqid('f-') }, { value: 'testing1', id: uniqid('f-') }],
            cellId: uniqid('c-')
          },
          {
            fields: [{ value: 'testing2', id: uniqid('f-') }],
            cellId: uniqid('c-')
          }
        ],
        [
          {
            fields: [{ value: 'testing3', id: uniqid('f-') }],
            cellId: uniqid('c-')
          },
          {
            fields: [{ value: 'testing4', id: uniqid('f-') }],
            cellId: uniqid('c-')
          }
        ],
        [
          {
            fields: [{ value: 'testing5', id: uniqid('f-') }],
            cellId: uniqid('c-')
          },
          {
            fields: [{ value: 'testing6', id: uniqid('f-') }],
            cellId: uniqid('c-')
          }
        ]
      ],
      spacing: 2 // unit is pixels (px)
    }
  }

  generateLayout = () => {
    return this.state.gridData.map((row, rowIndex) => {
      return row.map((column, colIndex) => {
        const cellId = this.state.gridData[rowIndex][colIndex].cellId
        return (
          // cell
          <Droppable key={cellId} droppableId={cellId} direction="horizontal">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={styles.cell}
                style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'grey' }}
              >
                {this.state.gridData[rowIndex][colIndex].fields.map(field => {
                  return (
                    <DraggableField
                      key={field.id}
                      id={field.id}
                      value={field.value}
                      getStyles={(draggableStyle, isDragging) => {
                        return this.getFieldStyles(draggableStyle, isDragging, rowIndex, colIndex)
                      }}
                    />
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )
      })
    })
  }

  getGridStyles = () => {
    const { rows, columns } = this.state.gridStyles
    const { spacing } = this.state
    return {
      gridTemplateRows: rows.reduce((total, row) => `${total} ${row}px`, ''),
      gridTemplateColumns: columns.reduce((total, column) => `${total} ${column}fr`, ''),
      gridGap: spacing,
      padding: `${spacing}px`
    }
  }

  getFieldStyles = (draggableStyle, isDragging, row, col) => {
    const styles = {
      userSelect: 'none',
      ...draggableStyle
    }
    return styles
  }

  increaseSpacing = () => {
    this.setState(prevState => {
      return {
        spacing: prevState.spacing + 1
      }
    })
  }

  decreaseSpacing = () => {
    this.setState(prevState => {
      if (prevState.spacing === 0) {
        return {}
      } else {
        return {
          spacing: prevState.spacing - 1
        }
      }
    })
  }

  findCellById = (gridData, searchId) => {
    let result = undefined
    for (var row = 0; row !== gridData.length; row++) {
      result = gridData[row].find(cell => cell.cellId === searchId)
      if (result !== undefined) {
        return result
      }
    }
    return result
  }

  reorderFields = (gridData, cellId, startIndex, endIndex) => {
    const cell = this.findCellById(gridData, cellId)
    const newFields = JSON.parse(JSON.stringify(cell.fields))
    const movedField = newFields.splice(startIndex, 1)
    newFields.splice(endIndex, 0, movedField[0])
    cell.fields = newFields
    return gridData
  }

  moveFields = (gridData, startId, startIndex, endId, endIndex) => {
    const startCell = this.findCellById(gridData, startId)
    const endCell = this.findCellById(gridData, endId)
    // make deep copies of fields arrays
    const newStartFields = JSON.parse(JSON.stringify(startCell.fields))
    const newEndFields = JSON.parse(JSON.stringify(endCell.fields))

    const movedField = newStartFields.splice(startIndex, 1)
    startCell.fields = newStartFields
    newEndFields.splice(endIndex, 0, movedField[0])
    endCell.fields = newEndFields

    return gridData
  }

  onDragStart = () => {
    document.body.classList.toggle('dragging', true)
  }

  onDragEnd = result => {
    const { source, destination } = result
    document.body.classList.toggle('dragging', false)
    if (!destination) {
      // dropped outside of any droppables
      return
    }
    this.setState(prevState => {
      let newGridData
      if (source.droppableId !== destination.droppableId) {
        newGridData = this.moveFields(
          prevState.gridData,
          source.droppableId,
          source.index,
          destination.droppableId,
          destination.index
        )
      } else {
        newGridData = this.reorderFields(
          prevState.gridData,
          source.droppableId,
          source.index,
          destination.index
        )
      }
      return { gridData: newGridData }
    })
  }

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
        <div className={styles.builder}>
          <h2>Interface Builder</h2>
          <button onClick={this.increaseSpacing}>+ Spacing</button>
          <button onClick={this.decreaseSpacing}>- Spacing</button>
          <div className={styles.grid} style={this.getGridStyles()}>
            {this.generateLayout()}
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default Builder
