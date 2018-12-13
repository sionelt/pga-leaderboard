import sortPlayers from './../../utils/sortPlayers'

describe('#sortPlayers util', () => {
  it('should return sorted list of players', () => {
    const unsorted = [
      {id: '1', firstName: 'Tiger', lastName: 'Woods', score: 40},
      {id: '1', firstName: 'Brooks', lastName: 'Koepka', score: 50},
      {id: '1', firstName: 'Tony', lastName: 'Finau', score: 40},
    ]
    const sorted = [
      {id: '1', firstName: 'Tony', lastName: 'Finau', score: 40},
      {id: '1', firstName: 'Tiger', lastName: 'Woods', score: 40},
      {id: '1', firstName: 'Brooks', lastName: 'Koepka', score: 50},
    ]
    expect(sortPlayers(unsorted)).toEqual(sorted)
  })
})
