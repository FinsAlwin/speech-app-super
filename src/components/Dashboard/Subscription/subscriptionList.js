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

export default function SubscriptionList({
  subscriptionData,
  subscriptionEditItem,
  setSubscriptionName,
  handleSubscriptionUpdate,
  setSubscriptionEditItem,
  onOpen,
  deleteSlug,
  setIsSubscriptionDelete,
  setAddNewSubscription,
}) {
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const textTableColor = useColorModeValue("gray.500", "white");

  return (
    <Card
      transition="transform 1s ease-in-out"
      p="0px"
      maxW={{ sm: "320px", md: "100%" }}
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between" p="22px">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Subscription
          </Text>
          <Button
            variant="primary"
            maxH="30px"
            onClick={() => setAddNewSubscription(true)}
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
              {subscriptionData && (
                <>
                  {subscriptionData.length === 0 && (
                    <Center>
                      <Text fontSize="md" color={textColor}>
                        Subscriptions not found.
                      </Text>
                    </Center>
                  )}
                  {subscriptionData.map((item, index) => {
                    return (
                      <Tr key={index}>
                        <Td
                          color={textTableColor}
                          fontSize="sm"
                          fontWeight="bold"
                        >
                          {subscriptionEditItem &&
                          subscriptionEditItem._id === item._id ? (
                            <Input
                              variant="flushed"
                              placeholder="extra small size"
                              size="xs"
                              onChange={(e) =>
                                setSubscriptionName(e.target.value)
                              }
                              defaultValue={
                                subscriptionEditItem.subscriptionName
                              }
                            />
                          ) : (
                            item.subscriptionName
                          )}
                        </Td>
                        <Td color={textTableColor} fontSize="sm">
                          {subscriptionEditItem &&
                          subscriptionEditItem._id === item._id ? (
                            <>
                              <Button
                                variant="primary"
                                maxH="30px"
                                m={2}
                                onClick={handleSubscriptionUpdate}
                              >
                                Update
                              </Button>
                              <Button
                                variant="danger"
                                maxH="30px"
                                m={2}
                                onClick={() => setSubscriptionEditItem(null)}
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
                                onClick={() => setSubscriptionEditItem(item)}
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
                                  deleteSlug("subscription");
                                  setIsSubscriptionDelete(item);
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
