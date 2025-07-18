# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

- `npm run dev` - 開発サーバーを起動
- `npm run build` - プロダクション用ビルド（Prisma生成 + Next.jsビルド）
- `npm run start` - プロダクションサーバーを起動
- `npm run lint` - ESLintによるコード品質チェック
- `npx prisma db push` - データベーススキーマを同期
- `npx prisma studio` - Prisma Studioでデータベース管理UI起動

## アーキテクチャ

### 技術スタック
- **フレームワーク**: Next.js 15 (App Router)
- **データベース**: PostgreSQL + Prisma ORM
- **UI**: React 19 + CSS Modules
- **言語**: TypeScript
- **チャート**: Chart.js + react-chartjs-2

### データベース設計
Prismaスキーマ (`schema.prisma`) には以下のモデルが定義されている:

- **Todo**: タスク管理（優先度、期限日付き）
- **User**: ユーザー管理（名前、メール）
- **Training**: トレーニング記録（日付、種類、回数、コメント）
- **TrainingPlan**: トレーニング計画（期間、目標設定）

### プロジェクト構造
```
src/app/
├── (main)/           # メイン機能のルートグループ
│   ├── layout.tsx    # 共通レイアウト
│   ├── page.tsx      # ダッシュボード
│   └── tasks/        # タスク管理ページ
├── globals.css       # グローバルスタイル
├── layout.tsx        # ルートレイアウト
├── lib/
│   └── prisma.ts     # Prismaクライアント設定
└── page.tsx          # ランディングページ
```

### 重要な設定
- Prismaクライアントは `./generated/client` に生成される
- パスエイリアス `@/*` で `./src/*` を参照
- Next.js設定で `@prisma/client` をトランスパイル
- 開発時はPrismaクライアントがグローバルにキャッシュされる

### 環境変数
以下の環境変数が必要:
- `POSTGRES_PRISMA_URL` - PostgreSQL接続URL（プール使用）
- `POSTGRES_URL_NON_POOLING` - PostgreSQL直接接続URL