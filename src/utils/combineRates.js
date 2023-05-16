/**
 * @param {object} user1 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
 * @param {object} user2 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
 * @param {object} user3 하위 컴포넌트에서 넘어온 user에 대한 값(id, rate, address...)
 * id를 기준으로 중복제거 후 rate 합산하고 id=copyrighterId, rate, address를 반환하는 함수
 */
export const combineRates = (user1, user2, user3) => {
  console.log('중복제거 실행', user1, user2, user3);
  const idMap = {};
  [user1, user2, user3].forEach((obj) => {
    const { address, id } = obj;
    let { rate } = obj;
    rate = parseFloat(rate);
    if (!idMap[id]) {
      idMap[id] = { rate, address };
    } else {
      idMap[id].rate += rate;
      idMap[id].address = address; // 가장 마지막에 나온 address을 저장
    }
  });

  // 결과 배열 생성
  const result = [];
  for (const id in idMap) {
    const { address, rate } = idMap[id];
    result.push({ id, rate, address });
  }

  return result;
};
