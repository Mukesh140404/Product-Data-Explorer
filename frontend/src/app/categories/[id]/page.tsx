'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  author: string;
};

type Category = {
  id: number;
  name: string;
  products: Product[];
};

export default function CategoryDetailPage() {
  const params = useParams();
  const id = params?.id;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/categories/${id}`)
      .then(res => res.json())
      .then(data => {
        setCategory(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found</p>;

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
      <ul>
        {category.products.map((product: Product) => (
          <li key={product.id} className="mb-2">
            <Link href={`/product/${product.id}`}>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {product.title} - {product.author}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/categories">
        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded">Back to Categories</button>
      </Link>
    </section>
  );
}
