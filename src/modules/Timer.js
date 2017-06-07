
let t = 0
class Timer {
  static startTimer = () => {
    const intervalId = setInterval(() => {
      t = parseFloat(t) + 0.1
      t = t.toFixed(1)
    }, 100)
    return intervalId
  }
  static stopTimer = (intervalId) => {
    clearInterval(intervalId)
  }
  static getTime () {
    return t
  }
}

export default Timer
