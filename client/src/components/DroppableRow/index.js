import React from 'react'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import styles from './droppableRow.module.css'

const DroppableRow = props => {
  return (
    <Droppable droppableId={props.id} direction="horizontal">
      {(provided, snapshot) => {
        const size = { width: 200 }
        const newPlaceholder = provided.placeholder ? React.cloneElement(provided.placeholder, size) : null
        const refHandler = ref => {
          if (ref) {
            this.ref = ref
            provided.innerRef(ref)
          }
        }
        return (
          <div
            ref={refHandler}
            className={styles.row}
            style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'grey' }}
          >
            {this.ref ? props.children(this.ref) : null}
            {this.ref ? newPlaceholder : null}
          </div>
        )
      }}
    </Droppable>
  )
}

DroppableRow.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.func
}

DroppableRow.defaultProps = {
  children: null
}

export default DroppableRow
