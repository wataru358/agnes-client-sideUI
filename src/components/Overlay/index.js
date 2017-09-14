import React from 'react'
import styles from './styles.css'

const Overlay = ({onClick}) => {
  return (
      <div
        className={styles.overlay}
        onClick={onClick}
      >
      </div>
  )
}

export default Overlay
