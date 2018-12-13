import Validator from 'validatorjs'

const validateFields = (...args) => {
  const validation = new Validator(...args)
  return {
    isValid: validation.passes(),
    errors: validation.errors.errors,
  }
}

export default validateFields
