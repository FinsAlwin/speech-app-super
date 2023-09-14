import {
  Flex,
  Box,
  Button,
  Text,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/Card/Card";

export default function NewGameCategory({
  setAddNewGameCategory,
  setCategoryName,
  handleAddGameCategory,
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
  );
}
