import React from 'react'
import ReactDOM from 'react-dom'

import Posts from '../components/Posts';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Posts/>,
    document.body.appendChild(document.createElement('div')),
  )
})