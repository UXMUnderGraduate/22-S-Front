// import {
//   Box,
//   CircularProgress,
//   Typography,
//   Button,
//   Card,
//   Select,
//   MenuItem,
//   FormHelperText,
//   TextField,
// } from "@mui/material";
import axios from 'axios';
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// contract api 불러오기
import { init, deployContract } from '../services/contract';

//유틸들

/**
 * object를 FormData type으로 변환시켜주는 함수
 * @param {Object} postData key-value쌍으로 이루어진 object
 * @return {FormData} FormData type 반환
 */
const createFormData = (postData) => {
  Object.keys(postData).reduce((formData, key) => {
    formData.append(key, postData[key]);
    return formData;
  }, new FormData());
};

// ------------------------------------------------------

//중복곡 체크
/**
 * 중복 곡을 체크하는 함수
 * @async
 * @param {FormData} formData file이 담긴 FormData
 * @returns {(boolean | null)}
 */
const checkIsDupSong = async (formData) => {
  axios({
    method: 'post',
    headers: {
      authorization: token,
    },
    url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/check`,
    data: formData,
  })
    .then((res) => {
      if (res.data === null) {
        console.error(res.messege); //"중복 곡 체크 실패"
        return null;
      }
      if (res.data.isDuplicated) {
        console.log('중복된 곡입니다.');
        return true;
      }
      return false;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

/**
 * 메타데이터 CID1 업로드
 * @async
 * @param {Object} data
 * @param {string} title - description
 * @param {string} album - description
 * @param {Buffer} image - description
 * @param {string} lyrics - description
 * @param {*} ... - ...
 * @returns {(string | null)}
 */
const postMetadata = async (data) => {
  // jwtToken에서 현재 계정의 아티스트명과 아티스트 ID 획득
  const { name: artist, id: artistId } = jwtDecode(token);
  const { title, album, image, lyrics } = data;
  // backEnd에 post할 데이터 정의 (backEnd에서 이렇게 정의됨.)
  const postData = {
    title,
    artist,
    artistId,
    album,
    genre,
    lyrics,
    image,
    composerId: holder[1],
    songWriterId: holder[2],
  };
  // 메타데이터 업로드
  await axios({
    method: 'post',
    url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload/meta`,
    headers: { authorization: token },
    data: createFormData(postData),
  })
    .then((res) => {
      return res.data.data.cid1;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

// 저작권 비율 체크
/**
 * @param {array} rates 저작권 비율. 소수 number로 이루어짐
 * @return {boolean} 저작권 비율이 모두 양수이고, 그 총합이 1이면 true 반환
 */
const isRightRates = (rates) => {
  rates.reduce((accumulator, currentNumber) => accumulator * 1 + currentNumber * 1, 0);
  if (!rates.every((rate) => rate > 0 && rate < 1)) {
    console.warn('저작권 비율은 0보다 크고 1보다 작아야 합니다!');
    return false;
  } else if (sum != 1) {
    console.warn('저작권 총합이 1이 되도록 설정해주세요!');
    return false;
  }
  return true;
};

// 컨트랙트 업로드(배포)
/**
 * @desc settlementContract 배포
 * @param {Array} addresses 저작권자들 각각의 지갑주소
 * @param {Array} proportions 저작권자들 각각의 정산 비율
 * @param {string} songCid CID1(곡 메타데이터 CID)
 * @param {(string | number)} price 곡의 가격
 * @return {Object} settlementContract 객체 반환
 */
const deployAndGetAddress = (addresses, proportions, songCid, price = '900000000') => {
  init();
  const deployedContract = deployContract(
    addresses,
    proportions, // 비율의 총합이 10000이 되어야 함.
    songCid,
    price,
  );
  return deployedContract.options.address;
};

// 중복 계정 제거
/**
 * @desc 중복 요소 제거 함수
 * @param {string} holders 저작권자
 * @param {string} rates 저작권 비율
 * @return {object} 중복없는 object 반환
 */
const deDup = (holders, rates) => {
  const parsedHolder = JSON.parse(holders);
  const parsedRate = JSON.parse(rates);
  const uniques = {}; // 중복 없는 object
  parsedHolder.forEach((holder, index) => {
    uniques[holder] =
      (typeof uniques[holder] === 'undefined' ? 0 : Number(uniques[holder])) + Number(parsedRate[index]);
  });
  return {
    holder: JSON.stringify(Object.keys(uniques).map(Number)),
    rate: JSON.stringify(Object.values(uniques).map(String)),
  };
};

// 컨트랙트 주소 포함한 data post

/**
 * settlementContract주소를 포함한 폼 데이터를 백엔드에 post함.
 * @async
 * @param {Object} data - description
 * @param {Buffer} data.file - 음원파일
 * @param {string} data.title - 노래 제목
 * @param {Array} data.holder - 저작권자 리스트
 * @param {Array} data.rate - 저작권자 비율
 * @param {number} data.cid1 - CID1(음원 메타데이터 정보; 가수, 가사 앨범아트 등)
 * @param {string} data.settleAddr - 정산컨트랙트 주소
 * @param {*} ... ...
 */
const postContractData = async (data) => {
  const { name: artist } = await jwtDecode(token);
  const { title, file, holder, rate, cid1, settleAddr } = data;
  const postData = {
    file,
    title,
    artist,
    genre,
    holder,
    rate,
    cid1,
    settleAddr,
  };
  // TODO 여기에 중복제거 코드 삽입
  // ex)
  // postData.holder, postData.rate = dedup(postData.holder, postData.rate);
  //...

  // post
  await axios({
    method: 'post',
    url: `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/upload`,
    headers: {
      authorization: token,
    },
    data: createFormData(postData),
  })
    .then((res) => {
      console.log('성공:\n', res);
      alert('곡이 성공적으로 업로드되었습니다!');
      location.reload('');
    })
    .catch((err) => {
      alert('업로드에 실패하였습니다. 다시한번 확인해 주세요.');
      console.error(err);
    });
};
