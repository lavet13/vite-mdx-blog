import { Fragment, useEffect, useRef } from 'react';
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
  useToast,
  ToastId,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useGetMe, useLogout } from '../../features/auth';
import queryClient from '../../react-query/query-client';
import { isGraphQLRequestError } from '../../utils/graphql/is-graphql-request-error';

const Header: FC = () => {
  const toast = useToast();
  const toastIdRef = useRef<ToastId | null>(null);
  const {
    data: getMeResult,
    error,
    isError,
    isPending,
    isRefetching,
  } = useGetMe({ retry: false });
  console.log({ getMeResult, isRefetching, error, isError });

  const {
    mutate: logout,
    error: logoutError,
    isError: logoutIsError,
  } = useLogout({
    onSuccess: () => {
      queryClient.setQueryData(['Me'], null);

      if (toastIdRef.current) {
        toast.close(toastIdRef.current);
      }
      toast({
        title: 'Logout',
        description: 'Успешно вышли из аккаунта! ᕦ(ò_óˇ)ᕤ',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: error => {
      if (isGraphQLRequestError(error)) {
        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
        }

        toastIdRef.current = toast({
          title: 'Logout',
          description: `${error.response.errors[0].message}`,
          status: 'error',
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    console.log('effect fired!');
    if (isError) {
      if (isGraphQLRequestError(error)) {
        toast({
          title: 'Account',
          description: error.response.errors[0].message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      } else if (error instanceof Error) {
        toast({
          title: 'Account',
          description: `${error.message} (╯‵□′)╯︵┻━┻`,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }

    if (logoutIsError) {
      if (isGraphQLRequestError(logoutError)) {
        toast({
          title: 'Logout',
          description: logoutError.response.errors[0].message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else if (logoutError instanceof Error) {
        toast({
          title: 'Logout',
          description: `${logoutError.message} (╯‵□′)╯︵┻━┻`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }
    }
  }, [isError, logoutIsError, logoutError, error]);

  const theme = useTheme();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThanMd] = useMediaQuery(
    `(min-width: ${theme.breakpoints.md})`,
    { ssr: true, fallback: false }
  );

  useEffect(() => {
    const body = document.body;
    if (isNotLargeAndIsOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }

    // Clean up the effect when the component unmounts
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isOpen, isLargerThanMd]);

  const isNotLargeAndIsOpen = !isLargerThanMd && isOpen;

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
    !getMeResult?.me ? (
      <Button
        isLoading={isPending || isRefetching}
        isDisabled={isPending || isRefetching}
        onClick={() => {
          navigate('/login');
          onClose();
        }}
        variant='solid'
        size={['md']}
      >
        Войти
      </Button>
    ) : (
      <Button
        isLoading={isPending || isRefetching}
        isDisabled={isPending || isRefetching}
        onClick={() => {
          logout();
          navigate('/');
          onClose();
        }}
        variant='solid'
        size={['md']}
      >
        Выйти
      </Button>
    ),
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
    <Container mb='5' minH={isNotLargeAndIsOpen ? '100vh' : 'auto'}>
      {isNotLargeAndIsOpen ? (
        <Flex direction='column' gap='4'>
          {content}
          <SimpleGrid
            alignItems={'center'}
            spacing={'20px'}
            minChildWidth={'200px'}
          >
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
