**목차**

# Table of Contents

1. [기본 설명 및 부족한점](#retrospect)
2. [폴더 구조](#structure)
3. [프로젝트 모듈구조](#pro-struc)

---

## 기본 설명 및 부족한점 <a name="retrospect"></a>

- 테스트 미흡.
- 타이머가 실시간으로 시간이 차감되어야 하는데 작업하지 못함.
- 타이머 카운드를 하기위해서 관찰자를 하나두어서 엘리먼트의 text를 바꾸려고 하였습니다.
- 현재구조상 이벤트(추가,수정,삭제)를 발생 -> 전체를 새로 그리게 됨. 카운트 감소의 기능을 고민
- 타이머는 추가를 하거나 감소를 할때 시간이 변경 되어야 하는 문제는 액션이 일어나면 발생한 타이머가 있는지 확인후 타이머가 있으면 타이머를 클리어후 추가할 시간을 받아 새로운 타이머를 실행하는 기능으로 개발 하였습니다.

---

## 폴더구조 <a name="structure"></a>

```
./src
+-- js
|   +-- common  : 공통 상수, 유틸함수 관련 폴더
|   +-- scripts : MODEL, VIEW, CONTROLLER 파일
|   +-- timer   : 타이머 관련 파일
|
|   +-- main.js : 스크립트 실행
|
+-- index.html  : 기본 화면 ui
```

---

## 프로젝트 모듈구조 <a name="pro-struc"></a>

![pro-struc](./module-struc.png)

- CONTROLLER : 모델과 뷰를 묶어서 모델과 뷰의 상태를 관리합니다.
- MODEL : **타이머 데이터**의 추가, 업데이트, 삭제기능을 담당합니다.
- VIEW : CONTROLLER에서 전달받은 **타이머 데이터**로 Element 들을 생성합니다. 이벤트들을 연결하여 핸들러에 전달합니다.

---
