import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import { ProductType, SelectedTypes } from "../../interfaces";

interface Props {
  product: ProductType;
}

const ProductFooter = ({ product }: Props) => {
  const { id } = product;
  const {
    selected,
    addItem,
    removeItem,
    isSelected,
    demoData,
  } = useContext<SelectedTypes>(SelectedContext);

  const isDisabled = (): boolean => {
    const selectedTemp = isSelected(id);
    if (demoData && getTotalSelected() >= demoData?.max) return true;
    else if (selectedTemp && selectedTemp?.selected)
      return selectedTemp?.selected >= product?.maxSelection;
    else return false;
  };
  const getTotalSelected = () =>
    selected?.reduce(
      (acc: number, item: ProductType) =>
        item.selected ? item.selected + acc : acc,
      0
    ) || 0;

  return (
    <Flex align="center" justify="space-around">
      <Button
        isDisabled={!isSelected(id)}
        onClick={() => removeItem(id)}
        size="sm"
        variant="solid"
      >
        Remove
      </Button>
      <Box>
        <Text as="u">
          {isSelected(id) ? isSelected(id)?.selected : 0} selected
        </Text>
      </Box>
      <Button
        isDisabled={isDisabled()}
        onClick={() => addItem(product)}
        size="sm"
        variant="solid"
      >
        Add
      </Button>
    </Flex>
  );
};

export default ProductFooter;
