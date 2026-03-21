import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { books, type Book } from '@/data/books';
import { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = books.find(b => b.slug === params.slug);
  if (!book) return { title: 'Livro não encontrado' };

  return {
    title: `${book.title} | Rev. Elimar Gomes Alves`,
    description: book.description,
    openGraph: {
      images: [{ url: `https://picsum.photos/id/${100 + books.indexOf(book)}/1200/630` }],
    },
  };
}

export default function BookPage({ params }: Props) {
  const book = books.find(b => b.slug === params.slug);

  if (!book) notFound();

  const buyBook = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: book.slug }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HEADER (mesmo do site) */}
      <header className="fixed top-0 bg-white border-b z-50 w-full">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-2xl flex items-center justify-center text-white text-3xl heading-font">EG</div>
            <span className="text-3xl font-semibold heading-font">Rev. Elimar Gomes Alves</span>
          </div>
          <Link href="/livros" className="text-amber-700 font-medium">← Voltar ao catálogo</Link>
        </div>
      </header>

      <div className="h-20" />

      {/* HERO DO LIVRO (Landing Page de Alta Conversão) */}
      <section className="pt-12 pb-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-16 items-start">
          {/* CAPA GRANDE */}
          <div className="md:col-span-5">
            <div className="sticky top-24">
              <Image
                src={`https://picsum.photos/id/${100 + books.indexOf(book)}/800/1000`}
                alt={book.title}
                width={800}
                height={1000}
                className="rounded-3xl shadow-2xl w-full"
                priority
              />
            </div>
          </div>

          {/* CONTEÚDO */}
          <div className="md:col-span-7">
            <div className="uppercase text-amber-700 tracking-widest text-sm mb-3">LIVRO DIGITAL • PDF INSTANTÂNEO</div>
            <h1 className="text-5xl md:text-6xl heading-font font-bold leading-none tracking-tighter mb-4">{book.title}</h1>
            <p className="text-2xl text-zinc-600 mb-8">{book.subtitle}</p>

            <div className="flex items-center gap-6 mb-10">
              <div className="text-6xl font-bold">R$ {(book.price / 100).toFixed(2)}</div>
              <div className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-3xl text-sm font-medium">Download imediato após pagamento</div>
            </div>

            <button
              onClick={buyBook}
              className="w-full bg-amber-700 hover:bg-amber-800 transition-all text-white py-7 rounded-3xl text-2xl font-semibold mb-6 shadow-xl"
            >
              Comprar e baixar agora
            </button>

            <p className="text-zinc-500 text-sm">Pagamento seguro via Stripe • PDF enviado por e-mail automaticamente</p>

            {/* DESCRIÇÃO COMPLETA */}
            <div className="mt-16 prose prose-zinc max-w-none">
              <h2 className="text-3xl heading-font mb-6">Sobre o livro</h2>
              <p className="text-lg leading-relaxed">{book.description}</p>
              <p className="mt-8 text-zinc-600">
                Escrito com fidelidade às Escrituras Sagradas e com décadas de experiência pastoral, este livro foi projetado para fortalecer sua fé, aprofundar seu entendimento teológico e transformar sua vida prática.
              </p>
            </div>

            {/* BENEFÍCIOS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl mb-4">📖</div>
                <div className="font-semibold">Fidelidade Bíblica</div>
                <p className="text-sm text-zinc-600 mt-2">Todo conteúdo ancorado exclusivamente na Palavra de Deus.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🕊️</div>
                <div className="font-semibold">Profundidade Teológica</div>
                <p className="text-sm text-zinc-600 mt-2">Reflexões maduras para cristãos que querem crescer.</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <div className="font-semibold">Aplicação Prática</div>
                <p className="text-sm text-zinc-600 mt-2">Vida transformada desde o primeiro capítulo.</p>
              </div>
            </div>

            {/* INFORMAÇÕES TÉCNICAS */}
            <div className="mt-20 bg-zinc-100 p-10 rounded-3xl">
              <h3 className="text-xl font-semibold mb-6">Informações técnicas</h3>
              <div className="grid grid-cols-2 gap-y-6 text-sm">
                <div><strong>Formato:</strong> PDF de alta qualidade</div>
                <div><strong>Páginas:</strong> {book.pages}</div>
                <div><strong>Idioma:</strong> Português (Brasil/Portugal)</div>
                <div><strong>Ano:</strong> 2025-2026</div>
                <div><strong>Autor:</strong> Rev. Elimar Gomes Alves</div>
                <div><strong>Download:</strong> Imediato após pagamento</div>
              </div>
            </div>

            {/* CTA FINAL */}
            <div className="mt-16 text-center">
              <button
                onClick={buyBook}
                className="bg-zinc-900 hover:bg-black text-white px-16 py-6 rounded-3xl text-xl font-semibold inline-block"
              >
                Quero este livro agora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLES */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 text-center text-sm">
        © 2026 Rev. Elimar Gomes Alves — Todos os direitos reservados
      </footer>
    </div>
  );
}
