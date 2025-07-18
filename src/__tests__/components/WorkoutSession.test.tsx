import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkoutSession from '@/components/WorkoutSession'

const mockOnFinish = jest.fn()
const mockOnCancel = jest.fn()

describe('WorkoutSession', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的な要素がレンダリングされる', () => {
    render(
      <WorkoutSession
        workoutName="胸のトレーニング"
        onFinish={mockOnFinish}
        onCancel={mockOnCancel}
      />
    )
    
    expect(screen.getByText('胸のトレーニング')).toBeInTheDocument()
    expect(screen.getByText('エクササイズを追加')).toBeInTheDocument()
    expect(screen.getByText('ベンチプレス')).toBeInTheDocument()
    expect(screen.getByText('スクワット')).toBeInTheDocument()
  })

  it('エクササイズを追加できる', async () => {
    const user = userEvent.setup()
    render(
      <WorkoutSession
        workoutName="胸のトレーニング"
        onFinish={mockOnFinish}
        onCancel={mockOnCancel}
      />
    )
    
    await user.click(screen.getByText('ベンチプレス'))
    
    expect(screen.getByText('ベンチプレス')).toBeInTheDocument()
    expect(screen.getByText('セット追加')).toBeInTheDocument()
  })

  it('セットを追加できる', async () => {
    const user = userEvent.setup()
    render(
      <WorkoutSession
        workoutName="胸のトレーニング"
        onFinish={mockOnFinish}
        onCancel={mockOnCancel}
      />
    )
    
    // エクササイズ追加
    await user.click(screen.getByText('ベンチプレス'))
    
    // セット追加フォーム表示
    await user.click(screen.getByText('セット追加'))
    
    // フォーム入力
    await user.type(screen.getByRole('spinbutton', { name: /回数/ }), '10')
    await user.type(screen.getByRole('spinbutton', { name: /重量/ }), '80')
    
    // セット追加
    await user.click(screen.getByRole('button', { name: 'セット追加' }))
    
    await waitFor(() => {
      expect(screen.getByText('#1')).toBeInTheDocument()
      expect(screen.getByText('10回')).toBeInTheDocument()
      expect(screen.getByText('80kg')).toBeInTheDocument()
    })
  })

  it('ワークアウトを完了できる', async () => {
    const user = userEvent.setup()
    render(
      <WorkoutSession
        workoutName="胸のトレーニング"
        onFinish={mockOnFinish}
        onCancel={mockOnCancel}
      />
    )
    
    // エクササイズ追加
    await user.click(screen.getByText('ベンチプレス'))
    
    // セット追加
    await user.click(screen.getByText('セット追加'))
    await user.type(screen.getByRole('spinbutton', { name: /回数/ }), '10')
    await user.click(screen.getByRole('button', { name: 'セット追加' }))
    
    // ワークアウト完了
    await waitFor(() => {
      expect(screen.getByText('ワークアウト完了')).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('ワークアウト完了'))
    
    expect(mockOnFinish).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'ベンチプレス',
          sets: expect.arrayContaining([
            expect.objectContaining({
              reps: 10,
              completed: true,
            })
          ])
        })
      ])
    )
  })
})