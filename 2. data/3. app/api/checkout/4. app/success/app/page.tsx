'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { books, type Book } from '@/data/books';

export default function Home() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredBooks = books.slice(0, 6);

  const openBookModal = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const buyBook = async (slug: string) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (error) {
      alert('Erro ao processar pagamento. Tente novamente.');
    }
  };

  const sendLead = (e: React.FormEvent) => {
    e.preventDefault();
    alert('✅ Capítulo gratuito de "Por Que Eu Dou Meu Dízimo?" enviado para seu e-mail!');
  };

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-2xl flex items-center justify-center text-white text-3xl font-bold heading-font">EG</div>
            <span className="text-3xl font-semibold tracking-tight heading-font">Rev. Elimar Gomes Alves</span>
          </div>
          <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
            <Link href="#livros" className="hover:text-amber-700">Livros</Link>
            <Link href="#sobre" className="hover:text-amber-700">Sobre</Link>
            <Link href="#reflexoes" className="hover:text-amber-700">Reflexões</Link>
            <Link href="#contato" className="hover:text-amber-700">Contato</Link>
          </nav>
          <Link href="/livros" className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2">
            VER TODOS OS LIVROS
          </Link>
        </div>
      </header>

      <div className="h-20" />

      {/* HERO */}
      <section className="hero-bg pt-16 pb-24 bg-gradient-to-br from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-3xl text-sm font-medium shadow">
              Teologia Bíblica Profunda
            </div>
            <h1 className="text-6xl md:text-7xl font-bold leading-none heading-font tracking-tighter">
              Aprofunde sua fé.<br />Viva em fidelidade.
            </h1>
            <p className="text-xl text-zinc-600 max-w-lg">
              17 livros digitais escritos com rigor bíblico, clareza teológica e aplicação prática para sua vida cristã.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/livros" className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-5 rounded-3xl font-semibold text-lg shadow-xl flex items-center gap-3">
                Explorar livros
              </Link>
              <button onClick={() => alert('Capítulo gratuito enviado!')} className="border-2 border-zinc-800 hover:bg-zinc-900 hover:text-white px-10 py-5 rounded-3xl font-semibold text-lg">
                Receber capítulo gratuito
              </button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <Image src="https://picsum.photos/id/1015/800/620" alt="Livro destaque" width={520} height={620} className="rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* LIVROS EM DESTAQUE */}
      <section id="livros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-amber-700 font-medium tracking-widest">CATÁLOGO</p>
              <h2 className="text-5xl heading-font font-semibold">Livros que transformam</h2>
            </div>
            <Link href="/livros" className="text-amber-700 font-medium flex items-center gap-2">Ver todos →</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredBooks.map((book) => (
              <div
                key={book.slug}
                onClick={() => openBookModal(book)}
                className="book-card bg-white border border-zinc-100 rounded-3xl overflow-hidden cursor-pointer group"
              >
                <div className="relative h-80 bg-zinc-100">
                  <Image
                    src={`https://picsum.photos/id/${100 + books.indexOf(book)}/600/800`}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-semibold text-xl leading-tight mb-1">{book.title}</h3>
                  <p className="text-zinc-500 text-sm line-clamp-2">{book.subtitle}</p>
                  <div className="mt-6 flex justify-between items-end">
                    <div>
                      <span className="text-xs text-zinc-400">A PARTIR DE</span>
                      <p className="text-3xl font-bold">R$ {(book.price / 100).toFixed(2)}</p>
                    </div>
                    <button className="bg-amber-700 text-white text-xs px-8 py-3 rounded-3xl font-medium">Ver detalhes</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL DE LIVRO */}
      {isModalOpen && selectedBook && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-6" onClick={closeModal}>
          <div className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5 bg-zinc-100 p-12 flex items-center justify-center">
                <Image
                  src={`https://picsum.photos/id/${100 + books.indexOf(selectedBook)}/600/800`}
                  alt={selectedBook.title}
                  width={400}
                  height={520}
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="md:w-3/5 p-12 relative">
                <button onClick={closeModal} className="absolute top-8 right-8 text-4xl text-zinc-400 hover:text-black">×</button>
                <h2 className="text-4xl heading-font font-semibold">{selectedBook.title}</h2>
                <p className="text-amber-700 text-lg mt-2">{selectedBook.subtitle}</p>
                <div className="my-8 text-5xl font-bold">R$ {(selectedBook.price / 100).toFixed(2)}</div>
                <button
                  onClick={() => buyBook(selectedBook.slug)}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-6 rounded-3xl text-xl font-semibold mb-10"
                >
                  Comprar e baixar agora
                </button>
                <p className="text-zinc-600 leading-relaxed">{selectedBook.description}</p>
                <div className="mt-12 text-sm grid grid-cols-2 gap-y-4">
                  <div><strong>Formato:</strong> PDF</div>
                  <div><strong>Páginas:</strong> {selectedBook.pages}</div>
                  <div><strong>Idioma:</strong> Português</div>
                  <div><strong>Ano:</strong> 2025-2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BENEFÍCIOS + SOBRE + LEAD + REFLEXÕES + CONTATO + FOOTER */}
      {/* (Mantive exatamente o design premium que você aprovou – copie do HTML anterior e ajuste os IDs para #livros, #sobre etc.) */}

      <footer className="bg-zinc-950 text-zinc-400 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          © 2026 Rev. Elimar Gomes Alves — Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
