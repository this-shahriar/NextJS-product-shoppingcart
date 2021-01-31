import { Box, Container, Flex } from "@chakra-ui/react";
import { useState } from "react";
// import { GetServerSideProps } from "next";
import { SelectedContext } from "../contexts/SelectedContext";
import { ProductType } from "../interfaces";
import Cart from "../modules/Cart";
import ProductList from "../modules/ProductList";
import { demoData } from "../demo/demo";

const Index = () => {
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
        <Flex bg="gray.100" padding="1rem" justify="space-between">
          <h2>Product page</h2>
          {/* <DarkModeSwitch /> */}
          <Cart />
        </Flex>
        <Box padding="1rem" />
        <ProductList />
      </Container>
    </SelectedContext.Provider>
  );
};

export default Index;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // todo
//   // Make server-side api calls here!
// };
