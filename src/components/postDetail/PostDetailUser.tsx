import React from "react";
import styled from "styled-components";

import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

interface PostDetailProps {
  postDetail: {
    memberImage: string;
    memberName: string;
  };
}

const PostDetailUser = ({ postDetail }: PostDetailProps) => {
  const memberImage =
    postDetail.memberImage === null
      ? `${DefaultMemberImage}`
      : `${postDetail.memberImage}`;

  return (
    <StUserWrapper>
      <div className="profileBox">
        <img className="profileImg" src={memberImage} alt="프로필이미지" />
      </div>
      <StProfileRightBox>
        <h2>{postDetail.memberName}</h2>
      </StProfileRightBox>
    </StUserWrapper>
  );
};

export default PostDetailUser;

const StUserWrapper = styled.div`
  display: flex;
  margin: 10px 0 20px;

  .profileBox {
    width: 40px;
    height: 40px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media ${(props) => props.theme.mobile} {
    margin-left: 10px;
  }
`;

const StProfileRightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 15px;
  vertical-align: middle;
  h2 {
    font-size: 1.2rem;
    margin-bottom: 0px;
  }
`;
