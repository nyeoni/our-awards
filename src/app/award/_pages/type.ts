import { ChangeEvent } from "react";

export type PageProps = {
  onNext: () => void;
  onValueChange: (e: ChangeEvent) => void;
};

export type PageComponent = React.FC<PageProps>;
