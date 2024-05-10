import { FC } from 'react';
import { useParams } from 'react-router-dom';

type PostByIdRouteParams = {
  postId: string;
};

const PostById: FC = () => {
  const { postId } = useParams<PostByIdRouteParams>() as PostByIdRouteParams;
  return <h1>PostId: {postId}</h1>;
};

export default PostById;
