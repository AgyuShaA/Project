"use client";

import { type FC } from "react";

import { useRouter } from "next/navigation";
import { Button } from "../shared/ui/button";

interface IProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const NotFoundComponent: FC<Readonly<IProps>> = (props) => {
  const { title } = props;

  const router = useRouter();

  return (
    <div className="grid h-fit w-fit place-items-center items-center gap-4">
      <h1>{title || "404 - Page Not Found"}</h1>

      <Button
        variant="default"
        className="w-fit"
        color="primary"
        onClick={() => router.back()}
      >
        Go back
      </Button>
    </div>
  );
};

export default NotFoundComponent;
