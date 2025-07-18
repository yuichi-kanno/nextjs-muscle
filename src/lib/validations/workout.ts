import { z } from 'zod'

// ワークアウトセット用スキーマ
export const workoutSetSchema = z.object({
  reps: z
    .number()
    .int('回数は整数で入力してください')
    .min(1, '回数は1以上で入力してください')
    .max(999, '回数は999以下で入力してください'),
  
  weight: z
    .number()
    .min(0, '重量は0以上で入力してください')
    .max(1000, '重量は1000kg以下で入力してください')
    .optional(),
  
  duration: z
    .number()
    .int('時間は整数（秒）で入力してください')
    .min(1, '時間は1秒以上で入力してください')
    .max(86400, '時間は24時間以下で入力してください')
    .optional(),
  
  rest: z
    .number()
    .int('休憩時間は整数（秒）で入力してください')
    .min(0, '休憩時間は0秒以上で入力してください')
    .max(3600, '休憩時間は1時間以下で入力してください')
    .optional(),
  
  notes: z
    .string()
    .max(200, 'メモは200文字以内で入力してください')
    .optional(),
})

// ワークアウト作成用スキーマ
export const createWorkoutSchema = z.object({
  name: z
    .string()
    .min(1, 'ワークアウト名を入力してください')
    .max(100, 'ワークアウト名は100文字以内で入力してください'),
  
  date: z
    .date({
      required_error: '日付を選択してください',
      invalid_type_error: '有効な日付を選択してください',
    })
    .max(new Date(), '未来の日付は選択できません'),
  
  notes: z
    .string()
    .max(500, 'メモは500文字以内で入力してください')
    .optional(),
})

// ワークアウトエクササイズ追加用スキーマ
export const addWorkoutExerciseSchema = z.object({
  exerciseId: z
    .string()
    .min(1, 'エクササイズを選択してください'),
  
  sets: z
    .array(workoutSetSchema)
    .min(1, '少なくとも1セット追加してください')
    .max(20, 'セット数は20まで追加できます'),
  
  notes: z
    .string()
    .max(200, 'メモは200文字以内で入力してください')
    .optional(),
})

// ワークアウト更新用スキーマ
export const updateWorkoutSchema = createWorkoutSchema.partial()

export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>
export type WorkoutSetInput = z.infer<typeof workoutSetSchema>
export type AddWorkoutExerciseInput = z.infer<typeof addWorkoutExerciseSchema>