import Validator from 'validatorjs'
import validateFields from './../../utils/validateFields'

const mockPasses = jest.fn(() => true)

jest.mock('validatorjs', () => {
  return jest.fn().mockImplementation(() => ({
    passes: mockPasses,
    errors: {errors: {}},
  }))
})

describe('#validateFields util', () => {
  beforeEach(() => {
    Validator.mockClear()
    mockPasses.mockClear()
  })

  it('should return validate field data from validatorjs', () => {
    const validationResponse = validateFields(
      {fieldName: 'Tony'},
      {fieldName: 'required'},
      {required: 'required!'},
    )
    expect(Validator).toHaveBeenCalledTimes(1)
    expect(mockPasses).toHaveBeenCalledTimes(1)
    expect(validationResponse).toEqual({isValid: true, errors: {}})
  })
})
