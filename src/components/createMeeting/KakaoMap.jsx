import React, { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

const KakaoMap = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(searchPlace, function (result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        // var marker =
        new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // // 인포윈도우로 장소에 대한 설명을 표시합니다
        // var infowindow = new kakao.maps.InfoWindow({

        // });
        // infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
    });
    //키워드 검색
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchPlace, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        displayMarker(data[0]);
        bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

        map.setBounds(bounds);
      }
    }
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [searchPlace]);

  return <StKakaoMapWrapp id="myMap"></StKakaoMapWrapp>;
};

export default KakaoMap;

const StKakaoMapWrapp = styled.div`
  margin: 20px auto;
  width: 500px;
  height: 500px;

  @media ${(props) => props.theme.mobile} {
    width: 300px;
    height: 300px;
  }
`;
