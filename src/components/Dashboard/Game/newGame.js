import {
  Flex,
  Box,
  Button,
  useColorModeValue,
  Text,
  Input,
  FormControl,
  Select,
} from "@chakra-ui/react";
import Card from "components/Card/Card";

export default function NewGame({
  setAddNewGame,
  gameCategoryData,
  subscriptionData,
  setGameName,
  setGameUrl,
  setIsCameraRequired,
  setIsMicrophoneRequired,
  setGameSubscriptionId,
  setgameCategoryId,
  handleAddNewGame,
}) {
  const textColor = useColorModeValue("gray.700", "white");

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
            Add New Game
          </Text>

          <Box>
            <Button variant="primary" maxH="30px" onClick={handleAddNewGame}>
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
            <Input
              placeholder="Game name"
              variant="flushed"
              onChange={(e) => setGameName(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={1}>
            <Input
              placeholder="Game url"
              variant="flushed"
              onChange={(e) => setGameUrl(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired p={1}>
            <Select
              placeholder="Is camera required?"
              variant="flushed"
              onChange={(e) => setIsCameraRequired(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Select>
          </FormControl>
          <FormControl isRequired p={1}>
            <Select
              placeholder="Is microphone required?"
              variant="flushed"
              onChange={(e) => setIsMicrophoneRequired(e.target.value)}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Select>
          </FormControl>
          <FormControl isRequired p={1}>
            {gameCategoryData && (
              <Select
                placeholder="Select game category"
                variant="flushed"
                onChange={(e) => setgameCategoryId(e.target.value)}
              >
                {gameCategoryData.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.categoryName}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
          <FormControl isRequired p={1}>
            {subscriptionData && (
              <Select
                placeholder="Select Subscription"
                variant="flushed"
                onChange={(e) => setGameSubscriptionId(e.target.value)}
              >
                {subscriptionData.map((item, index) => (
                  <option value={item._id} key={index}>
                    {item.subscriptionName}
                  </option>
                ))}
              </Select>
            )}
          </FormControl>
        </Box>
      </Flex>
    </Card>
  );
}
