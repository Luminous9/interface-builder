// page for building interfaces
import React, { Component } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import uniqid from 'uniqid'
import DroppableRow from '../DroppableRow'
import DraggableField from '../DraggableField'
import styles from './builder.module.css'

class Builder extends Component {
  constructor() {
    super()
    this.state = {
      gridStyles: {
        rows: [150, 150, 150], // unit is pixels (px)
        columns: [1] // unit is fractions (fr)
      },
      gridData: [
        {
          fields: [{ value: 'testing0', id: uniqid('f-') }, { value: 'testing1', id: uniqid('f-') }],
          rowId: uniqid('c-')
        },
        {
          fields: [{ value: 'testing3', id: uniqid('f-') }],
          rowId: uniqid('c-')
        },
        {
          fields: [{ value: 'testing5', id: uniqid('f-') }],
          rowId: uniqid('c-')
        }
      ],
      spacing: 2 // unit is pixels (px)
    }
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

  findRowById = (gridData, searchId) => {
    let result = undefined
    for (var row = 0; row !== gridData.length; row++) {
      result = gridData.find(row => row.rowId === searchId)
      if (result !== undefined) {
        return result
      }
    }
    return result
  }

  reorderFields = (gridData, rowId, startIndex, endIndex) => {
    const row = this.findRowById(gridData, rowId)
    const newFields = JSON.parse(JSON.stringify(row.fields))
    const movedField = newFields.splice(startIndex, 1)
    newFields.splice(endIndex, 0, movedField[0])
    row.fields = newFields
    return gridData
  }

  moveFields = (gridData, startId, startIndex, endId, endIndex) => {
    // find target rows in state
    const startrow = this.findRowById(gridData, startId)
    const endrow = this.findRowById(gridData, endId)
    // make deep copies of fields arrays
    const newStartFields = JSON.parse(JSON.stringify(startrow.fields))
    const newEndFields = JSON.parse(JSON.stringify(endrow.fields))
    // move field
    const movedField = newStartFields.splice(startIndex, 1)
    newEndFields.splice(endIndex, 0, movedField[0])
    // assign modified fields arrays back to rows
    startrow.fields = newStartFields
    endrow.fields = newEndFields

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
            {this.state.gridData.map(row => {
              const rowId = row.rowId
              return (
                <DroppableRow key={rowId} id={rowId}>
                  {rowRef =>
                    row.fields.map(field => (
                      <DraggableField
                        key={field.id}
                        id={field.id}
                        value={field.value}
                        rowRef={rowRef}
                        spacing={this.state.spacing}
                        fieldCount={row.fields.length}
                      />
                    ))}
                </DroppableRow>
              )
            })}
          </div>
        </div>
      </DragDropContext>
    )
  }
}

export default Builder
