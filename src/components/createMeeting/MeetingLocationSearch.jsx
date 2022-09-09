import React, { useState } from 'react'
import KakaoMap from './KakaoMap'
import DaumPostcode from 'react-daum-postcode';
import Input from '../../elements/Input';
import Button from '../../elements/Button';



const MeetingLocationSearch=()=> {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

  const onChange = (e) => {
    setInputText(e.target.value);
    setPlace(InputText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(addressDetail)
  }


  // const [address, setAddress] = useState(''); // 주소
  const [addressDetail, setAddressDetail] = useState(''); // 상세주소


  const [isOpenPost, setIsOpenPost] = useState(false);

 

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    // setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setInputText(fullAddr)
    setPlace(fullAddr)
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '600px',
    height: '400px',
    padding: '7px',
  };




  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <Input variant="default" size="medium" placeholder="주소를 입력하세요"  onChange={onChange} value={InputText} />
        <Button onClick={onChangeOpenPost}>{isOpenPost? "검색창 닫기":"주소검색"}</Button>
        {isOpenPost &&
        <div><DaumPostcode  style={postCodeStyle} autoClose onComplete={onCompletePost } /></div> 
      }

      </form>
      <KakaoMap searchPlace={Place} />
    </>
  )
}

export default MeetingLocationSearch