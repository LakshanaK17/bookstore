import { NextResponse } from "next/server";
import { books } from "../../../data/books"; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const relatedTo = searchParams.get("relatedTo");

  if (relatedTo) {
    const relatedBooks = books.filter((book) => book.id !== relatedTo);
    return NextResponse.json(relatedBooks);
  } else {
    return NextResponse.json(books);
  }
}
