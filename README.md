# ostar-remotion

OSTAR AI 영상 자동화 — Remotion 프로젝트.
리액트 코드로 숏폼(9:16)을 만들고, 상품 데이터만 바꿔 대량 렌더할 수 있습니다.

## 브랜드 규칙 (코드에 반영됨)
- 줌은 **ease-in-out** 속도곡선 (등속 줌 = AI 티, 금지)
- **제품번호(OS-xx) + 제품명** 자막 항상 표기
- 첫 구간 **훅 문구**(숫자/결과/반전) 노출

## Claude Code에서 시작하기
```bash
git clone https://github.com/dsmsa1747-sketch/ostar-remotion.git
cd ostar-remotion
npm install
npm run dev        # Remotion Studio 열림 (미리보기·편집)
```

## 렌더 (mp4 뽑기)
```bash
npm run render     # out/video.mp4 생성
```

## 상품만 바꿔 다른 영상 만들기
`Root.tsx` 의 defaultProps 를 수정하거나, 렌더 시 props 전달:
```bash
npx remotion render index.ts ProductVideo out/OS-02.mp4 \
  --props='{"productNo":"OS-02","productName":"핸드크림","hook":"9,900원 실화?","imageUrl":"https://.../img.jpg"}'
```

## 파일
- `index.ts` — 엔트리 (registerRoot)
- `Root.tsx` — 컴포지션 등록 (해상도·길이·기본 props)
- `ProductVideo.tsx` — 실제 영상 (줌·훅·제품카드)
- `remotion.config.ts` — 렌더 설정
