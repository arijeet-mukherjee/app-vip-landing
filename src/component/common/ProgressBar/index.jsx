import React from 'react'
import './progressbar.module.css';

function ProgressBar({ value }) {
  return (
    <>
      <div role="progressbar" style={{ '--value': value }}></div>
    </>
  )
}

export default ProgressBar
