import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Counter extends Component {
  render() {
    return (
      <div>
        <Header />
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <div>0</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter
