import Banner from '@/app/(home)/components/Banner';
import Image from 'next/image';
import BookList from './components/BookList';

export default async function Home() {
  const response = await fetch(`${process.env.SERVER_URL}/books`);
  if (!response.ok) {
    throw new Error('An Error Occure While Fetch Book Data.');
  }

  const books = await response.json();
  console.log(books);
  return (
    <>
      <Banner />
      <BookList books={books} />
    </>
  );
}
