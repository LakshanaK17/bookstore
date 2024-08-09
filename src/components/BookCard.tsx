"use client";
import { useRouter } from "next/navigation";
import {
  Card,
  Image,
  Text,
  Group,
  ActionIcon,
  Box,
  Stack,
} from "@mantine/core";
import {
  AiOutlineEye,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";
import { useState } from "react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: number;
  review?: string;
  imageUrl?: string;
  onSelect: (id: string) => void;
  isSelected: boolean;
  category: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  title,
  author,
  price,
  review,
  imageUrl,
  isSelected,
  onSelect,
}) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    router.push(`/books/${id}`);
    onSelect(id);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      style={{
        position: "relative",
        width: "300px",
        height: 350,
        display: "flex",
        flexDirection: "column",
        border: isSelected || isHovered ? "2px solid #37d229" : "none",
        borderRadius: "md",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: isHovered ? "#f5f5f5" : "white",
        transition: "border 0.3s ease, background-color 0.3s ease",
      }}
      onClick={handleCardClick}
      radius="md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Section
        style={{
          position: "relative",
          height: 280,
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#d3d3d3",
          }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              height={200}
              width={150}
              style={{
                objectFit: "contain",
              }}
              alt={title}
            />
          )}
        </Box>
        <Group
          position="right"
          spacing="xs"
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            display: "flex",
            flexDirection: "column",
            transform: "translateY(-50%)",
            gap: "10px",
            zIndex: 3,
          }}
        >
          <ActionIcon variant="light" size="lg" style={{ color: "black" }}>
            <AiOutlineEye size={20} />
          </ActionIcon>
          <ActionIcon variant="light" size="lg" style={{ color: "black" }}>
            <AiOutlineShoppingCart size={20} />
          </ActionIcon>
          <ActionIcon variant="light" size="lg" style={{ color: "black" }}>
            <AiOutlineHeart size={20} />
          </ActionIcon>
        </Group>
      </Card.Section>
      <Stack
        spacing="xs"
        style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}
      >
        <Text weight={500} size="lg">
          {title}
        </Text>
        <Text size="sm" color="gray">
          {author}
        </Text>
        <Text
          weight={500}
          size="lg"
          style={{ marginTop: "auto", color: "#37d229" }}
        >
          ${price}
        </Text>
      </Stack>
    </Card>
  );
};

export default BookCard;
