'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading product details...</p>;
  if (!product) return <p className="text-center py-10">Product not found.</p>;

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
      <p><strong>Author:</strong> {product.author}</p>
      <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
      <p className="mt-6 whitespace-pre-wrap">{product.description}</p>
    </section>
  );
}
