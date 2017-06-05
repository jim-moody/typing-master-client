
class Validator {
  constructor (fields, errors) {
    this.fields = fields
    this.errors = errors
  }
  get formErrors () {
    for (let fieldName in this.fields) {
      this.errors[fieldName] = !this.fields[fieldName] && 'This is a required field'
    }
    return this.errors
  }

  get updatedPasswordConfirmError () {
    const { password, passwordConfirmation } = this.fields

    // if not already in error
    if (!this.errors.passwordConfirmation) {
      // if password exists and passwordconfirm exists and not equal
      if (password && passwordConfirmation && password !== passwordConfirmation) {
        this.errors.passwordConfirmation = 'Passwords must match'
      }
    }
    return this.errors
  }

  static passwordsMatch () {
    return this.errors.password === this.errors.passwordConfirmation
  }

  fieldErrors (fieldName, newValue) {
    this.errors[fieldName] = newValue ? '' : this.errors[fieldName]
    return this.errors
  }

  get errorExists () {
    return Object.values(this.errors).some(e => e)
  }
}
export default Validator
