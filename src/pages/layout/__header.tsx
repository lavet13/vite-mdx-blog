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
  Wrap,
  WrapItem,
  Icon,
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
      size={['xs', null, 'sm']}
    >
      Блог
    </Button>,
    <Button
      onClick={() => {
        onClose();
      }}
      variant='ghost'
      size={['xs', null, 'sm']}
    >
      Теги
    </Button>,
    <Button
      onClick={() => {
        navigate('/login');
        onClose();
      }}
      variant='solid'
      size={['sm', null, 'md']}
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
    <Container minH={isNotLargeAndIsOpen ? '100vh' : 'auto'}>
      {isNotLargeAndIsOpen ? (
        <Flex direction='column' gap='1'>
          {content}
          <Wrap align='center' justify='center' spacing='4'>
            {buttons.map((button, idx) => (
              <WrapItem key={idx}>{button}</WrapItem>
            ))}
          </Wrap>
        </Flex>
      ) : (
        content
      )}
    </Container>
  );
};

export default Header;
