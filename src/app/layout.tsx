import './globals.css';

export const metadata = {
  title: 'Author.ai',
  description: 'AI-powered co-writer for novels and stories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}