import * as React from 'react'
import ReactDOM from 'react-dom'

import './css.scss'

class HelloMessage extends React.Component<{ name?: string }> {
  render() {
    return <div>Hello {this.props.name}</div>
  }
}

window.onload = () => {
  ReactDOM.render(<HelloMessage name="name" />, document.getElementById('root'))
}
