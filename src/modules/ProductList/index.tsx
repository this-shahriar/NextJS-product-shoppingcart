import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import { ProductType, SelectedTypes } from "../../interfaces";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { demoData } = useContext<SelectedTypes>(SelectedContext);
  return (
    <>
      <Flex padding="0 1rem">
        <Grid
          templateColumns={{
            lg: "repeat(4, 1fr)",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
          gap={4}
          w="100%"
        >
          {demoData?.products?.map((item: ProductType) => (
            <GridItem colSpan={1} key={item?.id}>
              <ProductCard product={item} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
      <Box padding="2rem" />
    </>
  );
};

export default ProductList;
