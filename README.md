# Viehouse LP - Next.js版

## ローカル確認
```bash
npm install
npm run dev
```

## Vercel公開
1. このフォルダをGitHubへアップロード
2. VercelでImport Project
3. Framework Presetは `Next.js`
4. Deploy

## 画像差し替え
`public/images/` の画像を同じファイル名で差し替えるだけで反映されます。

- `provence-hero.png`
- `smart-hero.png`
- `provence-main.png`
- `smart-main.png`

## Googleフォーム連携
`app/page.jsx` の予約フォーム部分をGoogleフォームのiframeに差し替えれば連携できます。
