import { Button, Heading, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

const Login: FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <Heading>Login Page</Heading>
      <Text>{counter}</Text>
      <Button onClick={() => setCounter(counter + 1)}>
        Increment the counter!
      </Button>
    </>
  );
};

export default Login;
