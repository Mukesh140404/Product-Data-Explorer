'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

export default function EditProductPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3001/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setTitle(data.title);
        setAuthor(data.author);
        setPrice(data.price.toString());
        setDescription(data.description || '');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading product details...</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, price: Number(price), description }),
    });
    router.push(`/products/${id}`);
  };

  return (
    <section className="max-w-md mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Price"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Save Changes
        </button>
      </form>
    </section>
  );
}
