import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  Flex,
  Text,
  Divider,
  Tag,
  Box,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";

import { useContext } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import { ProductType, SelectedTypes } from "../../interfaces";

const Cart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selected, removeItem } = useContext<SelectedTypes>(SelectedContext);
  const getPrice = () => {
    return selected?.reduce(
      (acc: number, item: ProductType) =>
        acc + (item?.selected || 1) * item.price,
      0
    );
  };

  return (
    <>
      <Flex align="center">
        <Tag margin="0 0.5rem" variant="solid">
          ${getPrice()}
        </Tag>
        <Divider orientation="vertical" />
        <Button onClick={onOpen}>View Cart</Button>
      </Flex>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cart Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {(!selected || selected?.length === 0) && (
              <Text>No Item Selected</Text>
            )}
            {selected?.map((item: ProductType) => (
              <Flex padding="0.3rem 0" align="center" key={item?.id}>
                <Box flex={1}>{item?.selected} x</Box>
                <Box maxWidth="55%" align="left">
                  <Text isTruncated>{item?.title}</Text>
                </Box>
                <Box flex={2}>
                  <Text align="right">
                    ${item?.price * (item?.selected || 1)}
                  </Text>
                </Box>
                <Box>
                  <IconButton
                    marginLeft="0.5rem"
                    size="xs"
                    onClick={() => removeItem(item?.id)}
                    bg="red.200"
                    aria-label="Remove one"
                  >
                    <MinusIcon />
                  </IconButton>
                </Box>
              </Flex>
            ))}
            <Divider
              borderColor="gray"
              borderBottomWidth="2px"
              margin="0.5rem 0"
            />
            <Text align="right">Total - ${getPrice()}</Text>
            {selected && selected.length > 0 && (
              <Center>
                <Button size="sm" bg="blue.400" variant="solid">
                  Checkout
                </Button>
              </Center>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Cart;
