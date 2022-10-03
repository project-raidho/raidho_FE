import React, { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
import DaumPostcode from "react-daum-postcode";
import Button from "../../elements/Button";
import styled from "styled-components";

interface SearchProps {
  departLocation?: string;
  onChangeLocation: (arg: string) => void;
}

const MeetingLocationSearch = ({
  departLocation,
  onChangeLocation,
}: SearchProps) => {
  const [text, setText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setPlace(e.target.value);
    onChangeLocation(e.target.value);
  };

  const [isOpenPost, setIsOpenPost] = useState(false);
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data: {
    address: any;
    addressType: string;
    bname: string;
    buildingName: string;
  }) => {
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

    setText(fullAddr);
    setPlace(fullAddr);
    onChangeLocation(fullAddr);
    setIsOpenPost(false);
  };

  useEffect(() => {
    if (departLocation === undefined) {
      setText("");
      setPlace("");
    } else {
      setText(departLocation);
      setPlace(departLocation);
    }
  }, [departLocation]);

  return (
    <SearchWrapp>
      <h1>모집 후 모일 장소 *</h1>
      <Button
        size="small"
        variant={isOpenPost ? "gray" : "primary"}
        onClick={onChangeOpenPost}
      >
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

      <textarea
        placeholder="도로명 주소 또는 주소 키워드를 적을 수 있습니다.(25자이내)"
        onChange={onChange}
        value={text}
        maxLength={25}
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
  textarea {
    padding: 10px;
    width: 100%;
    font-size: 1.2rem;
    background-color: var(--bg-color);
    @media ${(props) => props.theme.mobile} {
      font-size: 1rem;
    }
  }

  @media ${(props) => props.theme.mobile} {
    .postmodal {
      width: 300px;
    }
  }
`;
