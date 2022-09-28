import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import DaumPostcode from "react-daum-postcode";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import styled from "styled-components";

const MeetingLocationSearch = ({ departLocation, setDepartLocation }) => {
  const [InputText, setInputText] = useState(departLocation);
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
    setPlace(InputText);
  };

  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setInputText(fullAddr);
    setPlace(fullAddr);
    setDepartLocation(fullAddr);
    setIsOpenPost(false);
  };

  useEffect(() => {
    setInputText(departLocation);
    setPlace(departLocation);
  }, [departLocation]);

  return (
    <SearchWrapp>
      <h1>모집 후 모일 장소</h1>
      <Button size="small" onClick={onChangeOpenPost}>
        {isOpenPost ? "검색창 닫기" : "주소검색"}
      </Button>
      {isOpenPost && (
        <div>
          <DaumPostcode
            className="postmodal"
            autoClose
            onComplete={onCompletePost}
          />
        </div>
      )}

      <KakaoMap searchPlace={Place} />

      <SearchInput
        variant="default"
        size="large"
        placeholder="도로명주소가 입력되는 창입니다."
        onChange={onChange}
        value={InputText}
      />
    </SearchWrapp>
  );
};

export default MeetingLocationSearch;

const SearchWrapp = styled.div`
  .postmodal {
    margin: 10px auto;
    display: block;
    position: relative;
    top: 0;
    width: 600px;
    height: 400px;
    padding: 7px;
  }

  @media ${(props) => props.theme.mobile} {
    .postmodal {
      width: 300px;
    }
  }
`;

const SearchInput = styled(Input)`
  display: block;
  width: 100%;
  margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    font-size: 1.2rem;
  }
`;
