# Premier DAM店舗検索

## 🎯 概要

カラオケDAMのPremier DAM機種を設置している店舗を全国から検索するWebアプリケーションです。
Node.js + Express + HTML/JavaScriptで実装されています。

## ✨ 特徴

- 🎤 **Premier DAMのみ**: `machine=03` パラメータでPremier DAM設置店舗のみを抽出
- 🔤 **文字化け解決**: Shift_JIS → UTF-8 自動変換で正しい日本語表示
- 🌐 **Express API**: Node.js + Expressサーバーでプロキシ処理
- 📊 **リアルタイム表示**: 検索進捗と結果をブラウザ上でリアルタイム表示
- 🗾 **都道府県選択**: チェックボックスで検索対象を自由に選択可能
- ⚡ **即座停止**: AbortControllerで進行中の検索を即座に中断
- 🚀 **シンプル設計**: Webブラウザのみで完結するシンプルな設計

## 🛠️ セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. サーバーの起動

```bash
npm start
```

### 3. ブラウザでアクセス

`http://localhost:3000` にアクセスして検索を開始してください。

## 🚀 使用方法

1. **サーバー起動**: `npm start` でExpressサーバーを起動
2. **ブラウザでアクセス**: `http://localhost:3000` にアクセス
3. **都道府県選択**: 検索したい都道府県をチェックボックスで選択
4. **検索開始**: 「検索開始」ボタンをクリック
5. **結果確認**: 進捗表示とともに結果がリアルタイムで表示されます
6. **検索停止**: 「検索停止」ボタンで進行中の検索を即座に中断可能

## 📁 ファイル構成

```
├── server.js          # Expressサーバー (プロキシAPI付き)
├── package.json       # Node.js依存関係
├── static/            # 静的ファイル
│   └── index.html    # メインのWebアプリケーション
└── README.md         # このファイル
```

## 🔧 技術詳細

### アーキテクチャ

- **フロントエンド**: HTML + JavaScript (Vanilla JS)
- **バックエンド**: Node.js + Express
- **プロキシAPI**: `/api/proxy` エンドポイントでClubDAMサイトへのリクエストを中継

### 都道府県選択機能

- **チェックボックス**: 47都道府県から任意選択可能
- **全選択/全解除**: ワンクリックで一括操作
- **地域選択**: 関東・関西地域をワンクリック選択
- **動的UI**: 選択された都道府県数に応じた進捗表示

### 即座停止機能

- **AbortController**: fetch APIの中断で進行中のリクエストを即座に停止
- **分割待機**: 100ms単位でshouldStopフラグをチェック
- **クリーンアップ**: 中断時の適切な状態リセット

### 文字エンコーディング対応

ClubDAMのWebサイトはShift_JISを使用しているため、以下の処理を行います：

1. ExpressサーバーでClubDAMサイトからShift_JISデータを取得
2. `iconv-lite` ライブラリでUTF-8に変換
3. フロントエンドへ正しい文字エンコーディングで配信

### Premier DAMフィルタリング

- APIリクエスト時に `machine=03` パラメータを追加
- レスポンス解析時にPremier DAM設置店舗のみを抽出
- UI上でPremier DAMを最優先表示

## 🌐 API仕様

### `GET /api/proxy`

ClubDAMサイトへのプロキシリクエストを処理します。

**パラメータ:**
- `url` (必須): プロキシ先のURL

**レスポンス:**
- Content-Type: `text/html; charset=utf-8`
- Shift_JISからUTF-8に変換されたHTML

**例:**
```
GET /api/proxy?url=https://www.clubdam.com/shopsearch/?todofukenCode=01&machine=03
```

## ⚠️ 注意事項

- **ローカル環境のみ**: セキュリティ上、ローカル環境での使用を想定
- **レート制限**: サーバー負荷軽減のため適切な待機時間を設定
- **依存関係**: 文字エンコーディング変換に `iconv-lite` が必要

## 🐛 トラブルシューティング

### 文字化けが発生する場合

1. サーバーが正常に起動しているか確認: `http://localhost:3000`
2. `npm install` で依存関係が正しくインストールされているか確認
3. ブラウザのコンソールでエラーメッセージを確認

### 検索結果が表示されない場合

1. ネットワーク接続を確認
2. ClubDAMサイトのHTML構造変更の可能性
3. ブラウザの開発者ツールでAPI レスポンスを確認

### 検索が停止しない場合

1. 「検索停止」ボタンを押してAbortControllerで中断
2. ブラウザの開発者ツールでネットワークタブを確認
3. ページをリロードして状態をリセット

## 📚 参考文献

- [ClubDAM店舗検索](https://www.clubdam.com/shopsearch/) - 公式サイト

## 📄 ライセンス

MIT License
