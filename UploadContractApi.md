## Functions

<dl>
<dt><a href="#createFormData">createFormData(postData)</a> ⇒ <code>FormData</code></dt>
<dd><p>object를 FormData type으로 변환시켜주는 함수</p>
</dd>
<dt><a href="#checkIsDupSong">checkIsDupSong(formData)</a> ⇒ <code>boolean</code> | <code>null</code></dt>
<dd><p>중복 곡을 체크하는 함수</p>
</dd>
<dt><a href="#postMetadata">postMetadata(data, title, album, image, lyrics)</a> ⇒ <code>string</code> | <code>null</code></dt>
<dd><p>메타데이터 CID1 업로드</p>
</dd>
<dt><a href="#isRightRates">isRightRates(rates)</a> ⇒ <code>boolean</code></dt>
<dd></dd>
<dt><a href="#deployAndGetAddress">deployAndGetAddress(addresses, proportions, songCid, price)</a> ⇒ <code>Object</code></dt>
<dd><p>settlementContract 배포</p>
</dd>
<dt><a href="#deDup">deDup(holders, rates)</a> ⇒ <code>object</code></dt>
<dd><p>중복 요소 제거 함수</p>
</dd>
<dt><a href="#postContractData">postContractData(data)</a></dt>
<dd><p>settlementContract주소를 포함한 폼 데이터를 백엔드에 post함.</p>
</dd>
</dl>

<a id="createFormData"></a>

## createFormData(postData) ⇒ <code>FormData</code>

object를 FormData type으로 변환시켜주는 함수

**Kind**: global function  
**Returns**: <code>FormData</code> - FormData type 반환

| Param    | Type                | Description                     |
| -------- | ------------------- | ------------------------------- |
| postData | <code>Object</code> | key-value쌍으로 이루어진 object |

<a id="checkIsDupSong"></a>

## checkIsDupSong(formData) ⇒ <code>boolean</code> \| <code>null</code>

중복 곡을 체크하는 함수

**Kind**: global function

| Param    | Type                  | Description          |
| -------- | --------------------- | -------------------- |
| formData | <code>FormData</code> | file이 담긴 FormData |

<a id="postMetadata"></a>

## postMetadata(data, title, album, image, lyrics) ⇒ <code>string</code> \| <code>null</code>

메타데이터 CID1 업로드

**Kind**: global function

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| data   | <code>Object</code> |             |
| title  | <code>string</code> | description |
| album  | <code>string</code> | description |
| image  | <code>Buffer</code> | description |
| lyrics | <code>string</code> | description |
| ...    | <code>\*</code>     | ...         |

<a id="isRightRates"></a>

## isRightRates(rates) ⇒ <code>boolean</code>

**Kind**: global function  
**Returns**: <code>boolean</code> - 저작권 비율이 모두 양수이고, 그 총합이 1이면 true 반환

| Param | Type               | Description                         |
| ----- | ------------------ | ----------------------------------- |
| rates | <code>array</code> | 저작권 비율. 소수 number로 이루어짐 |

<a id="deployAndGetAddress"></a>

## deployAndGetAddress(addresses, proportions, songCid, price) ⇒ <code>Object</code>

settlementContract 배포

**Kind**: global function  
**Returns**: <code>Object</code> - settlementContract 객체 반환

| Param       | Type                                       | Default                            | Description                 |
| ----------- | ------------------------------------------ | ---------------------------------- | --------------------------- |
| addresses   | <code>Array</code>                         |                                    | 저작권자들 각각의 지갑주소  |
| proportions | <code>Array</code>                         |                                    | 저작권자들 각각의 정산 비율 |
| songCid     | <code>string</code>                        |                                    | CID1(곡 메타데이터 CID)     |
| price       | <code>string</code> \| <code>number</code> | <code>&quot;900000000&quot;</code> | 곡의 가격                   |

<a id="deDup"></a>

## deDup(holders, rates) ⇒ <code>object</code>

중복 요소 제거 함수

**Kind**: global function  
**Returns**: <code>object</code> - 중복없는 object 반환

| Param   | Type                | Description |
| ------- | ------------------- | ----------- |
| holders | <code>string</code> | 저작권자    |
| rates   | <code>string</code> | 저작권 비율 |

<a id="postContractData"></a>

## postContractData(data)

settlementContract주소를 포함한 폼 데이터를 백엔드에 post함.

**Kind**: global function

| Param           | Type                | Description                                        |
| --------------- | ------------------- | -------------------------------------------------- |
| data            | <code>Object</code> | description                                        |
| data.file       | <code>Buffer</code> | 음원파일                                           |
| data.title      | <code>string</code> | 노래 제목                                          |
| data.holder     | <code>Array</code>  | 저작권자 리스트                                    |
| data.rate       | <code>Array</code>  | 저작권자 비율                                      |
| data.cid1       | <code>number</code> | CID1(음원 메타데이터 정보; 가수, 가사 앨범아트 등) |
| data.settleAddr | <code>string</code> | 정산컨트랙트 주소                                  |
| ...             | <code>\*</code>     | ...                                                |
