'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createWorkoutSchema, CreateWorkoutInput } from '@/lib/validations/workout'

interface WorkoutFormProps {
  onSubmit: (data: CreateWorkoutInput) => void
  onCancel: () => void
  initialData?: CreateWorkoutInput
  mode?: 'create' | 'edit'
  isLoading?: boolean
}

export default function WorkoutForm({
  onSubmit,
  onCancel,
  initialData,
  mode = 'create',
  isLoading = false,
}: WorkoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkoutInput>({
    resolver: zodResolver(createWorkoutSchema),
    defaultValues: initialData || {
      name: '',
      notes: '',
    },
  })

  const handleFormSubmit = (data: CreateWorkoutInput) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          ワークアウト名
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="例: 胸のトレーニング"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          日付
        </label>
        <input
          {...register('date', {
            valueAsDate: true,
          })}
          type="date"
          id="date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          メモ（任意）
        </label>
        <textarea
          {...register('notes')}
          id="notes"
          rows={3}
          placeholder="今日の目標やメモを入力..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {errors.notes && (
          <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? `${mode === 'create' ? '作成' : '更新'}中...` : mode === 'create' ? '開始' : '更新'}
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