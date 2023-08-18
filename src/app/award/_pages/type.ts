import { ChangeEvent } from 'react';

export type PageProps = {
  onNext: () => void;
};

export type PageComponent = React.FC<PageProps>;
