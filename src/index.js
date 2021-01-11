import React from 'react'
import ReactDOM from 'react-dom'
import App from './_app'
import { initContract } from './utils'
import 'antd/dist/antd.css'
import './global.css'
import {ThemeProvider, createMuiTheme} from '@material-ui/core'

const theme = createMuiTheme();

window.nearInitPromise = initContract()
  .then(() => {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      ,
      document.querySelector('#root')
    )
  })
  .catch(console.error)
