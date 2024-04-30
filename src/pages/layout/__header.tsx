import { Fragment, useEffect, useLayoutEffect, useRef } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
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
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

const Header: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMd] = useMediaQuery(
    `(min-width: ${theme.breakpoints.md})`,
    { ssr: true, fallback: false }
  );

  const isNotLargetAndIsOpen = !isLargerThanMd && isOpen;
  console.log({ isOpen, isLargerThanMd, isNotLargetAndIsOpen });

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

  useLayoutEffect(() => {
    if (isNotLargetAndIsOpen) {
      if (containerRef.current && placeholderRef.current) {
        const menuHeight = containerRef.current.offsetHeight;
        placeholderRef.current.style.height = `${menuHeight}px`;
      }
    }
  }, [isNotLargetAndIsOpen]);

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
              icon={<HamburgerIcon />}
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
    <>
      {isNotLargetAndIsOpen && <Box ref={placeholderRef} />}
      <Container
        ref={containerRef}
        position={isNotLargetAndIsOpen ? 'absolute' : 'relative'}
        minH={isNotLargetAndIsOpen ? 'max-content' : 'auto'}
      >
        {isNotLargetAndIsOpen ? (
          <Flex minH={'max-content'} direction='column' gap='1'>
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
    </>
  );
};

export default Header;
