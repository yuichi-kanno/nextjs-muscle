'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { workoutSetSchema, WorkoutSetInput } from '@/lib/validations/workout'

interface WorkoutSetFormProps {
  onSubmit: (data: WorkoutSetInput) => void
  onCancel: () => void
  initialData?: WorkoutSetInput
  isLoading?: boolean
}

export default function WorkoutSetForm({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false,
}: WorkoutSetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkoutSetInput>({
    resolver: zodResolver(workoutSetSchema),
    defaultValues: initialData || {
      reps: undefined,
      weight: undefined,
      duration: undefined,
      rest: undefined,
      notes: '',
    },
  })

  const handleFormSubmit = (data: WorkoutSetInput) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-700 mb-2">
            回数 <span className="text-red-500">*</span>
          </label>
          <input
            {...register('reps', { valueAsNumber: true })}
            type="number"
            id="reps"
            min="1"
            placeholder="10"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.reps && (
            <p className="mt-1 text-sm text-red-600">{errors.reps.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
            重量（kg）
          </label>
          <input
            {...register('weight', { 
              setValueAs: (value) => value === '' ? undefined : Number(value) 
            })}
            type="number"
            id="weight"
            min="0"
            step="0.1"
            placeholder="80"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.weight && (
            <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
            時間（秒）
          </label>
          <input
            {...register('duration', { 
              setValueAs: (value) => value === '' ? undefined : Number(value) 
            })}
            type="number"
            id="duration"
            min="1"
            placeholder="60"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.duration && (
            <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="rest" className="block text-sm font-medium text-gray-700 mb-2">
            休憩時間（秒）
          </label>
          <input
            {...register('rest', { 
              setValueAs: (value) => value === '' ? undefined : Number(value) 
            })}
            type="number"
            id="rest"
            min="0"
            placeholder="120"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.rest && (
            <p className="mt-1 text-sm text-red-600">{errors.rest.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          メモ（任意）
        </label>
        <textarea
          {...register('notes')}
          id="notes"
          rows={2}
          placeholder="セットの感想や調整点など..."
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
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {isLoading ? 'セット追加中...' : 'セット追加'}
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