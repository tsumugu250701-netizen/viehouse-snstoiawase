import './globals.css';
import Analytics from './Analytics';

export const metadata = {
  title: 'Viehouse モデルハウス見学予約',
  description: 'プロヴァンスとスマートハウス、2棟のモデルハウス見学予約LP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>{children}{process.env.VERCEL_ENV === 'production' && <Analytics />}</body>
    </html>
  );
}
