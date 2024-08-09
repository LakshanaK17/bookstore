"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Container,
  Divider,
  Group,
  Grid,
  Col,
  Box,
  Stack,
  ActionIcon,
} from "@mantine/core";
import {
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import useStore from "../../../store/useStore";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
  publishedDate: string;
  description: string;
  category: string;
}

interface CartItem {
  id: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

const BookDetailsPage = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { visibleSection, setVisibleSection } = useStore();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/api/books/${params.id}`);
        if (!response.ok)
          throw new Error(
            `Failed to fetch book details: ${response.statusText}`
          );
        const bookData = await response.json();
        setBook(bookData);

        const relatedResponse = await fetch(
          `/api/books?relatedTo=${params.id}`
        );
        if (!relatedResponse.ok)
          throw new Error(
            `Failed to fetch related books: ${relatedResponse.statusText}`
          );
        const relatedBooksData = (await relatedResponse.json()) as Book[];

        const uniqueRelatedBooks = Array.from(
          new Map(relatedBooksData.map((book) => [book.id, book])).values()
        );
        setRelatedBooks(uniqueRelatedBooks.slice(0, 4));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [params.id]);

  const handleBuyNow = () => {
    if (book) {
      localStorage.setItem("selectedBook", JSON.stringify(book));
      router.push("/checkout");
    }
  };

  const handleAddToCart = () => {
    if (book) {
      const currentCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === book.id
      );

      if (existingItemIndex > -1) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        const newItem: CartItem = { ...book, quantity: 1 };
        currentCart.push(newItem);
      }

      localStorage.setItem("cart", JSON.stringify(currentCart));
      router.push("/cart");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <Container
      fluid
      style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
    >
      <Card
        padding="lg"
        shadow="sm"
        style={{
          backgroundColor: "#f0f0f0",
          width: "80%",
          maxWidth: "1200px",
          marginBottom: 20,
        }}
      >
        <Card
          padding="lg"
          shadow="sm"
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#ffffff",
            justifyContent: "center",
          }}
        >
          <Card
            padding="lg"
            shadow="sm"
            style={{ flexShrink: 0, marginRight: 20 }}
          >
            <Image
              src={book.imageUrl || "/images/default-book.jpg"}
              height={400}
              width={250}
              alt={book.title}
              style={{ objectFit: "cover" }}
            />
          </Card>
          <Card
            padding="lg"
            shadow="sm"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Text size="xl" weight={1000} style={{ marginBottom: 10 }}>
              {book.title}
            </Text>
            <Text size="md" weight={500} style={{ marginBottom: 10 }}>
              By {book.author}
            </Text>
            <Text size="md" color="gray" style={{ marginBottom: 10 }}>
              By {book.publishedDate}
            </Text>

            <Text
              size="xl"
              weight={700}
              style={{ color: "#37d229", marginBottom: 10 }}
            >
              ${book.price}
            </Text>
            <Group spacing="xs" style={{ marginBottom: 10 }}>
              {[...Array(4)].map((_, i) => (
                <Text key={i} style={{ color: "gold", fontSize: "24px" }}>
                  ★
                </Text>
              ))}
              <Text style={{ color: "gray", fontSize: "24px" }}>☆</Text>
            </Group>
            <Text size="md" color="gray" style={{ marginBottom: 10 }}>
              Category: {book.category}
            </Text>

            <Group spacing="md" style={{ marginTop: 20 }}>
              <Button
                variant="filled"
                onClick={handleBuyNow}
                style={{ backgroundColor: "#37d229", color: "#000000" }}
              >
                Buy Now
              </Button>
              <Button
                variant="light"
                onClick={handleAddToCart}
                style={{ color: "#000000" }}
              >
                Add to Cart
              </Button>
            </Group>
            <Text size="md" weight={500} style={{ marginTop: 20 }}>
              Lifetime Access
            </Text>
            <Group spacing="xs" style={{ marginTop: 10 }}>
              <ActionIcon
                variant="light"
                style={{ color: "#37d229" }}
                onClick={() =>
                  window.open("https://www.facebook.com", "_blank")
                }
              >
                <FaFacebookF size={24} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                style={{ color: "#37d229" }}
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }
              >
                <FaInstagram size={24} />
              </ActionIcon>
              <ActionIcon
                variant="light"
                style={{ color: "#37d229" }}
                onClick={() => window.open("https://www.twitter.com", "_blank")}
              >
                <FaTwitter size={24} />
              </ActionIcon>
            </Group>
          </Card>
        </Card>
        <Divider style={{ margin: "20px 0" }} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Text
            size="xl"
            weight={700}
            style={{
              flex: 1,
              cursor: "pointer",
              color: "black",
              borderBottom:
                visibleSection === "description" ? "2px solid #37d229" : "none",
              paddingBottom: 5,
            }}
            onClick={() => setVisibleSection("description")}
          >
            Description
          </Text>
          <Group
            spacing="lg"
            style={{ flex: 2, justifyContent: "space-between" }}
          >
            <Text
              size="xl"
              weight={700}
              style={{
                cursor: "pointer",
                color: "black",
                borderBottom:
                  visibleSection === "additionalInfo"
                    ? "2px solid #37d229"
                    : "none",
                paddingBottom: 5,
              }}
              onClick={() => setVisibleSection("additionalInfo")}
            >
              Additional Info
            </Text>
            <Text
              size="xl"
              weight={700}
              style={{
                cursor: "pointer",
                color: "black",
                borderBottom:
                  visibleSection === "reviews" ? " #37d229" : "none",
                paddingBottom: 5,
              }}
              onClick={() => setVisibleSection("reviews")}
            >
              Reviews
            </Text>
          </Group>
        </div>

        <Box>
          {visibleSection === "description" && (
            <Text size="md" style={{ marginBottom: 20 }}>
              {book.description}
            </Text>
          )}
          {visibleSection === "additionalInfo" && (
            <Text size="md" style={{ marginBottom: 20 }}>
              <strong>Published Date:</strong> {book.publishedDate}
              <br />
              <strong>Category:</strong> {book.category}
            </Text>
          )}
          {visibleSection === "reviews" && (
            <Text size="md" style={{ marginBottom: 20 }}>
              No reviews yet.
            </Text>
          )}
        </Box>

        {relatedBooks.length > 0 && (
          <Box mt="xl">
            <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
              Related Books
            </Text>
            <Grid>
              {relatedBooks.map((relatedBook) => (
                <Col span={12} sm={6} md={3} key={relatedBook.id}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <Card.Section
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      <Image
                        src={relatedBook.imageUrl || "/images/default-book.jpg"}
                        height={200}
                        width={150}
                        alt={relatedBook.title}
                        style={{ objectFit: "cover", borderRadius: "8px" }}
                        onClick={() => router.push(`/books/${relatedBook.id}`)}
                      />
                    </Card.Section>
                    <Text
                      size="lg"
                      weight={500}
                      style={{ marginTop: 10, textAlign: "center" }}
                    >
                      {relatedBook.title}
                    </Text>
                    <Text
                      size="md"
                      color="gray"
                      style={{ marginBottom: 10, textAlign: "center" }}
                    >
                      By {relatedBook.author}
                    </Text>
                    <Text
                      size="lg"
                      weight={700}
                      style={{
                        marginBottom: 10,
                        textAlign: "center",
                        color: "#37d229",
                      }}
                    >
                      ${relatedBook.price}
                    </Text>
                  </Card>
                </Col>
              ))}
            </Grid>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default BookDetailsPage;
