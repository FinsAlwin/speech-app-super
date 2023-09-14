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
  getSubscription,
  addSubscription,
  editSubscription,
  deleteSubscription,
} from "services/subscription/subscription";
import SubscriptionList from "./subscriptionList";
import NewSubscription from "./newSubscription";

export default function Subscription(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [subscriptionData, setSubscriptionData] = useState([]);
  const [subscriptionEditItem, setSubscriptionEditItem] = useState(null);
  const [isSubscriptionDelete, setIsSubscriptionDelete] = useState(null);
  const [addNewSubscription, setAddNewSubscription] = useState(false);
  const [subscriptionName, setSubscriptionName] = useState("");
  const [deleteSlug, setDeleteSlug] = useState("");

  const textColor = useColorModeValue("gray.700", "white");

  const subscriptionNameRegex = /^[a-zA-Z\s]+$/;

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

  const handleAddSubscription = async () => {
    if (!subscriptionNameRegex.test(subscriptionName)) {
      toast({
        title: "Validation Failed",
        description:
          "Subscription name should only contain alphabetic characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await addSubscription(subscriptionName);

      if (status === 201) {
        toast({
          title: message,
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setAddNewSubscription(false);
        setSubscriptionData([]);
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

  const handleSubscriptionUpdate = async () => {
    if (!subscriptionNameRegex.test(subscriptionName)) {
      toast({
        title: "Validation Failed",
        description:
          "Subscription name should only contain alphabetic characters.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const { message, status } = await editSubscription(
        subscriptionEditItem._id,
        subscriptionName
      );

      if (status === 200) {
        toast({
          title: "Subscription added successfully",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setSubscriptionData([]);
        setSubscriptionEditItem(null);
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

  const handleDeleteSubscription = async () => {
    try {
      const { message, status } = await deleteSubscription(
        isSubscriptionDelete._id
      );

      if (status === 200) {
        toast({
          title: "Item deleted successfully",
          description: "", // You can add a description here if needed
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setSubscriptionData([]);
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
    if (deleteSlug === "subscription") {
      handleDeleteSubscription();
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
        <SubscriptionList
          subscriptionData={subscriptionData}
          subscriptionEditItem={subscriptionEditItem}
          setSubscriptionName={setSubscriptionName}
          handleSubscriptionUpdate={handleSubscriptionUpdate}
          setSubscriptionEditItem={setSubscriptionEditItem}
          onOpen={onOpen}
          deleteSlug={setDeleteSlug}
          setAddNewSubscription={setAddNewSubscription}
          setIsSubscriptionDelete={setIsSubscriptionDelete}
        />
        {addNewSubscription && (
          <NewSubscription
            setAddNewSubscription={setAddNewSubscription}
            setSubscriptionName={setSubscriptionName}
            handleAddSubscription={handleAddSubscription}
          />
        )}
      </Grid>
    </>
  );
}
