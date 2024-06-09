import { Container, Text, VStack, Box, Flex, Spacer, IconButton, useColorMode, useColorModeValue, Spinner, Heading, SimpleGrid, Card, CardBody, CardHeader } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useEvents } from "../integrations/supabase/index.js";

const Events = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <Box bg={bg} color={color} minH="100vh">
        <Flex as="nav" bg={useColorModeValue("white", "gray.800")} p={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">MyApp</Text>
          <Spacer />
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Flex>
        <Container centerContent maxW="container.md" py={8}>
          <Spinner size="xl" />
        </Container>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box bg={bg} color={color} minH="100vh">
        <Flex as="nav" bg={useColorModeValue("white", "gray.800")} p={4} boxShadow="md">
          <Text fontSize="xl" fontWeight="bold">MyApp</Text>
          <Spacer />
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
        </Flex>
        <Container centerContent maxW="container.md" py={8}>
          <Text fontSize="2xl" color="red.500">Failed to load events.</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex as="nav" bg={useColorModeValue("white", "gray.800")} p={4} boxShadow="md">
        <Text fontSize="xl" fontWeight="bold">MyApp</Text>
        <Spacer />
        <IconButton
          aria-label="Toggle dark mode"
          icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
        />
      </Flex>
      <Container centerContent maxW="container.md" py={8}>
        <Heading as="h1" size="xl" mb={8}>Events</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {events.map(event => (
            <Card key={event.id} boxShadow="md">
              <CardHeader>
                <Heading size="md">{event.name}</Heading>
              </CardHeader>
              <CardBody>
                <Text>Date: {new Date(event.date).toLocaleDateString()}</Text>
                <Text>Venue ID: {event.venue_id}</Text>
                <Text>Starred: {event.is_starred ? "Yes" : "No"}</Text>
                <Text>Private: {event.private ? "Yes" : "No"}</Text>
                <Text>Cancelled: {event.cancelled ? "Yes" : "No"}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Events;