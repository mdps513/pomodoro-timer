import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Pomodoro extends Component {
  constructor (props) {
    super(props)
    // 初期値
    this.state = {
      isLive: false,
      curTime: 0,
      startTime: 0,
      setTime: 0 
    }
    this.timerId = 0
  }
  
  componentWillMount() {
    this.timerId = setInterval(e => {
      this.tick()
    }, 1000)
  }
  
  componentWillUnmount() {
    clearInterval(this.timerId)
  }
  
  tick () {
    if (this.state.isLive) {
      const v = new Date().getTime()
      this.setState({curTime: v})
    }
  }
  
  clickHandler (e) {
    if (this.state.isLive) {
      this.setState({isLive: false})
      return
    }
    const v = new Date().getTime()
    this.setState({
      curTime: v,
      startTime: v,
      setTime: 1500000,
      isLive: true})
  };
  
  getDisp () {
    const state = this.state
    const delta = state.curTime - state.startTime
    const t = Math.floor(delta / 1000)
    const s = 
    const ss = state.setTime - t % 60
    const m = Math.floor(t / 60)
    const mm = m % 60
    const z = (num) => {
      const s = '00' + String(num)
      return state.substr(state.length - 2, 2)
    }
    return <span className='disp'>
      {z(mm)}:{z(ss)}
    </span>
  }
  
  render () {
    let label = 'START'
    if (this.state.isLive) {
      label = 'STOP'
    }
    const disp = this.getDisp()
    const fclick = (e) => this.clickHandler(e)
    return (
      <div className='Pomodoro'>
        <div>{disp}</div>
        <button onClick={fclick}>{label}</button>
      </div>)
  }
}

ReactDOM.render(
  <Pomodoro />,
  document.getElementById('root'))