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
  useToast,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../../contexts/SelectedContext";
import { ProductType, SelectedTypes } from "../../interfaces";
import { FiShoppingCart } from "react-icons/fi";

const Cart = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { selected, removeItem } = useContext<SelectedTypes>(SelectedContext);
  const [totalPrice, setTotalPrice] = useState<number | undefined>();

  const getPrice = () => {
    return selected?.reduce(
      (acc: number, item: ProductType) =>
        acc + (item?.selected || 1) * item.price,
      0
    );
  };

  useEffect(() => {
    setTotalPrice(getPrice());
  }, [selected]);

  return (
    <>
      <Flex align="center">
        {totalPrice && totalPrice > 0 ? (
          <Tag colorScheme="whiteAlpha" margin="0 0.5rem" variant="solid">
            ${totalPrice}
          </Tag>
        ) : (
          ""
        )}
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
              <Flex pb="1rem" justify="center" alignItems="center">
                <FiShoppingCart />
                <Text pl="0.5rem" textAlign="center">
                  Empty
                </Text>
              </Flex>
            )}
            <Flex bg="#eaeaea" p="1rem" borderRadius="9px" direction="column">
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
                      aria-label="Remove one"
                      colorScheme="red"
                    >
                      <MinusIcon />
                    </IconButton>
                  </Box>
                </Flex>
              ))}
            </Flex>
            {totalPrice && totalPrice > 0 ? (
              <>
                <Divider
                  borderColor="gray"
                  borderBottomWidth="2px"
                  margin="0.5rem 0"
                />
                <Text align="right">Total - ${totalPrice}</Text>
              </>
            ) : (
              ""
            )}
            {selected && selected.length > 0 && (
              <Center>
                <Button
                  m="1rem 0"
                  size="md"
                  isFullWidth
                  colorScheme="teal"
                  variant="solid"
                  onClick={() =>
                    toast({
                      title: "Redirect to your payment gateway",
                      position: "top",
                    })
                  }
                >
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
