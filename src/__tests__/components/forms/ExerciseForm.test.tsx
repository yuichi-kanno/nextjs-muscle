import { describe, it, expect, jest } from '@jest/globals'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExerciseForm from '@/components/forms/ExerciseForm'
import { CreateExerciseInput } from '@/lib/validations/exercise'

// モックコールバック
const mockOnSubmit = jest.fn()
const mockOnCancel = jest.fn()

describe('ExerciseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('基本的なフォーム要素がレンダリングされる', () => {
    render(<ExerciseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    expect(screen.getByLabelText('エクササイズ名')).toBeInTheDocument()
    expect(screen.getByLabelText('カテゴリ')).toBeInTheDocument()
    expect(screen.getByText('筋肉群')).toBeInTheDocument()
    expect(screen.getByLabelText('説明（任意）')).toBeInTheDocument()
    expect(screen.getByLabelText('実行方法（任意）')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '作成' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'キャンセル' })).toBeInTheDocument()
  })

  it('有効なデータで送信すると onSubmit が呼ばれる', async () => {
    const user = userEvent.setup()
    render(<ExerciseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    // フォーム入力
    await user.type(screen.getByLabelText('エクササイズ名'), 'ベンチプレス')
    await user.selectOptions(screen.getByLabelText('カテゴリ'), 'strength')
    await user.click(screen.getByLabelText('胸筋'))
    await user.type(screen.getByLabelText('説明（任意）'), '胸筋を鍛える基本的なエクササイズ')
    
    // 送信
    await user.click(screen.getByRole('button', { name: '作成' }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'ベンチプレス',
          category: 'strength',
          muscleGroups: ['chest'],
          description: '胸筋を鍛える基本的なエクササイズ',
          instructions: '',
        }),
        expect.any(Object) // Event object
      )
    })
  })

  it('必須フィールドが空の場合エラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<ExerciseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    // 空の状態で送信
    await user.click(screen.getByRole('button', { name: '作成' }))
    
    await waitFor(() => {
      expect(screen.getByText('エクササイズ名を入力してください')).toBeInTheDocument()
      expect(screen.getByText("Invalid enum value. Expected 'strength' | 'cardio' | 'flexibility' | 'balance' | 'sports', received ''")).toBeInTheDocument()
      expect(screen.getByText('少なくとも1つの筋肉群を選択してください')).toBeInTheDocument()
    })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('複数の筋肉群を選択できる', async () => {
    const user = userEvent.setup()
    render(<ExerciseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.type(screen.getByLabelText('エクササイズ名'), 'プルアップ')
    await user.selectOptions(screen.getByLabelText('カテゴリ'), 'strength')
    await user.click(screen.getByLabelText('背筋'))
    await user.click(screen.getByLabelText('腕'))
    
    await user.click(screen.getByRole('button', { name: '作成' }))
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'プルアップ',
          category: 'strength',
          muscleGroups: expect.arrayContaining(['back', 'arms']),
        }),
        expect.any(Object) // Event object
      )
    })
  })

  it('キャンセルボタンクリックで onCancel が呼ばれる', async () => {
    const user = userEvent.setup()
    render(<ExerciseForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />)
    
    await user.click(screen.getByRole('button', { name: 'キャンセル' }))
    
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('編集モードで初期値が設定される', () => {
    const initialData: CreateExerciseInput = {
      name: 'スクワット',
      category: 'strength',
      muscleGroups: ['legs', 'glutes'],
      description: '下半身を鍛える',
      instructions: '足を肩幅に開いて...',
    }
    
    render(
      <ExerciseForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        initialData={initialData}
        mode="edit"
      />
    )
    
    expect(screen.getByDisplayValue('スクワット')).toBeInTheDocument()
    expect(screen.getByDisplayValue('下半身を鍛える')).toBeInTheDocument()
    expect(screen.getByDisplayValue('足を肩幅に開いて...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
  })

  it('ローディング中は送信ボタンが無効になる', () => {
    render(
      <ExerciseForm 
        onSubmit={mockOnSubmit} 
        onCancel={mockOnCancel}
        isLoading={true}
      />
    )
    
    expect(screen.getByRole('button', { name: '作成中...' })).toBeDisabled()
  })
})