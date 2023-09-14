import {
  Flex,
  Box,
  useColorMode,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
  Text,
  Grid,
  useToast,
  Center,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { pageVisits, socialTraffic } from "variables/general";
import React, { useEffect, useState } from "react";
import {
  getGameCategory,
  editGameCategory,
  addGameCategory,
  deleteGameCategory,
} from "services/game/gameCategory";
import { getGame, addGame, editGame, deleteGame } from "services/game/game";

export default function Games(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [gameCategoryData, setGameCategoryData] = useState([]);
  const [gameCategoryEditItem, setGameCategoryEditItem] = useState(null);
  const [isGameCategoryDelete, setIsGameCategoryDelete] = useState(null);
  const [addNewGameCategory, setAddNewGameCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [deleteSlug, setDeleteSlug] = useState("");
  const [gameData, setGame] = useState([]);
  const [gameEditItem, setGameEditItem] = useState(null);
  const [isGameDelete, setIsGameDelete] = useState(null);
  const [addNewGame, setAddNewGame] = useState(false);

  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");

  const categoryNameRegex = /^[a-zA-Z\s]+$/;

  useEffect(() => {
    const fetchGameCategoryData = async () => {
      try {
        const { data, message, status } = await getGameCategory();

        if (status === 200) {
          setGameCategoryData(data);
        } else {
          toast({
            title: message,
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: error,
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (gameCategoryData.length === 0) {
      fetchGameCategoryData();
    }
  }, [gameCategoryData]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const { data, message, status } = await getGame();

        if (status === 200) {
          setGame(data);
        } else {
          toast({
            title: message,
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: error,
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (gameCategoryData.length === 0) {
      fetchGameData();
    }
  }, [gameData]);

  const handleAddGameCategory = async () => {
    if (!categoryNameRegex.test(categoryName)) {
      toast({
        title: "Validation Failed",
        description: "Category name should only contain alphabetic characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await addGameCategory(categoryName);

      if (status === 201) {
        toast({
          title: message,
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAddNewGameCategory(false);
        setGameCategoryData([]);
      } else {
        toast({
          title: message,
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error,
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleGameCategoryUpdate = async () => {
    if (!categoryNameRegex.test(categoryName)) {
      toast({
        title: "Validation Failed",
        description: "Category name should only contain alphabetic characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await editGameCategory(
        gameCategoryEditItem._id,
        categoryName
      );

      if (status === 200) {
        toast({
          title: "Category added successfully",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setGameCategoryData([]);
        setGameCategoryEditItem(null);
      } else {
        toast({
          title: message,
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error,
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteGameCategory = async () => {
    try {
      const { message, status } = await deleteGameCategory(
        isGameCategoryDelete._id
      );

      if (status === 200) {
        toast({
          title: "Item deleted successfully",
          description: "", // You can add a description here if needed
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setGameCategoryData([]);
        setDeleteSlug("");
        onClose();
      } else {
        toast({
          title: message,
          description: "", // You can add a description here if needed
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message, // Render the error message instead of the entire error object
        description: "", // You can add a description here if needed
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    if (deleteSlug === "category") {
      handleDeleteGameCategory();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalBody>
            <Text fontSize="md" color={textColor} p={4}>
              You are about to Delete item
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="danger" mr={3} onClick={handleDelete} maxH="30px">
              Delete
            </Button>
            <Button variant="secondary" onClick={onClose} maxH="30px">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        {!addNewGame && (
          <Card
            transition="transform 1s ease-in-out"
            p="0px"
            maxW={{ sm: "320px", md: "100%" }}
          >
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Games Category
                </Text>
                <Button
                  variant="primary"
                  maxH="30px"
                  onClick={() => setAddNewGameCategory(true)}
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
                    {gameCategoryData && (
                      <>
                        {gameCategoryData.length === 0 && (
                          <Center>
                            <Text fontSize="md" color={textColor}>
                              Games category not found.
                            </Text>
                          </Center>
                        )}
                        {gameCategoryData.map((item, index) => {
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
                                    onChange={(e) =>
                                      setCategoryName(e.target.value)
                                    }
                                    defaultValue={
                                      gameCategoryEditItem.categoryName
                                    }
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
                                      onClick={() =>
                                        setGameCategoryEditItem(false)
                                      }
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
                                      onClick={() =>
                                        setGameCategoryEditItem(item)
                                      }
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="danger"
                                      maxH="30px"
                                      m={2}
                                      onClick={() => {
                                        onOpen();
                                        setDeleteSlug("category");
                                        setIsGameCategoryDelete(item);
                                      }}
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
        )}

        {addNewGame && (
          <Card
            transition="transform 1s ease-in-out"
            p="0px"
            maxW={{ sm: "320px", md: "100%" }}
          >
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Add New Game
                </Text>

                <Box>
                  <Button
                    variant="primary"
                    maxH="30px"
                    onClick={handleAddGameCategory}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    maxH="30px"
                    onClick={() => setAddNewGame(false)}
                  >
                    cancel
                  </Button>
                </Box>
              </Flex>
              <Box overflow={{ sm: "scroll", lg: "hidden" }} p={4}>
                <FormControl isRequired p={1}>
                  <FormLabel>Game name</FormLabel>
                  <Input placeholder="Game name" />
                </FormControl>
                <FormControl isRequired p={1}>
                  <FormLabel>Game URL</FormLabel>
                  <Input placeholder="Game url" />
                </FormControl>
                <FormControl isRequired p={1}>
                  <FormLabel>Camera required</FormLabel>
                  <Select placeholder="Select option">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
                <FormControl isRequired p={1}>
                  <FormLabel>Microphone required</FormLabel>
                  <Select placeholder="Select option">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Select>
                </FormControl>
                <FormControl isRequired p={1}>
                  <FormLabel>Select Category</FormLabel>
                  <Select placeholder="Select category">
                    {gameCategoryData.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.categoryName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl isRequired p={1}>
                  <FormLabel>Select Subscription</FormLabel>
                  <Select placeholder="Select Subscription">
                    {gameCategoryData.map((item, index) => (
                      <option value={item._id} key={index}>
                        {item.categoryName}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
          </Card>
        )}

        {!addNewGameCategory && (
          <Card
            transition="transform 1s ease-in-out"
            p="0px"
            maxW={{ sm: "320px", md: "100%" }}
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
                                  <Button variant="primary" maxH="30px" m={2}>
                                    Edit
                                  </Button>
                                  <Button
                                    variant="danger"
                                    maxH="30px"
                                    m={2}
                                    onClick={() => {
                                      onOpen();
                                      setDeleteSlug("games");
                                    }}
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
        )}

        {addNewGameCategory && (
          <Card
            transition="transform 1s ease-in-out"
            p="0px"
            maxW={{ sm: "320px", md: "100%" }}
          >
            <Flex direction="column">
              <Flex align="center" justify="space-between" p="22px">
                <Text fontSize="lg" color={textColor} fontWeight="bold">
                  Add Game Category
                </Text>

                <Box>
                  <Button
                    variant="primary"
                    maxH="30px"
                    onClick={handleAddGameCategory}
                    mr={2}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    maxH="30px"
                    onClick={() => setAddNewGameCategory(false)}
                  >
                    cancel
                  </Button>
                </Box>
              </Flex>
              <Box overflow={{ sm: "scroll", lg: "hidden" }} p={4}>
                <Input
                  variant="flushed"
                  placeholder="Enter Game Category"
                  size="xs"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </Box>
            </Flex>
          </Card>
        )}
      </Grid>
    </>
  );
}
