import styled from "styled-components";
import DefaultMemberImage from "../../assets/defaultProfileImage.svg";
import { useNavigate } from "react-router-dom";

const PostDetailUser = ({ postDetail }) => {
  const navigate = useNavigate();
  const memberImage =
    postDetail.memberImage === null
      ? `${DefaultMemberImage}`
      : `${postDetail.memberImage}`;

  const onClickTagHandler = (tag) => {
    const sliceTag = tag.substr(1);
    console.log(sliceTag);
    navigate(`/post/best?tag=${sliceTag}`, {
      state: {
        tagKeyword: sliceTag,
      },
    });
  };
  return (
    <StUserWrapper>
      <div className="profileBox">
        <img className="profileImg" src={memberImage} alt="프로필이미지" />
      </div>
      <StProfileRightBox>
        <h2>{postDetail.memberName}</h2>
        <div>{postDetail.createdAt} 게시</div>
        <div className="tagList">
          {postDetail.tags.map((tag, i) => (
            <div key={i} className="tag" onClick={() => onClickTagHandler(tag)}>
              {tag}
            </div>
          ))}
        </div>
      </StProfileRightBox>
    </StUserWrapper>
  );
};

export default PostDetailUser;

const StUserWrapper = styled.div`
  display: flex;
  margin-top: 10px;
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
  .tagList {
    display: flex;
    gap: 10px;
  }
  .tag {
    color: var(--main-color);
    cursor: pointer;
  }
`;

const StProfileRightBox = styled.div`
  display: grid;
  margin-left: 20px;
  grid-row-gap: 10px;
`;
