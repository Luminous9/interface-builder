import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styles from './draggableField.module.css'

const DraggableField = props => {
  return (
    <Draggable draggableId={props.id}>
      {(provided, snapshot) => {
        return [
          <div
            key={props.id + 'a'}
            ref={provided.innerRef}
            className={styles.field}
            {...provided.dragHandleProps}
            style={props.getStyles(provided.draggableStyle, snapshot.isDragging)}
          >
            {props.value}
          </div>,
          provided.placeholder
        ]
      }}
    </Draggable>
  )
}

DraggableField.propTypes = {
  id: PropTypes.string.isRequired,
  getStyles: PropTypes.func.isRequired,
  value: PropTypes.string
}

DraggableField.defaultProps = {
  value: ''
}

export default DraggableField
