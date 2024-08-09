import { Grid, Col, Container } from "@mantine/core";
import BookCard from "./BookCard";
import { books } from "../data/books";
import { useState } from "react";

const BookList = () => {
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedCardId(id);
  };

  return (
    <Container fluid>
      <Grid gutter="md" style={{ margin: 0 }}>
        {books.map((book) => (
          <Col
            key={book.id}
            span={4}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <BookCard
              {...book}
              isSelected={book.id === selectedCardId}
              onSelect={handleSelect}
            />
          </Col>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;
