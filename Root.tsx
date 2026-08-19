import { Composition } from "remotion";
import { ProductVideo } from "./ProductVideo";

// 세로 숏폼(9:16) 기준. 필요시 width/height/durationInFrames 조정.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductVideo"
        component={ProductVideo}
        durationInFrames={180} // 6초 @ 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          productNo: "OS-01",
          productName: "상품 이름",
          hook: "59,800원. 이 가격에 이게 나온다고?",
          imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1080",
        }}
      />
    </>
  );
};
