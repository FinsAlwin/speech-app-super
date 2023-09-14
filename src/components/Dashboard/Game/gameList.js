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
  useColorModeValue,
  Text,
  Center,
} from "@chakra-ui/react";
import Card from "components/Card/Card";

export default function GameList({
  setAddNewGame,
  gameData,
  onOpen,
  setIsGameDelete,
  setDeleteSlug,
  setGameEditItem,
}) {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
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
            Games
          </Text>
          <Button
            variant="primary"
            maxH="30px"
            onClick={() => setAddNewGame(true)}
          >
            Add game
          </Button>
        </Flex>
        <Box overflow={{ sm: "scroll", lg: "hidden" }}>
          <Table>
            <Thead>
              <Tr bg={tableRowColor}>
                <Th color="gray.400" borderColor={borderColor}>
                  Game Name
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Game Url
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Game Category
                </Th>
                <Th color="gray.400" borderColor={borderColor}>
                  Subscription
                </Th>
                <Th color="gray.400" borderColor={borderColor}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {gameData && (
                <>
                  {gameData.length === 0 && (
                    <Center>
                      <Text fontSize="md" color={textColor}>
                        Games not found.
                      </Text>
                    </Center>
                  )}
                  {gameData.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.gameName}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.gameIframeURL}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.gameCategoryId.categoryName}
                        </Td>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {item.subscriptionId.subscriptionName}
                        </Td>
                        <Td color={textTableColor} fontSize="sm">
                          <>
                            <Button
                              variant="primary"
                              maxH="30px"
                              m={2}
                              size="xs"
                              onClick={() => setGameEditItem(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              maxH="30px"
                              m={2}
                              onClick={() => {
                                onOpen();
                                setDeleteSlug("games");
                                setIsGameDelete(item);
                              }}
                              size="xs"
                            >
                              Delete
                            </Button>
                          </>
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
