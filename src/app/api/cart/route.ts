import type { NextApiRequest, NextApiResponse } from "next";

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

let cart: CartItem[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { item }: { item: CartItem } = req.body;

    cart.push(item);

    res.status(200).json({ message: "Item added to cart", cart });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
