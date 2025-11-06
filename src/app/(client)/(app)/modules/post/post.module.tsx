import { Suspense, type FC } from "react";
import { ContainerComponent } from "../../shared/ui/container";
import { PostIdComponent } from "../../widgets/post-id";
import { Skeleton } from "../../shared/ui/skeleton";

interface PostModuleProps {
  id: string;
}

const PostIdModule: FC<PostModuleProps> = ({ id }) => {
  return (
    <ContainerComponent className="w-full space-y-12 pb-[72px]">
      <Suspense
        fallback={
          <>
            <Skeleton />
          </>
        }
      >
        <PostIdComponent id={id} />
      </Suspense>
    </ContainerComponent>
  );
};

export default PostIdModule;
