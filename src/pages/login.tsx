import { Button, Center, Container, ToastId, useToast } from '@chakra-ui/react';
import { Formik, FormikHelpers, FormikProps, Form } from 'formik';
import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { object, ObjectSchema, string } from 'yup';
import { Persist } from '../components/persist-form';
import TextInput from '../components/text-input';
import { useGetMe, useLogin } from '../features/auth';
import { ConsoleLog } from '../utils/debug/console-log';
import { isFormRefNotNull } from '../utils/form/is-form-ref-not-null';
import { isGraphQLRequestError } from '../utils/graphql/is-graphql-request-error';

type InitialValues = {
  login: string;
  password: string;
};

type HandleSubmitProps = (
  values: InitialValues,
  formikHelpers: FormikHelpers<InitialValues>
) => void | Promise<any>;

const Login: FC = () => {
  const validationSchema: ObjectSchema<InitialValues> = object().shape({
    login: string().required('Обязательно!'),
    password: string().required('Обязательно!'),
  });

  const initialValues: InitialValues = {
    login: '',
    password: '',
  };

  const formRef = useRef<FormikProps<InitialValues>>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const toastIdRef = useRef<ToastId | null>(null);
  const { refetch } = useGetMe();
  const { mutateAsync: loginUser } = useLogin();

  const handleSubmit: HandleSubmitProps = async values => {
    if (isFormRefNotNull(formRef)) {
      try {
        await loginUser({ loginInput: values });
        formRef.current.resetForm();
        formRef.current.setStatus('submitted');
        refetch(); // refetching user

        if (toastIdRef.current) {
          toast.close(toastIdRef.current);
        }

        toastIdRef.current = toast({
          title: 'Login',
          description: 'Успешно зашли! ᕦ(ò_óˇ)ᕤ',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        navigate('/');
      } catch (error: unknown) {
        ConsoleLog({ error });
        if (isGraphQLRequestError(error) && formRef.current !== null) {
          if (toastIdRef.current) {
            toast.close(toastIdRef.current);
          }

          toastIdRef.current = toast({
            title: 'Login',
            description: `${error.response.errors[0].message}`,
            status: 'error',
            isClosable: true,
          });

          formRef.current.setStatus('error');
        }
      } finally {
        formRef.current.setSubmitting(false);
      }
    }
  };

  return (
    <Center flex="1">
      <Container maxW={'600px'} flex="1">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          innerRef={formRef}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <TextInput
                  variant='filled'
                  shouldFocus
                  name='login'
                  label='Логин'
                />
                <TextInput variant='filled' name='password' label='Пароль' />

                <Button
                  type='submit'
                  isLoading={isSubmitting}
                  mt='4'
                  spinnerPlacement='end'
                  loadingText='Проверка'
                  width={['100%', 'auto']}
                >
                  Войти
                </Button>

                <Persist name='login-form' />
              </Form>
            );
          }}
        </Formik>
      </Container>
    </Center>
  );
};

export default Login;
