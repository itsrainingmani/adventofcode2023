import { parseLines, readInput } from 'io'
import { sum } from 'utils'

const input = await readInput('day-01')

export const part1 = () => {
  const lines = parseLines(input)
  // your code goes here
  const calibrations: number[] = []
  for (const l of lines) {
    const digits = l
      .split('')
      .filter((c) => !Number.isNaN(Number(c)))
      .join('')

    const calibration_value: string
			= (digits.at(0) ?? '') + (digits.at(-1) ?? '')
    calibrations.push(Number(calibration_value))
  }

  return sum(calibrations)
}

type NUMS = {
  [index: string]: string
}

type PosNums = {
  [index: number]: string
}

const nums: NUMS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
}

const firstLastNums = (l: string): number => {
  const pos_to_num: PosNums = {}
  for (const [i, c] of l.split('').entries()) {
    if (!Number.isNaN(Number(c))) {
      pos_to_num[i] = c
    }
  }
  for (const s of Object.keys(nums)) {
    let l_i = 0
    while (l.includes(s, l_i)) {
      const s_index = l.indexOf(s, l_i)
      if (s_index >= 0) {
        pos_to_num[s_index] = nums[s]
        l_i += s.length
      }
    }
  }

  const idxs = Object.keys(pos_to_num).map((c) => Number(c))

  const min_num_idx = Math.min(...idxs)
  const max_num_idx = Math.max(...idxs)

  const calibration_value = pos_to_num[min_num_idx] + pos_to_num[max_num_idx]

  return Number(calibration_value)
}

export const part2 = () => {
  const lines = parseLines(input)
  const calibrations: number[] = []
  for (const l of lines) {
    calibrations.push(firstLastNums(l))
  }

  return sum(calibrations)
}
