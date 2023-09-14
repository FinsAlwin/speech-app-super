import {
  Flex,
  Box,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Center,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";

export default function GameCategory({
  addNewGame,
  data,
  gameCategoryEditItem,
  handleGameCategoryUpdate,
  categoryEditItem,
  onOpen,
  deleteSlug,
  gameCategoryDelete,
}) {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const textTableColor = useColorModeValue("gray.500", "white");

  return (
    <Card
      transition="transform 1s ease-in-out"
      p="0px"
      maxW={{ sm: "320px", md: "100%" }}
      boxShadow="md"
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between" p="22px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Games Category
          </Text>
          <Button
            variant="primary"
            maxH="30px"
            onClick={() => addNewGame(true)}
          >
            Add New Category
          </Button>
        </Flex>
        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          <Table>
            <Thead>
              <Tr bg={tableRowColor}>
                <Th color="gray.400">Category Name</Th>
                <Th color="gray.400"></Th>
              </Tr>
            </Thead>

            <Tbody>
              {data && (
                <>
                  {data.length === 0 && (
                    <Center>
                      <Text fontSize="md" color={textColor}>
                        Games category not found.
                      </Text>
                    </Center>
                  )}
                  {data.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {gameCategoryEditItem &&
                          gameCategoryEditItem._id === item._id ? (
                            <Input
                              variant="flushed"
                              placeholder="extra small size"
                              size="xs"
                              onChange={(e) => setCategoryName(e.target.value)}
                              defaultValue={gameCategoryEditItem.categoryName}
                            />
                          ) : (
                            item.categoryName
                          )}
                        </Td>
                        <Td color={textTableColor} fontSize="sm">
                          {gameCategoryEditItem &&
                          gameCategoryEditItem._id === item._id ? (
                            <>
                              <Button
                                variant="primary"
                                maxH="30px"
                                m={2}
                                onClick={handleGameCategoryUpdate}
                              >
                                Update
                              </Button>
                              <Button
                                variant="danger"
                                maxH="30px"
                                m={2}
                                onClick={() => categoryEditItem(null)}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                maxH="30px"
                                m={2}
                                onClick={() => categoryEditItem(item)}
                                size="xs"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                maxH="30px"
                                m={2}
                                onClick={() => {
                                  onOpen();
                                  deleteSlug("category");
                                  gameCategoryDelete(item);
                                }}
                                size="xs"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </Td>
                      </Tr>
                    );
                  })}
                </>
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Card>
  );
}
