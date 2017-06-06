class Score {
  static formatTime (timeInSeconds) {
    let time = parseFloat(timeInSeconds)
    if (time >= 1 || time === 0) {
      return time.toFixed()
    }
    return time.toFixed(1)
  }
  static wpm (totalCharacters, timeInSeconds) {
    const wpm = Math.round((totalCharacters / 5) / (timeInSeconds / 60)) || 0
    if (wpm === Infinity) {
      return 1000
    }
    return wpm
  }
  static accuracy (total, mistakes) {
    const accuracy = Math.round(((total - mistakes) / total) * 100) || 0
    return accuracy
  }
}

export default Score
