import { useState } from "react";
import Cart from "../modules/Cart";
import { demoData } from "../demo/demo";
import { GetServerSideProps } from "next";
import ProductList from "../modules/ProductList";
import { AiOutlineShopping } from "react-icons/ai";
import { DemoDataType, ProductType } from "../interfaces";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { SelectedContext } from "../contexts/SelectedContext";

const Index = ({ demoData }: { demoData: DemoDataType }) => {
  const [selected, setSelected] = useState<ProductType[]>();

  const isSelected = (id: number) =>
    selected?.find((item: ProductType) => item?.id === id);

  const addItem = (product: ProductType) => {
    setSelected((state: any) => {
      if (isSelected(product?.id))
        return state?.map((item: ProductType) => {
          if (item?.id === product?.id && item?.selected)
            item.selected = item?.selected + 1;
          return item;
        });
      else {
        return selected
          ? [...state, { ...product, selected: 1 }]
          : [{ ...product, selected: 1 }];
      }
    });
  };

  const removeItem = (id: number) => {
    if (isSelected(id)?.selected == 1)
      setSelected((state: any) =>
        state?.filter((item: ProductType) => item?.id !== id)
      );
    else
      setSelected((state: any) => {
        return state?.map((item: ProductType) => {
          if (item?.id === id && item?.selected)
            item.selected = item.selected - 1;
          return item;
        });
      });
  };

  return (
    <SelectedContext.Provider
      value={{
        selected,
        setSelected,
        demoData,
        addItem,
        removeItem,
        isSelected,
      }}
    >
      <Container maxW="6xl">
        <Flex
          mt="1rem"
          borderRadius="9px"
          bg="#329694"
          boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
          padding="1rem"
          justify="space-between"
          align="center"
        >
          <Flex color="#fafafa">
            <AiOutlineShopping fontSize="1.6rem" />
            <Text pl="0.5rem" fontSize="1.2rem" fontWeight="bold">
              E-com
            </Text>
          </Flex>
          <Cart />
        </Flex>
        <Box padding="1rem" />
        <ProductList />
      </Container>
    </SelectedContext.Provider>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      demoData: demoData,
    },
  };
};
