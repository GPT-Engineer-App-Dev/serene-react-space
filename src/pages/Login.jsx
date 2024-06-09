import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Heading } from '@chakra-ui/react';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <Box p={4} maxW="md" borderWidth={1} borderRadius="lg" overflow="hidden">
        <Heading as="h2" size="lg" mb={4}>Login</Heading>
        <SupabaseAuthUI />
      </Box>
    </Container>
  );
};

export default Login;