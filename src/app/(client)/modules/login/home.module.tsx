import { type FC } from "react";
import { ContainerComponent } from "../../(app)/shared/ui/container";
import { PostComponent } from "../../(app)/widgets/post";

const HomeModule: FC = () => {
  return (
    <ContainerComponent className="w-full space-y-12 pb-[72px]">
      <PostComponent />
    </ContainerComponent>
  );
};

export default HomeModule;
