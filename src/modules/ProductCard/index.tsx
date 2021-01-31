import { Box, Image, Text } from "@chakra-ui/react";
import ProductFooter from "../ProductFooter";
import { ProductCardProps } from "../../interfaces";

const ProductCard = ({ product }: ProductCardProps) => (
  <Box
    w="100%"
    padding="1rem"
    borderWidth="1px"
    borderRadius="0.3rem"
    overflow="hidden"
    bg="gray.100"
  >
    <Image width="100%" objectFit="cover" src={product?.thumbnailUrl} />
    <Text color="gray" variant="samp" fontWeight="bold" isTruncated>
      {product?.title}
    </Text>
    <Box padding="0.5rem" />
    <ProductFooter product={product} />
  </Box>
);

export default ProductCard;
