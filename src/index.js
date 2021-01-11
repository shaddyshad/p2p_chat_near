import React from 'react'
import ReactDOM from 'react-dom'
import App from './_app'
import { initContract } from './utils'
import 'antd/dist/antd.css'

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
      <App />,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
