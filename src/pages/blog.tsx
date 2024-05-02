import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Spinner,
  Text,
  Grid,
  Icon,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePosts } from '../features/posts';
import { parseIntSafe } from '../utils/helpers/parse-int-safe';
import { Link as RouterLink } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Button from '../components/button';

const BlogPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const before = searchParams.get('before') ?? null;
  const after = searchParams.get('after') ?? null;

  const { data, error, isPending: isPostsPending } = usePosts({
    take: 4,
    after: parseIntSafe(after!),
    before: parseIntSafe(before!),
    query,
  });

  useEffect(() => {
    if (data?.posts.edges.length === 0) {
      setSearchParams(params => {
        const query = new URLSearchParams(params.toString());

        query.delete('after');
        query.delete('before');

        return query;
      });
    }
  }, [data]);

  // const isFetchingBackwards = !!(before && isFetching);
  // const isFetchingForwards = !!(after && isFetching);

  const fetchNextPage = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      setSearchParams(params => {
        const query = new URLSearchParams(params.toString());

        query.set('after', `${data.posts.pageInfo.endCursor}`);
        query.delete('before');
        query.delete('q');

        return query;
      });
    }
  };

  const fetchPreviousPage = () => {
    if (data?.posts.pageInfo.hasPreviousPage) {
      setSearchParams(params => {
        const query = new URLSearchParams(params.toString());

        query.set('before', `${data.posts.pageInfo.startCursor}`);
        query.delete('after');
        query.delete('q');

        return query;
      });
    }
  };

  if (isPostsPending) {
    return (
      <Center flex='1' width='full'>
        <Spinner />
      </Center>
    );
  }

  if(error) {
    throw error;
  }

  console.log({ data });

  return (
    <Container>
      <Grid
        templateColumns={'repeat(auto-fill, minmax(15rem, 1fr))'}
        gap='40px'
      >
        {data.posts.edges.map(post => (
          <LinkBox key={post.id} as='article'>
            <Card height='100%' variant='outline'>
              <CardHeader>
                <Text as='time' dateTime=''>
                  тут типа время 9 o clock
                </Text>
                <Heading size='md'>
                  <LinkOverlay
                    sx={{
                      _hover: {
                        textDecoration: 'underline',
                      },
                    }}
                    as={RouterLink}
                    to={`/post/${post.id}`}
                  >
                    {post.title}
                  </LinkOverlay>
                </Heading>
              </CardHeader>
              <CardBody>
                <Text height='100%' display={'flex'} alignItems='end'>
                  {post.preview}
                </Text>
              </CardBody>
            </Card>
          </LinkBox>
        ))}
      </Grid>
      {data.posts.edges.length === 0 && (
        <Center>
          <Heading>No posts :(</Heading>
        </Center>
      )}
      {data.posts.edges.length !== 0 && (
        <HStack pt={3} justify={'center'} spacing={2}>
          <Button
            variant={'ghost'}
            onClick={() => {fetchPreviousPage();}}
            hasMore={!data.posts.pageInfo.hasPreviousPage}
            leftIcon={<Icon as={HiArrowNarrowLeft} />}
            spinnerPlacement='start'
            loadingText='Предыдущая'
          >
            Предыдущая
          </Button>
          <Button
            variant='ghost'
            onClick={fetchNextPage}
            hasMore={!data.posts.pageInfo.hasNextPage}
            rightIcon={<Icon as={HiArrowNarrowRight} />}
            loadingText='Следующая'
            spinnerPlacement='end'
          >
            Следующая
          </Button>
        </HStack>
      )}
    </Container>
  );
};

export default BlogPage;
