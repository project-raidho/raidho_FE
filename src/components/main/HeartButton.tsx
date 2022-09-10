import React from 'react';
import styled from 'styled-components';
import HeartImg from '../../assets/heart.png';
import EmptyHeartImg from '../../assets/emptyheart.png';

type HeartProps = {
  like: boolean;
  onClick: React.MouseEventHandler<HTMLImageElement>;
};
function HeartButton({ like, onClick }: HeartProps) {
  return <Heart src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />;
}

export default HeartButton;

const Heart = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;
