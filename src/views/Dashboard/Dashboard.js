import {
  Flex,
  Grid,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
  Box,
  Button,
  AvatarGroup,
  Avatar,
  Icon,
  Text,
  Image,
} from "@chakra-ui/react";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import IconBox from "components/Icons/IconBox";
import React, { useState, useEffect } from "react";
import { FaGamepad, FaAppStoreIos, FaUsers } from "react-icons/fa";
import { MdSubscriptions } from "react-icons/md";
import Users from "components/Dashboard/Users";
import Games from "components/Dashboard/Game";
import Apps from "components/Dashboard/Apps";
import Subscription from "components/Dashboard/Subscription";
import speechGame from "assets/img/speechGame.jpeg";
import users from "assets/img/users.jpeg";
import subscriptionImg from "assets/img/subscription.jpeg";
import application from "assets/img/application.jpeg";

export default function Dashboard() {
  const [drawer, setDrawer] = useState("");
  const [drawerOpen, setDrawerOpen] = useState("");
  const iconBlue = useColorModeValue("blue.500", "blue.500");
  const textColor = useColorModeValue("gray.700", "white");

  const handleCardClick = (slug) => {
    if (slug === drawer) {
      setDrawer("");
    } else {
      setDrawer(slug);
    }
  };

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Card p="16px" my="24px">
        <CardBody px="5px">
          <Grid
            templateColumns={{
              sm: "1fr",
              md: "1fr 1fr",
              xl: "repeat(4, 1fr)",
            }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap="4px"
          >
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={users} borderRadius="15px" />
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Users
                </Text>

                <Flex justifyContent="space-between">
                  <Button
                    size="sm"
                    variant="dark"
                    minW="110px"
                    h="36px"
                    onClick={() => handleCardClick("user")}
                  >
                    VIEW ALL
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={speechGame} borderRadius="15px" />
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Games
                </Text>

                <Flex justifyContent="space-between">
                  <Button
                    size="sm"
                    variant="dark"
                    minW="110px"
                    h="36px"
                    onClick={() => handleCardClick("games")}
                  >
                    VIEW ALL
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={subscriptionImg} borderRadius="15px" />
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Subscriptions
                </Text>

                <Flex justifyContent="space-between">
                  <Button
                    size="sm"
                    variant="dark"
                    minW="110px"
                    h="36px"
                    onClick={() => handleCardClick("subscription")}
                  >
                    VIEW ALL
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Box mb="20px" position="relative" borderRadius="15px">
                <Image src={application} borderRadius="15px" />
              </Box>
              <Flex direction="column">
                <Text fontSize="md" color="gray.400" fontWeight="600" mb="10px">
                  Applications
                </Text>

                <Flex justifyContent="space-between">
                  <Button variant="dark" minW="110px" h="36px" size="sm">
                    VIEW ALL
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        </CardBody>
      </Card>
      {drawer.length !== 0 && (
        <Box p={4}>
          {drawer === "user" && <Users />}
          {drawer === "games" && <Games />}
          {/* {drawer === "apps" && <Apps />} */}
          {drawer === "subscription" && <Subscription />}
        </Box>
      )}
    </Flex>
  );
}
