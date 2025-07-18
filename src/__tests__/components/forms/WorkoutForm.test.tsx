import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkoutForm from '@/components/forms/WorkoutForm'
import { CreateWorkoutInput } from '@/lib/validations/workout'

const mockOnSubmit = jest.fn()
const mockOnCancel = jest.fn()

describe('WorkoutForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なフォーム要素がレンダリングされる', () => {
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    expect(screen.getByLabelText('ワークアウト名')).toBeInTheDocument()
    expect(screen.getByLabelText('日付')).toBeInTheDocument()
    expect(screen.getByLabelText('メモ（任意）')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '開始' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
  })

  it('有効なデータで送信するとonSubmitが呼ばれる', async () => {
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.type(screen.getByLabelText('ワークアウト名'), '胸のトレーニング')
    await user.type(screen.getByLabelText('日付'), '2024-01-15')
    await user.type(screen.getByLabelText('メモ（任意）'), '今日は重量を増やす')
    
    await user.click(screen.getByRole('button', { name: '開始' }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: '胸のトレーニング',
          date: expect.any(Date),
          notes: '今日は重量を増やす',
        }),
        expect.any(Object)
      )
    })
  })

  it('必須フィールドが空の場合エラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<WorkoutForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.click(screen.getByRole('button', { name: '開始' }))
    
    await waitFor(() => {
      expect(screen.getByText('ワークアウト名を入力してください')).toBeInTheDocument()
      expect(screen.getByText('Invalid date')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})