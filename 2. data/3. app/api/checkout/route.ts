import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { books } from '@/data/books';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { slug } = await req.json();
  const book = books.find(b => b.slug === slug);
  if (!book) return NextResponse.json({ error: 'Livro não encontrado' }, { status: 404 });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price_data: { currency: 'brl', product_data: { name: book.title }, unit_amount: book.price }, quantity: 1 }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/livros`,
    metadata: { slug: book.slug, pdfFile: book.pdfFile }
  });

  return NextResponse.json({ url: session.url });
}
