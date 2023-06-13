import { type NextPage } from "next";

import { api } from "~/utils/api";

const Login: NextPage = () => {
  const comments = api.comment.getAll.useQuery();

  return (
    <ul>
      {comments.data?.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default Login;
