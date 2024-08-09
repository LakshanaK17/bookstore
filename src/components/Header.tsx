import { Header, Container, Group, Text, Button } from "@mantine/core";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const AppHeader = () => {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const pathname = usePathname();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const isHomePage = pathname === "/" || activeLink === "home";

  return (
    <>
      <Header height={60} p="xs" style={{ width: "100%" }}>
        <Container fluid>
          <Group position="apart" align="center" style={{ width: "100%" }}>
            <Group>
              <Text weight={700} size="lg">
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
            </Group>
            <Group spacing="md">
              <Link href="/" passHref>
                <Text
                  weight={500}
                  onClick={() => handleLinkClick("home")}
                  style={{
                    color:
                      pathname === "/" || activeLink === "home"
                        ? "#000000"
                        : "#a0a0a0",
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Home
                  {(pathname === "/" || activeLink === "home") && (
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#37d229",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Text>
              </Link>
              <Link href="/shop" passHref>
                <Text
                  weight={500}
                  onClick={() => handleLinkClick("shop")}
                  style={{
                    color: pathname === "/shop" ? "#000000" : "#a0a0a0",
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Shop
                  {pathname === "/shop" && (
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#37d229",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Text>
              </Link>
              <Link href="/about" passHref>
                <Text
                  weight={500}
                  onClick={() => handleLinkClick("about")}
                  style={{
                    color: activeLink === "about" ? "#000000" : "#a0a0a0",
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  About
                  {activeLink === "about" && (
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#37d229",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Text>
              </Link>
              <Link href="/contact" passHref>
                <Text
                  weight={500}
                  onClick={() => handleLinkClick("contact")}
                  style={{
                    color: activeLink === "contact" ? "#000000" : "#a0a0a0",
                    position: "relative",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Contact
                  {activeLink === "contact" && (
                    <span
                      style={{
                        content: '""',
                        position: "absolute",
                        bottom: -6,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#37d229",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </Text>
              </Link>
              <Group spacing="md">
                <Button
                  variant="light"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#000000",
                  }}
                >
                  <MdSearch size={24} />
                </Button>
                <Button
                  variant="light"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "transparent",
                    color: "#000000",
                  }}
                >
                  <MdShoppingCart size={24} />
                </Button>
                <Button
                  variant="outline"
                  component="a"
                  href="/login"
                  style={{
                    borderRadius: "20px",
                    border: "none",
                    backgroundColor: "#a0a0a0",
                    color: "#000000",
                  }}
                >
                  Sign in
                </Button>
                <Button
                  variant="filled"
                  component="a"
                  href="/register"
                  style={{
                    backgroundColor: "#37d229",
                    color: "#000000",
                    borderRadius: "20px",
                    border: "none",
                  }}
                >
                  Register
                </Button>
              </Group>
            </Group>
          </Group>
        </Container>
      </Header>

      {(isHomePage || activeLink === "home") && (
        <Container style={{ marginTop: "20px", textAlign: "center" }}>
          <Text weight={500} size="xl">
            Read and add your insight
          </Text>
          <Text weight={300} size="md">
            Find Your Fort Book And Road Here For Free
          </Text>
        </Container>
      )}
    </>
  );
};

export default AppHeader;
