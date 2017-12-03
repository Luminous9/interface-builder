import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import styles from './droppableRow.module.css'

class DroppableRow extends Component {
  constructor() {
    super()
    this.state = {}
  }

  getPlaceholderWidth = () => {
    const { draggedField, flexChildren, flexSpacePercent } = this.props
    if (draggedField) {
      if (draggedField.width === 'auto') {
        return this.rowRef.clientWidth * flexSpacePercent / 100 / (flexChildren + 1)
      } else if (typeof draggedField.width === 'number') {
        return draggedField.width
      } else {
        console.log('ERROR: placeholder width could not be determined')
      }
    }
    return null
  }

  getPlaceholderStyle = () => {
    const { draggedField, spacing } = this.props
    const placeholderStyle = { margin: `0 ${spacing}px` }
    if (draggedField) {
      if (draggedField.width === 'auto') {
        placeholderStyle.flexGrow = '1'
      } else if (typeof draggedField.width === 'number') {
        placeholderStyle.width = draggedField.width
      } else {
        console.log('ERROR: placeholder width could not be determined')
      }
    }
    return placeholderStyle
  }

  render() {
    return (
      <Droppable droppableId={this.props.id} direction="horizontal">
        {(provided, snapshot) => {
          const refHandler = ref => {
            if (ref) {
              this.rowRef = ref
              provided.innerRef(ref)
            }
          }
          return (
            <div
              ref={refHandler}
              className={styles.row}
              style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'grey' }}
            >
              {this.rowRef
                ? this.props.children(provided.placeholder ? true : false, this.getPlaceholderWidth())
                : null}
              {this.rowRef && provided.placeholder ? <div style={this.getPlaceholderStyle()} /> : null}
            </div>
          )
        }}
      </Droppable>
    )
  }
}

DroppableRow.propTypes = {
  id: PropTypes.string.isRequired,
  flexChildren: PropTypes.number.isRequired,
  flexSpacePercent: PropTypes.number.isRequired,
  spacing: PropTypes.number.isRequired,
  draggedField: PropTypes.object,
  children: PropTypes.func
}

DroppableRow.defaultProps = {
  draggedField: null,
  children: null
}

export default DroppableRow
