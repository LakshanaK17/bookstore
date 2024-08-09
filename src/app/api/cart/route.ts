import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

let cart: CartItem[] = [];


export async function POST(req: NextRequest) {
  const { item }: { item: CartItem } = await req.json();

  cart.push(item);

  return NextResponse.json({ message: "Item added to cart", cart });
}


export async function GET(req: NextRequest) {
  return NextResponse.json({ cart });
}
