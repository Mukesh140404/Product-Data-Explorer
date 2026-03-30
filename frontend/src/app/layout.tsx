import './globals.css';
import  Navbar  from './components/Navbar';

export const metadata = {
  title: 'Product Data Explorer',
  description: 'Explore products and categories',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
