'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createExerciseSchema, CreateExerciseInput, muscleGroupOptions, categoryOptions } from '@/lib/validations/exercise'

interface ExerciseFormProps {
  onSubmit: (data: CreateExerciseInput) => void
  onCancel: () => void
  initialData?: CreateExerciseInput
  mode?: 'create' | 'edit'
  isLoading?: boolean
}

export default function ExerciseForm({ 
  onSubmit, 
  onCancel, 
  initialData, 
  mode = 'create', 
  isLoading = false 
}: ExerciseFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateExerciseInput>({
    resolver: zodResolver(createExerciseSchema),
    defaultValues: initialData || {
      name: '',
      category: 'strength' as const,
      muscleGroups: [],
      description: '',
      instructions: '',
    },
  })

  const submitText = mode === 'edit' ? '更新' : '作成'
  const loadingText = mode === 'edit' ? '更新中...' : '作成中...'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* エクササイズ名 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          エクササイズ名
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="例: ベンチプレス"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* カテゴリ */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          カテゴリ
        </label>
        <select
          id="category"
          {...register('category')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">カテゴリを選択</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* 筋肉群 */}
      <div>
        <fieldset>
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            筋肉群
          </legend>
          <Controller
            name="muscleGroups"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {muscleGroupOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={field.value.includes(option.value)}
                      onChange={(e) => {
                        const value = e.target.value
                        const currentValues = field.value || []
                        if (e.target.checked) {
                          field.onChange([...currentValues, value])
                        } else {
                          field.onChange(currentValues.filter((v) => v !== value))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.muscleGroups && (
            <p className="mt-1 text-sm text-red-600">{errors.muscleGroups.message}</p>
          )}
        </fieldset>
      </div>

      {/* 説明 */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          説明（任意）
        </label>
        <textarea
          id="description"
          {...register('description')}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="このエクササイズの説明を入力..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* 実行方法 */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
          実行方法（任意）
        </label>
        <textarea
          id="instructions"
          {...register('instructions')}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="実行手順を詳しく入力..."
        />
        {errors.instructions && (
          <p className="mt-1 text-sm text-red-600">{errors.instructions.message}</p>
        )}
      </div>

      {/* ボタン */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? loadingText : submitText}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          キャンセル
        </button>
      </div>
    </form>
  )
}