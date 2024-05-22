import { AiOutlineLike } from "react-icons/ai";
import { useState } from "react";

interface Props {
  onClick: () => void;
}

const Like = ({ onClick }: Props) => {
  const [like, setLike] = useState(false);

  const toggle = () => {
    setLike(!like);
    onClick();
  };

  if (like)
    return (
      <div>
        <AiOutlineLike color="#ff6b81" size={20} onClick={toggle} />
      </div>
    );

  return <AiOutlineLike size={20} onClick={toggle} />;
};

export default Like;
