import { NextResponse } from "next/server";
import { books } from "../../../../data/books";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const bookId = params.id;
  const book = books.find((book) => book.id === bookId);

  if (book) {
    return NextResponse.json(book);
  } else {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
}
