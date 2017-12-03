import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'
import styles from './draggableField.module.css'

const DraggableField = ({ id, width, value, spacing, adjustSize, placeholderWidth }) => {
  const getFieldStyles = (draggableStyle, isDragging) => {
    const styles = {
      margin: `0 ${spacing}px`,
      userSelect: 'none',
      ...draggableStyle
    }
    if (typeof width === 'number') {
      styles.width = width
    } else if (width === 'auto') {
      if (styles.transform && adjustSize) {
        const transformX = parseInt(styles.transform.match(/([-0-9])+(?=px,)/g)[0], 10)
        if (transformX < 0) {
          styles.transform = `translate(-${placeholderWidth}px, 0px)`
        } else {
          styles.transform = `translate(${placeholderWidth}px, 0px)`
        }
      }
    } else {
      console.log('ERROR: invalid field width')
    }
    return styles
  }

  return (
    <Draggable draggableId={id}>
      {(provided, snapshot) => {
        const placeholder = provided.placeholder ? <div key={'b' + id}>{provided.placeholder}</div> : null
        return [
          <div
            key={'a' + id}
            ref={provided.innerRef}
            className={styles.field}
            {...provided.dragHandleProps}
            style={getFieldStyles(provided.draggableStyle, snapshot.isDragging)}
          >
            {value}
          </div>,
          placeholder
        ]
      }}
    </Draggable>
  )
}

DraggableField.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  value: PropTypes.string,
  spacing: PropTypes.number.isRequired,
  adjustSize: PropTypes.bool.isRequired,
  placeholderWidth: PropTypes.number
}

DraggableField.defaultProps = {
  value: '',
  placeholderWidth: null
}

export default DraggableField
