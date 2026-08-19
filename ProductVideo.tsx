import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";

export type ProductVideoProps = {
  productNo: string;
  productName: string;
  hook: string;
  imageUrl: string;
};

/**
 * OSTAR 브랜드 규칙 반영:
 * - 줌은 등속(linear) 금지 → ease-in-out 속도곡선 (AI 티 제거)
 * - 제품번호(OS-xx) + 제품명 자막 항상 표기
 * - 첫 구간 훅 문구(숫자/결과/반전) 노출
 */
export const ProductVideo: React.FC<ProductVideoProps> = ({
  productNo,
  productName,
  hook,
  imageUrl,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // ease-in-out 광학 줌인 (1.0 → 1.15)
  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.15], {
    easing: Easing.inOut(Easing.ease),
    extrapolateRight: "clamp",
  });

  // 훅 문구: 0~2.5초 노출 후 페이드아웃
  const hookOpacity = interpolate(
    frame,
    [0, 10, fps * 2, fps * 2.5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // 제품 카드: 스프링으로 부드럽게 등장 (2초 지점)
  const cardIn = spring({
    frame: frame - fps * 2,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Img
          src={imageUrl}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* 하단 그라데이션 (가독성) */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 45%)",
        }}
      />

      {/* 훅 문구 */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 160,
          opacity: hookOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            textAlign: "center",
            lineHeight: 1.2,
            padding: "0 60px",
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}
        >
          {hook}
        </div>
      </AbsoluteFill>

      {/* 제품번호 + 제품명 카드 (항상 표기) */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: 80,
          transform: `translateY(${interpolate(cardIn, [0, 1], [40, 0])}px)`,
          opacity: cardIn,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            background: "rgba(255,255,255,0.95)",
            borderRadius: 20,
            padding: "24px 36px",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: "#e11d48" }}>
            {productNo}
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, color: "#111" }}>
            {productName}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
