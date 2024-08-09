"use client";
import { Container, Grid, Col } from "@mantine/core";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";

const HomePage = () => (
  <Container fluid>
    <Grid>
      <Col span={12} sm={4} md={3}>
        <CategoryFilter />
      </Col>
      <Col span={12} sm={8} md={9}>
        <BookList />
      </Col>
    </Grid>
  </Container>
);

export default HomePage;
