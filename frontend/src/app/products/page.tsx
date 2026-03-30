'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
};
type Product = {
  id: number;
  title: string;
  author: string;
  price: number;
  description?: string;
};

const PAGE_SIZE = 5;

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    });

    // Delete hone ke baad products ko update karo
    setProducts(products.filter(p => p.id !== id));
  };

    useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

useEffect(() => {
  setLoading(true)
  let url = 'http://localhost:3001/products';
    if (selectedCategory) {
      url += `?categoryId=${selectedCategory}`;
    }
  fetch(url)
    .then(res => {
      console.log('Response status:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('Data received:', data);
      setProducts(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setLoading(false);
    });
}, [selectedCategory]);

const paginatedProducts = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
 const totalPages = Math.ceil(products.length / PAGE_SIZE);
  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  if (loading) return <p>Loading products...</p>;

  return (
    <section className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6">Products</h2>
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="mr-2 font-semibold">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory ?? ''}
          onChange={(e) =>
            setSelectedCategory(e.target.value ? Number(e.target.value) : null)
          }
          className="border p-1"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <ul>
            {products.map(product => (
  <li key={product.id} className="mb-3 flex justify-between items-center">
    <Link href={`/products/${product.id}`}>
      <span className="text-blue-600 hover:underline cursor-pointer">
        {product.title} - {product.author}
      </span>
    </Link>
    <Link href={`/products/${product.id}/edit`}>
      <button className="ml-4 bg-yellow-400 text-black px-2 py-1 rounded">
        Edit
      </button>
    </Link>
    <button onClick={() => handleDelete(product.id)} className="ml-2 text-red-600">
              Delete
            </button>
  </li>
))}
          </ul>

          {/* Pagination controls */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => setPage(page => Math.max(page - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="self-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page => Math.min(page + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>

  );
}
