import Image from "next/image";

export default function Home() {
  return (
    <section className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Product Data Explorer</h1>
      <p className="text-lg text-gray-700 max-w-xl mx-auto">
        Discover amazing products across different categories.
      </p>
    </section>
  );
}

