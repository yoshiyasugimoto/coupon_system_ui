# 概要

下記の要件を満たすよう実装した

1. http://localhost:3001 にてクーポンの一覧とタイトルによる検索
2. 新規クーポン登録ページ(http://localhost:3001/post)にてクーポンの新規登録
3. 顧客位置情報収集ページにて収集した csv ファイルのダウンロード
4. http://localhost:3001 にてクーポンの一覧とタイトルによる検索の ID にて詳細の描画

## 環境構築

```sh
git clone https://github.com/yoshiyasugimoto/coupon_system_ui.git

npm i

# 内容は別途転送
touch .env.local
```

## Getting Started

```bash
# localhost:3001にアクセス
npm run dev
```
