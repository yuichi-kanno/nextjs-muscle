import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WorkoutSetForm from '@/components/WorkoutSetForm'
import { WorkoutSetInput } from '@/lib/validations/workout'

const mockOnSubmit = jest.fn()
const mockOnCancel = jest.fn()

describe('WorkoutSetForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なフォーム要素がレンダリングされる', () => {
    render(<WorkoutSetForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    expect(screen.getByRole('spinbutton', { name: /回数/ })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /重量/ })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /^時間/ })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: /^休憩時間/ })).toBeInTheDocument()
    expect(screen.getByLabelText('メモ（任意）')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'セット追加' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
  })

  it('有効なデータで送信するとonSubmitが呼ばれる', async () => {
    const user = userEvent.setup()
    render(<WorkoutSetForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.type(screen.getByRole('spinbutton', { name: /回数/ }), '10')
    await user.type(screen.getByRole('spinbutton', { name: /重量/ }), '80')
    await user.type(screen.getByRole('spinbutton', { name: /^休憩時間/ }), '120')
    await user.type(screen.getByLabelText('メモ（任意）'), '良い感じ')
    
    await user.click(screen.getByRole('button', { name: 'セット追加' }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          reps: 10,
          weight: 80,
          rest: 120,
          notes: '良い感じ',
        }),
        expect.any(Object)
      )
    })
  })

  it('必須フィールドが空の場合エラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<WorkoutSetForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.click(screen.getByRole('button', { name: 'セット追加' }))
    
    await waitFor(() => {
      expect(screen.getByText('Expected number, received nan')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('キャンセルボタンクリックでonCancelが呼ばれる', async () => {
    const user = userEvent.setup()
    render(<WorkoutSetForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
    
    expect(mockOnCancel).toHaveBeenCalled()
  })
})