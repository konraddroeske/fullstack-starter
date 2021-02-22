import React, { ReactNode, FunctionComponent } from 'react';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const Wrapper: FunctionComponent<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Wrapper;
