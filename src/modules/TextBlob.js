
const TextBlob = function (text) {
  this.text = text.trim()
  this.target = 0
  this.text.charAt(0)
  this.mistakes = 0
  this.correct = 0
  this.total = this.text.length
}

TextBlob.prototype.characters = function () {
  return this.text.split('')
}
TextBlob.prototype.validate = function (userInput) {
  const character = this.characters()[this.target]

  if (character === userInput) {
    return true
  }
  this.mistakes++
  return false
}

TextBlob.prototype.targetElement = function () {
  return $(`#${this.target}`)
}

TextBlob.prototype.accuracy = function () {
  let number = (this.target - this.mistakes) / this.target * 100
  number = number % 1 !== 0 ? number.toFixed(1) : Math.round(number)
  return number
}

export default TextBlob
