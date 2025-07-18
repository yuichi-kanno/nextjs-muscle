import { type ClassValue, clsx } from 'clsx'

// CSS クラス結合ユーティリティ
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 日付フォーマット
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// 時間フォーマット（秒 → 分:秒）
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 重量フォーマット
export function formatWeight(weight: number): string {
  return `${weight}kg`
}

// 筋肉群の日本語名
export const muscleGroupNames: Record<string, string> = {
  chest: '胸筋',
  back: '背筋', 
  shoulders: '肩',
  arms: '腕',
  legs: '脚',
  glutes: '臀部',
  core: 'コア',
  cardio: '有酸素',
}

// エクササイズカテゴリの日本語名
export const exerciseCategoryNames: Record<string, string> = {
  strength: '筋力トレーニング',
  cardio: '有酸素運動',
  flexibility: '柔軟性',
  balance: 'バランス',
  sports: 'スポーツ',
}