import {
  Button,
  useColorModeValue,
  Text,
  Grid,
  useToast,
  useDisclosure,
  Modal,
  ModalContent,
  ModalFooter,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  getGameCategory,
  editGameCategory,
  addGameCategory,
  deleteGameCategory,
} from "services/game/gameCategory";
import { getGame, addGame, editGame, deleteGame } from "services/game/game";
import { getSubscription } from "services/subscription/subscription";
import GameCategory from "./gameCategory";
import NewGameCategory from "./newGameCategory";
import GameList from "./gameList";
import NewGame from "./newGame";
import EditGame from "./editGame";

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
  const [gameName, setGameName] = useState("");
  const [gameUrl, setGameUrl] = useState("");
  const [gameSubscriptionId, setGameSubscriptionId] = useState("");
  const [gameCategoryId, setgameCategoryId] = useState("");
  const [isCameraRequired, setIsCameraRequired] = useState(false);
  const [isMicrophoneRequired, setIsMicrophoneRequired] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);

  const textColor = useColorModeValue("gray.700", "white");

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

    if (gameData.length === 0) {
      fetchGameData();
    }
  }, [gameData]);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { data, message, status } = await getSubscription();

        if (status === 200) {
          setSubscriptionData(data);
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

    if (subscriptionData.length === 0) {
      fetchSubscriptionData();
    }
  }, [subscriptionData]);

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

  const handleDeleteGame = async () => {
    try {
      const { message, status } = await deleteGame(isGameDelete._id);

      if (status === 200) {
        toast({
          title: "Item deleted successfully",
          description: "", // You can add a description here if needed
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setGame([]);
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
    if (deleteSlug === "games") {
      handleDeleteGame();
    }
  };

  const handleAddNewGame = async () => {
    if (gameName.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game name required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameUrl.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game url required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameSubscriptionId.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Subscription Id required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameCategoryId.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game category Id required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isCameraRequired) {
      toast({
        title: "Validation Failed",
        description: "Is Camera Required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isMicrophoneRequired) {
      toast({
        title: "Validation Failed",
        description: "Is Microphone Required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await addGame(
        gameName,
        gameUrl,
        gameSubscriptionId,
        isCameraRequired,
        isMicrophoneRequired,
        gameCategoryId
      );

      if (status === 201) {
        toast({
          title: message,
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAddNewGame(false);
        setGame([]);
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

  const handleGameUpdate = async () => {
    if (gameName.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game name required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameUrl.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game url required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameSubscriptionId.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Subscription Id required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameCategoryId.length === 0) {
      toast({
        title: "Validation Failed",
        description: "Game category Id required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isCameraRequired) {
      toast({
        title: "Validation Failed",
        description: "Is Camera Required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!isMicrophoneRequired) {
      toast({
        title: "Validation Failed",
        description: "Is Microphone Required.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await editGame(
        gameEditItem._id,
        gameName,
        gameUrl,
        gameSubscriptionId,
        isCameraRequired,
        isMicrophoneRequired,
        gameCategoryId
      );

      if (status === 200) {
        toast({
          title: message,
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setGameEditItem(null);
        setGame([]);
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
        templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        <GameList
          setAddNewGame={setAddNewGame}
          gameData={gameData}
          onOpen={onOpen}
          setIsGameDelete={setIsGameDelete}
          setDeleteSlug={setDeleteSlug}
          setGameEditItem={setGameEditItem}
        />

        <GameCategory
          addNewGame={setAddNewGameCategory}
          data={gameCategoryData}
          gameCategoryEditItem={gameCategoryEditItem}
          handleGameCategoryUpdate={handleGameCategoryUpdate}
          categoryEditItem={setGameCategoryEditItem}
          onOpen={onOpen}
          deleteSlug={setDeleteSlug}
          gameCategoryDelete={setIsGameCategoryDelete}
        />
      </Grid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr 1fr" }}
        templateRows={{ lg: "repeat(2, auto)" }}
        gap="20px"
      >
        {addNewGameCategory && (
          <NewGameCategory
            setAddNewGameCategory={setAddNewGameCategory}
            setCategoryName={setCategoryName}
            handleAddGameCategory={handleAddGameCategory}
          />
        )}
        {addNewGame && (
          <NewGame
            handleAddGameCategory={handleAddGameCategory}
            setAddNewGame={setAddNewGame}
            gameCategoryData={gameCategoryData}
            subscriptionData={subscriptionData}
            setGameName={setGameName}
            setGameUrl={setGameUrl}
            setIsCameraRequired={setIsCameraRequired}
            setIsMicrophoneRequired={setIsMicrophoneRequired}
            setGameSubscriptionId={setGameSubscriptionId}
            setgameCategoryId={setgameCategoryId}
            handleAddNewGame={handleAddNewGame}
          />
        )}
        {gameEditItem && (
          <EditGame
            gameCategoryData={gameCategoryData}
            subscriptionData={subscriptionData}
            setGameName={setGameName}
            setGameUrl={setGameUrl}
            setIsCameraRequired={setIsCameraRequired}
            setIsMicrophoneRequired={setIsMicrophoneRequired}
            setGameSubscriptionId={setGameSubscriptionId}
            setgameCategoryId={setgameCategoryId}
            handleGameUpdate={handleGameUpdate}
            gameEditItem={gameEditItem}
            setGameEditItem={setGameEditItem}
          />
        )}
      </Grid>
    </>
  );
}
