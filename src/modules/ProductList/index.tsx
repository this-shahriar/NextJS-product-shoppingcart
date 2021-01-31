import { Box, Flex, Grid, Spacer } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import { ProductType, SelectedTypes } from "../../interfaces";
import ProductCard from "../ProductCard";

const ProductList = () => {
  const { demoData } = useContext<SelectedTypes>(SelectedContext);
  return (
    <>
      <Flex padding="0 1rem">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {demoData?.products?.map((item: ProductType) => (
            <ProductCard key={item?.id} product={item} />
          ))}
        </Grid>
      </Flex>
      <Box padding="2rem" />
    </>
  );
};

export default ProductList;
