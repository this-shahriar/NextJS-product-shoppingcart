import { useContext } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { ProductType, SelectedTypes } from "../../interfaces";
import { SelectedContext } from "../../contexts/SelectedContext";
import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";

interface Props {
  product: ProductType;
}

const ProductFooter = ({ product }: Props) => {
  const { id } = product;
  const { selected, addItem, removeItem, isSelected, demoData } =
    useContext<SelectedTypes>(SelectedContext);

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
      <ButtonGroup
        w="100%"
        isAttached
        variant="solid"
        colorScheme="teal"
        size="md"
      >
        <Button
          isFullWidth
          isDisabled={isDisabled()}
          onClick={() => addItem(product)}
          mr="-px"
        >
          Add to cart {isSelected(id) ? `(${isSelected(id)?.selected})` : ""}
        </Button>
        <IconButton
          isDisabled={!isSelected(id)}
          onClick={() => removeItem(id)}
          aria-label="Remove from cart"
          icon={<AiOutlineMinusCircle />}
        />
      </ButtonGroup>
    </Flex>
  );
};

export default ProductFooter;
