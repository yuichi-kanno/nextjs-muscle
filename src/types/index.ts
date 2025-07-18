// データベース型定義
export interface Exercise {
  id: string
  name: string
  category: string
  muscleGroups: string[]
  description?: string
  instructions?: string
  createdAt: Date
  updatedAt: Date
}

export interface WorkoutSet {
  id: string
  workoutExerciseId: string
  reps: number
  weight?: number
  duration?: number // 秒
  rest?: number // 秒
  notes?: string
}

export interface WorkoutExercise {
  id: string
  workoutId: string
  exerciseId: string
  exercise: Exercise
  sets: WorkoutSet[]
  notes?: string
}

export interface Workout {
  id: string
  name: string
  date: Date
  duration?: number // 分
  notes?: string
  exercises: WorkoutExercise[]
  createdAt: Date
  updatedAt: Date
}

// フォーム型定義
export interface CreateExerciseForm {
  name: string
  category: string
  muscleGroups: string[]
  description?: string
  instructions?: string
}

export interface CreateWorkoutForm {
  name: string
  date: Date
  notes?: string
}

export interface CreateWorkoutSetForm {
  reps: number
  weight?: number
  duration?: number
  rest?: number
  notes?: string
}

// UI状態型定義
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
}

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'arms' 
  | 'legs' 
  | 'glutes' 
  | 'core' 
  | 'cardio'

export type ExerciseCategory = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'balance' 
  | 'sports'