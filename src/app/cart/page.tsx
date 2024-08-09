"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Container,
  Group,
  Table,
  Divider,
  Grid,
  TextInput,
} from "@mantine/core";
import { FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCartItems);
    calculateTotal(storedCartItems);
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };

  const handleQuantityChange = (id: string, change: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity + change, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleApplyCoupon = () => {
    console.log("Coupon Code Applied:", couponCode);
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <Container
      fluid
      style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
    >
      <Grid>
        <Grid.Col span={8} style={{ paddingRight: "15px" }}>
          <Card
            padding="lg"
            shadow="sm"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#ffffff",
              justifyContent: "center",
            }}
          >
            <Table style={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th style={{ padding: "8px 16px" }} colSpan={2}>
                    Product
                  </th>
                  <th style={{ padding: "8px 16px" }}>Price</th>
                  <th style={{ padding: "8px 16px" }}>Quantity</th>
                  <th style={{ padding: "8px 16px" }}>Total</th>
                  <th style={{ padding: "8px 16px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "8px 16px" }}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={80}
                        height={100}
                        style={{ objectFit: "cover" }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "8px 16px",
                        whiteSpace: "normal",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.title}
                    </td>
                    <td style={{ padding: "8px 16px" }}>
                      ${item.price.toFixed(2)}
                    </td>
                    <td style={{ padding: "8px 16px" }}>
                      <Group spacing="xs">
                        <Button
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          style={{
                            padding: 0,
                            minWidth: "auto",
                            border: "none",
                            color: "#b0b0b0",
                          }}
                        >
                          -
                        </Button>
                        <Text>{item.quantity}</Text>
                        <Button
                          variant="outline"
                          onClick={() => handleQuantityChange(item.id, 1)}
                          style={{
                            padding: 0,
                            minWidth: "auto",
                            border: "none",
                            color: "#b0b0b0",
                          }}
                        >
                          +
                        </Button>
                      </Group>
                    </td>
                    <td style={{ padding: "8px 16px" }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td style={{ padding: "8px 16px" }}>
                      <Button
                        variant="light"
                        color="red"
                        onClick={() => handleRemoveItem(item.id)}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FaTrashAlt style={{ marginRight: 5 }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Group style={{ marginTop: 20 }}>
              <TextInput
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(event) => setCouponCode(event.currentTarget.value)}
                style={{ marginRight: 10, width: "50%" }}
              />
              <Button
                onClick={handleApplyCoupon}
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#37d229",
                  color: "#000000",
                  fontWeight: 700,
                }}
              >
                Apply
              </Button>
            </Group>
          </Card>
        </Grid.Col>

        <Grid.Col span={4} style={{ paddingLeft: "15px" }}>
          <Card
            padding="md"
            shadow="sm"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f8f8f8",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Text
              size="lg"
              weight={500}
              style={{ marginBottom: 10, color: "#000000" }}
            >
              Checkout
            </Text>
            <div style={{ width: "100%" }}>
              <Table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "left",
                        fontWeight: 700,
                        color: "#8c8c8c",
                        padding: "8px 16px",
                      }}
                    >
                      SubTotal
                    </td>
                    <td
                      style={{
                        fontWeight: 700,
                        color: "#8c8c8c",
                        padding: "8px 16px",
                      }}
                    >
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={5}
                      style={{
                        textAlign: "left",
                        fontWeight: 700,
                        color: "#8c8c8c",
                        padding: "8px 16px",
                      }}
                    >
                      Total
                    </td>
                    <td
                      style={{
                        fontWeight: 700,
                        color: "#37d229",
                        padding: "8px 16px",
                      }}
                    >
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Text size="sm" color="gray" style={{ margin: "10px 0" }}>
                Shipping & taxes calculated at checkout
              </Text>
              <Button
                variant="filled"
                onClick={handleCheckout}
                style={{
                  backgroundColor: "#37d229",

                  color: "#000000",
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CartPage;
