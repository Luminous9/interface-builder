import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styles from './draggableField.module.css'

const DraggableField = props => {
  const getFieldStyles = (draggableStyle, isDragging, ref) => {
    const styles = {
      userSelect: 'none',
      ...draggableStyle
    }
    let maxWidth
    console.log(ref.clientWidth, props.spacing, props.fieldCount)
    if (styles.transform && !styles.hasOwnProperty('position')) {
      maxWidth = (ref.clientWidth - props.spacing * props.fieldCount) / (props.fieldCount + 1)
      styles.transform = 'translate(200px, 0px)'
    } else {
      maxWidth = (ref.clientWidth - props.spacing * (props.fieldCount - 1)) / props.fieldCount
    }
    styles.maxWidth = maxWidth
    return styles
  }

  return (
    <Draggable draggableId={props.id}>
      {(provided, snapshot) => {
        const placeholder = provided.placeholder ? (
          <div key={'b' + props.id}>{provided.placeholder}</div>
        ) : null
        return [
          <div
            key={'a' + props.id}
            ref={provided.innerRef}
            className={styles.field}
            {...provided.dragHandleProps}
            style={getFieldStyles(provided.draggableStyle, snapshot.isDragging, props.rowRef)}
          >
            {props.value}
          </div>,
          placeholder
        ]
      }}
    </Draggable>
  )
}

DraggableField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  rowRef: PropTypes.object,
  spacing: PropTypes.number.isRequired,
  fieldCount: PropTypes.number.isRequired
}

DraggableField.defaultProps = {
  value: ''
}

export default DraggableField
