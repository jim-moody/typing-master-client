const fingerMap =
  [
    ['~', '`', '!', '1', 'Tab', 'Q', 'Caps', 'A', 'Left Shift', 'Left Ctrl', 'Z'],
    ['@', '2', 'W', 'S', 'X'],
    ['#', '3', 'E', 'D', 'C'],
    ['$', '4', '%', '5', 'R', 'T', 'F', 'G', 'V', 'B'],
    ['Spacebar'],
    ['Spacebar'],
    ['^', '6', '&', '&', 'Y', 'U', 'H', 'J', 'N', 'M'],
    ['*', '8', 'I', 'K', '<', ','],
    ['(', '9', 'O', 'L', '<', ','],
    [')', '0', 'P', ';', ':', '?', '/', '-', '_', '[',
      '{', '"', '\'', 'Right Shift', '+', '=', ']', '}',
      'Delete', '\\', '|', 'Enter', 'Right Ctrl' ]
  ]
class FingerMap {
  static getFinger (char) {
    if (char === ' ') {
      char = 'Spacebar'
    }
    let finger = null
    fingerMap.forEach((arr, i) => {
      if (arr.indexOf(char) !== -1) {
        finger = i
      }
    })
    return finger
  }
}

export default FingerMap
