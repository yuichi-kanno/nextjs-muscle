import { z } from 'zod'

// エクササイズ作成用スキーマ
export const createExerciseSchema = z.object({
  name: z
    .string()
    .min(1, 'エクササイズ名を入力してください')
    .max(100, 'エクササイズ名は100文字以内で入力してください'),
  
  category: z.enum(['strength', 'cardio', 'flexibility', 'balance', 'sports'], {
    required_error: 'カテゴリを選択してください',
    invalid_type_error: 'カテゴリを選択してください',
  }),
  
  muscleGroups: z
    .array(z.string())
    .min(1, '少なくとも1つの筋肉群を選択してください')
    .max(5, '筋肉群は最大5つまで選択できます'),
  
  description: z
    .string()
    .max(500, '説明は500文字以内で入力してください')
    .optional(),
  
  instructions: z
    .string()
    .max(1000, '実行方法は1000文字以内で入力してください')
    .optional(),
})

// エクササイズ更新用スキーマ
export const updateExerciseSchema = createExerciseSchema.partial()

// 筋肉群の選択肢
export const muscleGroupOptions = [
  { value: 'chest', label: '胸筋' },
  { value: 'back', label: '背筋' },
  { value: 'shoulders', label: '肩' },
  { value: 'arms', label: '腕' },
  { value: 'legs', label: '脚' },
  { value: 'glutes', label: '臀部' },
  { value: 'core', label: 'コア' },
  { value: 'cardio', label: '有酸素' },
] as const

// カテゴリの選択肢
export const categoryOptions = [
  { value: 'strength', label: '筋力トレーニング' },
  { value: 'cardio', label: '有酸素運動' },
  { value: 'flexibility', label: '柔軟性' },
  { value: 'balance', label: 'バランス' },
  { value: 'sports', label: 'スポーツ' },
] as const

export type CreateExerciseInput = z.infer<typeof createExerciseSchema>
export type UpdateExerciseInput = z.infer<typeof updateExerciseSchema>