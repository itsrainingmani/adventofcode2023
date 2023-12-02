import { parseLines, readInput } from 'io'

const input = await readInput('day-02')
// const input = await readInput('day-02', 'example')

type Bag = {
  red: number
  blue: number
  green: number
}

const gameID = (l: string): number => {
  return Number(l.split(':')[0].split(' ')[1])
}

const parseGame = (l: string) => {
  const gameBag: Bag = { red: 0, blue: 0, green: 0 }

  for (const balls of l.split(', ')) {
    const [ball, color] = balls.split(' ')
    const ball_ct = Number(ball)
    gameBag[color as keyof typeof gameBag] = ball_ct
  }

  return gameBag
}

export const part1 = () => {
  const lines = parseLines(input)
  const small_bag = { red: 12, blue: 14, green: 13 }

  let game_id_sum = 0

  for (const l of lines) {
    const id = gameID(l)
    const games = l.split(':')[1].trim().split('; ')

    const possible = games.every((game) => {
      const g = parseGame(game)
      return g.red <= small_bag.red && g.blue <= small_bag.blue && g.green <= small_bag.green
    })

    if (possible) {
      game_id_sum += id
    }
  }

  return game_id_sum
}

const cubesPower = (cube: Bag): number => {
  return cube.red * cube.blue * cube.green
}

const calculateMinCubes = (accum: Bag, cur: Bag): Bag => {
  if (cur.red > accum.red) {
    accum.red = cur.red
  }
  if (cur.blue > accum.blue) {
    accum.blue = cur.blue
  }
  if (cur.green > accum.green) {
    accum.green = cur.green
  }

  return accum
}

export const part2 = () => {
  const lines = parseLines(input)
  let sum_powers = 0
  for (const l of lines) {
    const games = l.split(':')[1].trim().split('; ')
    const min_cubes = games.map((g) => parseGame(g)).reduce(calculateMinCubes, { red: 0, blue: 0, green: 0 })

    const power = cubesPower(min_cubes)
    console.log(min_cubes)

    sum_powers += power
  }

  return sum_powers
}
