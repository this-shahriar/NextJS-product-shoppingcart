import { Box, Flex, Image, Text } from "@chakra-ui/react";
import ProductFooter from "../ProductFooter";
import { ProductCardProps } from "../../interfaces";

const ProductCard = ({ product }: ProductCardProps) => (
  <Flex
    w="100%"
    bg="gray.100"
    direction="column"
    borderWidth="1px"
    overflow="hidden"
    borderRadius="9px"
  >
    <Flex overflow="hidden" w="100%" height="12rem">
      <Image
        _hover={{ transform: "scale(1.1)" }}
        transition="all linear 0.2s"
        width="100%"
        objectFit="cover"
        src={product?.thumbnailUrl}
      />
    </Flex>
    <Flex p="1rem" direction="column">
      <Text variant="samp" fontWeight="bold" isTruncated>
        {product?.title}
      </Text>
      {product?.maxSelection ? (
        <Text fontSize="0.9rem">{product.maxSelection} items left</Text>
      ) : (
        ""
      )}
      <Box padding="0.5rem" />
      <ProductFooter product={product} />
    </Flex>
  </Flex>
);

export default ProductCard;
