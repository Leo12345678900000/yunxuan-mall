import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('React 测试环境', () => {
  it('可挂载简单组件', () => {
    render(<span>云选优品</span>)
    expect(screen.getByText('云选优品')).toBeInTheDocument()
  })
})
