import { Fragment, useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Flex,
  IconButton,
  Spacer,
  useDisclosure,
  useMediaQuery,
  useTheme,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { HiMenu } from 'react-icons/hi';

const Header: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMd] = useMediaQuery(
    `(min-width: ${theme.breakpoints.md})`,
    { ssr: true, fallback: false }
  );

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    // Clean up the effect when the component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const isNotLargeAndIsOpen = !isLargerThanMd && isOpen;
  console.log({ isOpen, isLargerThanMd, isNotLargeAndIsOpen });

  const buttons = [
    <Button
      onClick={() => {
        navigate('/blog');
        onClose();
      }}
      variant='ghost'
      size={['md', null, 'sm']}
    >
      Блог
    </Button>,
    <Button
      onClick={() => {
        onClose();
      }}
      variant='ghost'
      size={['md', null, 'sm']}
    >
      Теги
    </Button>,
    <Button
      onClick={() => {
        navigate('/login');
        onClose();
      }}
      variant='solid'
      size={['md']}
    >
      Войти
    </Button>,
  ];

  let content = (
    <Flex pt='1.5' align={'center'}>
      <Box>Лого</Box>
      <Spacer />
      {isLargerThanMd ? (
        <ButtonGroup alignItems='center' gap='2'>
          {buttons.map((button, idx) => (
            <Fragment key={idx}>{button}</Fragment>
          ))}
        </ButtonGroup>
      ) : (
        <>
          {!isOpen ? (
            <IconButton
              size='sm'
              variant='outline'
              icon={<Icon as={HiMenu} boxSize={5} />}
              aria-label={'Open menu'}
              onClick={onOpen}
            />
          ) : (
            <CloseButton onClick={onClose} size='md' />
          )}
        </>
      )}
    </Flex>
  );

  return (
    <Container mb="5" minH={isNotLargeAndIsOpen ? '100vh' : 'auto'}>
      {isNotLargeAndIsOpen ? (
        <Flex direction='column' gap='4'>
          {content}
          <SimpleGrid alignItems={'center'} spacing={'20px'} minChildWidth={'150px'}>
            {buttons.map((button, idx) => (
              <Fragment key={idx}>{button}</Fragment>
            ))}
          </SimpleGrid>
        </Flex>
      ) : (
        content
      )}
    </Container>
  );
};

export default Header;
