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
    let accuracy = Math.round(((total - mistakes) / total) * 100)
    if (!accuracy || accuracy < 0) {
      accuracy = 0
    }
    return accuracy
  }
  static averageWpm (scores) {
    const sum = scores.reduce((acc, score) => acc + score.wpm, 0)
    return Math.round(sum / scores.length)
  }
  static averageAccuracy (scores) {
    const sum = scores.reduce((acc, score) => {
      return acc + this.accuracy(score.exerciseLength, score.mistakes)
    }, 0)
    return Math.round(sum / scores.length)
  }
  static difficulty (scores) {
    const wpm = this.averageWpm(scores)
    const acc = this.averageAccuracy(scores)
    const wWpm = (wpm / 100) * 0.5
    const wAcc = (acc / 100) * 0.5
    let difficulty = Math.round((wWpm + wAcc) * 10)
    if (difficulty > 10) {
      difficulty = 10
    }
    return difficulty
  }
}

export default Score
