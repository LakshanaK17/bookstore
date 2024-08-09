import React from "react";
import {
  Footer,
  Container,
  Grid,
  Col,
  Text,
  Button,
  TextInput,
  List,
  Anchor,
  Group,
  Flex,
} from "@mantine/core";
import { FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

const AppFooter = () => {
  return (
    <>
      <Footer height={300} p="md" style={{ backgroundColor: "#f8f9fa" }}>
        <Container fluid>
          <Grid>
            <Col span={12} sm={6} md={4} lg={4}>
              <Flex direction="row" align="center" justify="flex-start" mb="md">
                <Text
                  weight={1000}
                  size="xl"
                  style={{
                    fontFamily: "Arial, sans-serif",
                    marginRight: "8px",
                  }}
                >
                  BOOK
                </Text>
                <Link href="/" passHref>
                  <Button
                    variant="light"
                    style={{
                      padding: "0",
                      height: "auto",
                      lineHeight: 1,
                      borderRadius: "20px",
                    }}
                  >
                    <Text
                      weight={700}
                      size="lg"
                      style={{
                        backgroundColor: "#37d229",
                        color: "#000000",
                        width: "100%",
                        textAlign: "center",
                        borderRadius: "20px",
                        padding: "2px 12px",
                      }}
                    >
                      ABC
                    </Text>
                  </Button>
                </Link>
              </Flex>
              <Text weight={700} size="lg" mb="md">
                Subscribe Now!
              </Text>
              <Group position="left" align="center" spacing="md">
                <TextInput
                  placeholder="Email Address"
                  radius="md"
                  size="md"
                  style={{ flex: 1, marginRight: 8, maxWidth: "300px" }}
                />
                <Button
                  leftIcon={<FaPaperPlane />}
                  style={{ backgroundColor: "#37d229", color: "#fff" }}
                  radius="sm"
                ></Button>
              </Group>
              <Text weight={700} mt="md" size="sm" color="dimmed">
                Contact Info
              </Text>
              <Text size="sm" style={{ whiteSpace: "nowrap" }}>
                17 Princess Road, London, Greater London NW1 8JR, UK
              </Text>
            </Col>
            <Col span={12} sm={6} md={3} lg={3}>
              <Text weight={700} size="lg">
                Popular Categories
              </Text>
              <List style={{ paddingLeft: 0, listStyleType: "none" }}>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Graphic Novels & Comics
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Religion & Spirituality
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Arts & Photography
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Educational & Textbooks
                  </Anchor>
                </List.Item>
              </List>
            </Col>
            <Col span={12} sm={6} md={3} lg={3}>
              <Text weight={700} size="lg">
                Customer Care
              </Text>
              <List style={{ paddingLeft: 0, listStyleType: "none" }}>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    My Account
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Discount
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Returns
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Orders History
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Order Tracking
                  </Anchor>
                </List.Item>
              </List>
            </Col>
            <Col span={12} sm={6} md={3} lg={2}>
              <Text weight={700} size="lg">
                Quick Action
              </Text>
              <List style={{ paddingLeft: 0, listStyleType: "none" }}>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Authors
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Books Compare
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    All Category
                  </Anchor>
                </List.Item>
                <List.Item>
                  <Anchor href="#" color="dimmed">
                    Blog
                  </Anchor>
                </List.Item>
              </List>
            </Col>
          </Grid>
          <Text align="center" mt="md" size="sm" color="dimmed">
            Copyright &copy; 2024 | All rights reserved.
          </Text>
        </Container>
      </Footer>
    </>
  );
};

export default AppFooter;
