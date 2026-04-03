import { describe, it, expect } from 'vitest'
import bwPowerSet from './power-set'

describe('bwPowerSet', () => {
  it('空集幂集为 [[]]', () => {
    expect(bwPowerSet([])).toEqual([[]])
  })

  it('二元集幂集含 4 个子集', () => {
    const r = bwPowerSet(['a', 'b'])
    expect(r).toHaveLength(4)
    expect(r).toContainEqual([])
    expect(r).toContainEqual(['a'])
    expect(r).toContainEqual(['b'])
    expect(r).toContainEqual(['a', 'b'])
  })
})
