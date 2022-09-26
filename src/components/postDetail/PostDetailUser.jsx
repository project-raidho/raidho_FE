import styled from "styled-components";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";

const PostDetailUser = ({ postDetail }) => {
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
        <div>
          {postDetail.createdAt.substr(0, 4)}년{" "}
          {postDetail.createdAt.substr(5, 2)}월{" "}
          {postDetail.createdAt.substr(8, 2)}일 게시
        </div>
      </StProfileRightBox>
    </StUserWrapper>
  );
};

export default PostDetailUser;

const StUserWrapper = styled.div`
  display: flex;
  margin: 10px 0;

  .profileBox {
    width: 60px;
    height: 60px;
    border-radius: 70%;
    overflow: hidden;
  }
  .profileImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const StProfileRightBox = styled.div`
  display: grid;
  margin-left: 20px;
  grid-row-gap: 3px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 6px;
  }
`;
