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
import { useEffect } from "react";

export default function EditGame({
  gameCategoryData,
  subscriptionData,
  setGameName,
  setGameUrl,
  setIsCameraRequired,
  setIsMicrophoneRequired,
  setGameSubscriptionId,
  setgameCategoryId,
  handleGameUpdate,
  gameEditItem,
  setGameEditItem,
}) {
  const textColor = useColorModeValue("gray.700", "white");

  useEffect(() => {
    if (gameEditItem) {
      setGameName(gameEditItem.gameName);
      setGameUrl(gameEditItem.gameIframeURL);
      setIsCameraRequired(gameEditItem.isCameraRequired);
      setIsMicrophoneRequired(gameEditItem.isMicrophoneRequired);
      setGameSubscriptionId(gameEditItem.subscriptionId._id);
      setgameCategoryId(gameEditItem.gameCategoryId._id);
    }
  }, [gameEditItem]);

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
            Update Game
          </Text>

          <Box>
            <Button variant="primary" maxH="30px" onClick={handleGameUpdate}>
              Update
            </Button>
            <Button
              variant="secondary"
              maxH="30px"
              onClick={() => setGameEditItem(null)}
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
              defaultValue={gameEditItem.gameName}
            />
          </FormControl>
          <FormControl isRequired p={1}>
            <Input
              placeholder="Game url"
              variant="flushed"
              onChange={(e) => setGameUrl(e.target.value)}
              defaultValue={gameEditItem.gameIframeURL}
            />
          </FormControl>
          <FormControl isRequired p={1}>
            <Select
              placeholder="Is camera required?"
              variant="flushed"
              onChange={(e) => setIsCameraRequired(e.target.value)}
              defaultValue={gameEditItem.isCameraRequired}
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
              defaultValue={gameEditItem.isMicrophoneRequired}
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
                defaultValue={gameEditItem.gameCategoryId._id} // This should be a valid _id from gameCategoryData
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
                defaultValue={gameEditItem.subscriptionId._id}
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
