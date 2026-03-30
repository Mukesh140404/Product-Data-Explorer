'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  products: any[];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this category?')) return;
    await fetch(`http://localhost:3001/categories/${id}`, {
      method: 'DELETE',
    });
    setCategories(categories.filter(c => c.id !== id));
  }

  if (loading) return <p>Loading categories...</p>;

  return (
    <section className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id} className="mb-3 flex items-center">
            <Link href={`/categories/${category.id}`}>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {category.name} ({category.products.length})
              </span>
            </Link>
            <Link
              href={`/categories/${category.id}/edit`}
              className="ml-2 px-2 py-1 bg-blue-600 text-white rounded"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(category.id)}
              className="ml-2 px-2 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Link href="/categories/add">
        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Add Category</button>
      </Link>
    </section>
  );
}
