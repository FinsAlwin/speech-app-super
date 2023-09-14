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
} from "@chakra-ui/react";
import Card from "components/Card/Card";
import { pageVisits, socialTraffic } from "variables/general";
import React from "react";

export default function Apps(props) {
  const { colorMode } = useColorMode();
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");
  const tableRowColor = useColorModeValue("#F7FAFC", "navy.900");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textTableColor = useColorModeValue("gray.500", "white");
  return (
    <Grid
      templateColumns={{ sm: "1fr", lg: "2fr 1fr" }}
      templateRows={{ lg: "repeat(2, auto)" }}
      gap="20px"
    >
      <Card
        transition="transform 1s ease-in-out"
        p="0px"
        maxW={{ sm: "320px", md: "100%" }}
      >
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Apps
            </Text>
            <Button variant="primary" maxH="30px">
              SEE ALL
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <Table>
              <Thead>
                <Tr bg={tableRowColor}>
                  <Th color="gray.400" borderColor={borderColor}>
                    Page name
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Visitors
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Unique users
                  </Th>
                  <Th color="gray.400" borderColor={borderColor}>
                    Bounce rate
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pageVisits.map((el, index, arr) => {
                  return (
                    <Tr key={index}>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        fontWeight="bold"
                        borderColor={borderColor}
                        border={index === arr.length - 1 ? "none" : null}
                      >
                        {el.pageName}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {el.visitors}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {el.uniqueUsers}
                      </Td>
                      <Td
                        color={textTableColor}
                        fontSize="sm"
                        border={index === arr.length - 1 ? "none" : null}
                        borderColor={borderColor}
                      >
                        {el.bounceRate}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Card>
    </Grid>
  );
}
