import React from "react";
import {
  Checkbox,
  Stack,
  Text,
  Divider,
  Card,
  createStyles,
} from "@mantine/core";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useBookStore } from "../store/useBookStore";

const categories = [
  "Fiction",
  "Non-Fiction",
  "Children's Books",
  "Educational & Textbooks",
  "Graphic Novels & Comics",
  "Religion & Spirituality",
  "Arts & Photography",
  "Special Collections",
];

const starRows = [
  { stars: 5, empty: 0 },
  { stars: 4, empty: 1 },
  { stars: 3, empty: 2 },
  { stars: 2, empty: 3 },
];

const useStyles = createStyles((theme) => ({
  star: {
    color: "#FFD700",
    fontSize: "1rem",
  },
  emptyStar: {
    color: theme.colors.gray[4],
    fontSize: "1rem",
  },
  starRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  checkbox: {
    marginRight: "8px",
  },
  rangeInputContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rangeInput: {
    width: "100%",
    appearance: "none",
    height: "6px",
    backgroundColor: "#ddd",
    borderRadius: "3px",
    position: "relative",
    "&:focus": {
      outline: "none",
    },
    "&::-webkit-slider-runnable-track": {
      backgroundColor: "#ddd",
      height: "6px",
      borderRadius: "3px",
    },
    "&::-webkit-slider-thumb": {
      appearance: "none",
      width: "16px",
      height: "16px",
      backgroundColor: "#37d229",
      borderRadius: "50%",
      cursor: "pointer",
      marginTop: "-5px",
      position: "relative",
      zIndex: 1,
    },
    "&::-moz-range-thumb": {
      width: "16px",
      height: "16px",
      backgroundColor: "#37d229",
      borderRadius: "50%",
      cursor: "pointer",
      position: "relative",
      zIndex: 1,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      height: "6px",
      backgroundColor: "#37d229",
      borderRadius: "3px",
      left: 0,
      top: 0,
      width: "calc(var(--val) * 100%)",
      zIndex: 0,
    },
  },
}));

const CategoryFilter = () => {
  const {
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories,
  } = useBookStore();
  const { classes } = useStyles();

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories(
      checked
        ? [...selectedCategories, category]
        : selectedCategories.filter((cat) => cat !== category)
    );
  };

  const handleStarRowChange = (rowIndex: number, checked: boolean) => {
    console.log(`Star row ${rowIndex} ${checked ? "checked" : "unchecked"}`);
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setPriceRange([0, value]);
    event.currentTarget.style.setProperty("--val", `${value / 1500}`);
  };

  return (
    <Card
      padding="md"
      shadow="xs"
      radius="md"
      style={{ width: "100%", maxWidth: "300px" }}
    >
      <Stack spacing="lg">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text size="lg" weight={700}>
            Books Category
          </Text>
          <br />
          <Stack spacing="xs" style={{ width: "100%" }}>
            {categories.map((category) => (
              <Checkbox
                key={category}
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={(event) =>
                  handleCategoryChange(category, event.currentTarget.checked)
                }
                style={{ marginBottom: 8 }}
              />
            ))}
          </Stack>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Text size="lg" weight={700} align="center">
            Books Rating
          </Text>

          <Stack spacing="xs">
            {starRows.map((row, index) => (
              <div key={index} className={classes.starRow}>
                <Checkbox
                  className={classes.checkbox}
                  onChange={(event) =>
                    handleStarRowChange(index, event.currentTarget.checked)
                  }
                />
                <div className={classes.starRow}>
                  {[...Array(row.stars)].map((_, i) => (
                    <FaStar key={`gold-${i}`} className={classes.star} />
                  ))}
                  {[...Array(row.empty)].map((_, i) => (
                    <FaStarHalfAlt
                      key={`empty-${i}`}
                      className={classes.emptyStar}
                    />
                  ))}
                </div>
              </div>
            ))}
          </Stack>
        </div>

        <Divider my="md" />

        <Text size="lg" weight={700} align="center">
          Price Range
        </Text>

        <div className={classes.rangeInputContainer}>
          <Text size="sm">0</Text>
          <input
            type="range"
            min="0"
            max="1500"
            value={priceRange[1]}
            onChange={handleRangeChange}
            className={classes.rangeInput}
            style={
              { "--val": `${priceRange[1] / 1500}` } as React.CSSProperties
            }
          />
          <Text size="sm">1500</Text>
        </div>

        <Text align="center" size="sm">
          Selected Range: {priceRange[0]} - {priceRange[1]}
        </Text>
      </Stack>
    </Card>
  );
};

export default CategoryFilter;
