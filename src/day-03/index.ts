import { parseLines, readInput } from 'io'
import { canBeNum, sum } from 'utils'

const input = await readInput('day-03')
// const input = await readInput('day-03', 'example1')

type Pos = [row: number, col: number]

type Engine = {
  width: number
  height: number
  schematic: string[][]
  valid_parts: number[]
}

const isSymbol = (c: string): boolean => {
  const not_symbols = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  return not_symbols.every((s) => s !== c)
}

const validPositions = (e: Engine, pos: Pos) => {
  const [row, col] = pos
  const nearbies = [[row - 1, col - 1], [row - 1, col], [row - 1, col + 1], [row, col - 1], [row, col + 1], [row + 1, col - 1], [row + 1, col], [row + 1, col + 1]]
    .filter((pos) => {
      return pos[0] >= 0 && pos[0] < e.height && pos[1] >= 0 && pos[1] < e.width
    })

  return nearbies
}

const isPartNumber = (e: Engine, pos: Pos): boolean => {
  const nearbies = validPositions(e, pos)
  // console.log(nearbies)
  return nearbies.map((pos) => isSymbol(e.schematic[pos[0]][pos[1]])).includes(true)
}

export const part1 = () => {
  const lines = parseLines(input)
  for (let i = 0; i < lines.length; i++) {
    lines[i] += '.'
  }
  const engine: Engine = {
    schematic: lines.map((l) => l.split('')),
    height: lines.length,
    width: lines[0].length,
    valid_parts: []
  }
  for (const [i, row] of engine.schematic.entries()) {
    let part_num = ''
    let valid_part = false
    for (const [j, x] of row.entries()) {
      if (canBeNum(x)) {
        part_num += x
        if (!valid_part && isPartNumber(engine, [i, j])) {
          valid_part = true
        }
      } else {
        if (valid_part) {
          engine.valid_parts.push(Number(part_num))
        }
        part_num = ''
        valid_part = false
      }
    }
  }

  return sum(engine.valid_parts)
}

type Gears = { [index: string]: number[] }

export const part2 = () => {
  const lines = parseLines(input)
  for (let i = 0; i < lines.length; i++) {
    lines[i] += '.'
  }

  const engine: Engine = {
    schematic: lines.map((l) => l.split('')),
    height: lines.length,
    width: lines[0].length,
    valid_parts: [],
  }
  const gear_locations: Gears = {}
  for (const [i, row] of engine.schematic.entries()) {
    let part_num = ''
    let valid_part = false
    const part_gears: Set<string> = new Set()
    for (const [j, x] of row.entries()) {
      if (canBeNum(x)) {
        part_num += x
        const nearbies = validPositions(engine, [i, j])
        const isPartNumber = nearbies.map((pos) => {
          const component = engine.schematic[pos[0]][pos[1]]
          if (component === '*') {
            part_gears.add(pos.join(','))
          }
          return isSymbol(component)
        }).includes(true)

        if (!valid_part && isPartNumber) {
          valid_part = true
        }
      } else {
        if (valid_part) {
          for (const gear_loc of [...part_gears]) {
            if (gear_loc in gear_locations) {
              gear_locations[gear_loc].push(Number(part_num))
            } else {
              gear_locations[gear_loc] = [Number(part_num)]
            }
          }
          engine.valid_parts.push(Number(part_num))
        }
        part_num = ''
        valid_part = false
        part_gears.clear()
      }
    }
  }
  let gear_ratio_sum = 0
  for (const [_loc, gears] of Object.entries(gear_locations)) {
    if (gears.length === 2) {
      gear_ratio_sum += gears[0] * gears[1]
    }
  }

  return gear_ratio_sum
}
