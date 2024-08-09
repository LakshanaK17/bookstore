"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Image,
  Text,
  Button,
  Stack,
  Radio,
  Container,
  TextInput,
  Grid,
  Col,
  Table,
  Group,
} from "@mantine/core";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  imageUrl?: string;
}

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 characters long"),
  country: z.string().min(1, "Country is required"),
  cardNumber: z.string().min(16, "Card number must be 16 digits").optional(),
  expirationDate: z
    .string()
    .min(5, "Expiration date must be in MM/YY format")
    .optional(),
  cvv: z.string().min(3, "CVV must be 3 digits").optional(),
});

const CheckoutPage = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [book, setBook] = useState<Book | null>(null);
  const [couponCode, setCouponCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      country: "Sri Lanka",
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    },
  });

  useEffect(() => {
    const storedBook = localStorage.getItem("selectedBook");
    if (storedBook) {
      setBook(JSON.parse(storedBook));
    }
  }, []);

  const onSubmit = (data: any) => {
    alert(`Order submitted! Total: $${book ? book.price.toFixed(2) : "0.00"}`);
    localStorage.removeItem("selectedBook");
    router.push("/thank-you");
  };

  const subtotal = book ? book.price : 0;
  const total = subtotal;

  const handleApplyCoupon = () => {
    console.log("Coupon Code Applied:", couponCode);
  };

  return (
    <Container
      fluid
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1200px",
      }}
    >
      <Grid style={{ width: "100%", maxWidth: "1200px" }}>
        <Col span={12} md={8}>
          <Card padding="lg" style={{ marginBottom: 20 }}>
            <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
              Billing Details
            </Text>
            <Grid>
              <Col span={6}>
                <TextInput
                  label="First Name"
                  placeholder="John"
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
              </Col>
              <Col span={6}>
                <TextInput
                  label="Last Name"
                  placeholder="Doe"
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
              </Col>
            </Grid>
            <TextInput
              label="Email"
              type="email"
              placeholder="Email Address"
              {...register("email")}
              error={errors.email?.message}
              styles={{
                input: {
                  borderColor: "#d3d3d3",
                  borderWidth: 2,
                  "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                },
              }}
            />
            <Grid>
              <Col span={6}>
                <TextInput
                  label="Mobile"
                  type="tel"
                  placeholder="+94 123 456 7890"
                  {...register("mobile")}
                  error={errors.mobile?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
              </Col>
              <Col span={6}>
                <TextInput
                  label="Country"
                  placeholder="Sri Lanka"
                  {...register("country")}
                  error={errors.country?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
              </Col>
            </Grid>
          </Card>

          <Card padding="lg">
            <Text size="xl" weight={700} style={{ marginBottom: 20 }}>
              Payment Method
            </Text>
            <Radio.Group
              value={paymentMethod}
              onChange={setPaymentMethod}
              style={{ marginBottom: 20 }}
            >
              <Group spacing="lg" position="left">
                <Radio value="card" label="Card" />
                <Radio value="bank" label="Bank" />
                <Radio value="transfer" label="Transfer" />
              </Group>
            </Radio.Group>

            {paymentMethod === "card" && (
              <Card
                padding="lg"
                style={{ backgroundColor: "#f8f8f8", marginTop: 20 }}
              >
                <TextInput
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  {...register("cardNumber")}
                  error={errors.cardNumber?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
                <TextInput
                  label="Expiration Date"
                  placeholder="MM/YY"
                  {...register("expirationDate")}
                  error={errors.expirationDate?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
                <TextInput
                  label="CVV"
                  placeholder="123"
                  {...register("cvv")}
                  error={errors.cvv?.message}
                  styles={{
                    input: {
                      borderColor: "#d3d3d3",
                      borderWidth: 2,
                      "&:focus": { borderColor: "#37d229", borderWidth: 2 },
                    },
                  }}
                />
                <Button
                  variant="filled"
                  fullWidth
                  style={{
                    marginTop: 20,
                    backgroundColor: "#37d229",
                    color: "#000000",
                    fontWeight: 700,
                  }}
                  onClick={handleSubmit(onSubmit)}
                >
                  Pay ${book ? book.price.toFixed(2) : "0.00"}
                </Button>
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                    color: "#666666",
                    fontSize: 14,
                  }}
                >
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our privacy policy.
                </Text>
              </Card>
            )}
          </Card>
        </Col>

        <Col span={12} md={4}>
          <Card
            padding="lg"
            style={{ backgroundColor: "#f8f8f8", marginTop: 20 }}
          >
            <Text size="xl" weight={700}>
              Order Summary
            </Text>
            {book && (
              <Table>
                <tbody>
                  <tr>
                    <td>
                      <Image
                        src={book.imageUrl}
                        height={60}
                        width={40}
                        alt={book.title}
                        style={{ objectFit: "cover", borderRadius: "4px" }}
                      />
                    </td>
                    <td style={{ fontWeight: 500 }}>{book.title}</td>
                    <td style={{ fontWeight: 500 }}>
                      ${book.price.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{ textAlign: "left", fontWeight: 700 }}
                    >
                      <TextInput
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(event) =>
                          setCouponCode(event.currentTarget.value)
                        }
                        style={{ flex: 1, marginRight: 10 }}
                      />
                    </td>
                    <td>
                      {" "}
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
                    </td>
                  </tr>

                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        textAlign: "left",
                        fontWeight: 700,
                        color: "#8c8c8c",
                      }}
                    >
                      SubTotal
                    </td>
                    <td style={{ fontWeight: 700, color: "#8c8c8c" }}>
                      ${subtotal.toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        textAlign: "left",
                        fontWeight: 700,
                        color: "#8c8c8c",
                      }}
                    >
                      Total
                    </td>
                    <td style={{ fontWeight: 700, color: "#37d229" }}>
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Card>
        </Col>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
