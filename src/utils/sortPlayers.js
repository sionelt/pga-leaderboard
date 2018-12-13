const sortPlayers = players => {
  return [...players].sort((a, b) => {
    const {lastName: aLastName, score: aScore} = a
    const {lastName: bLastName, score: bScore} = b

    if (aScore === bScore) {
      return aLastName.localeCompare(bLastName)
    }

    return aScore > bScore ? 1 : -1
  })
}

export default sortPlayers
