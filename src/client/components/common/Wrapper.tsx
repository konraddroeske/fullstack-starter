import React, { ReactNode, FunctionComponent } from 'react';

interface OwnProps {
  children: ReactNode;
}

type Props = OwnProps;

const Wrapper: FunctionComponent<Props> = ({ children }) => {
  return <div className="py-12 w-11/12 mx-auto">{children}</div>;
};

export default Wrapper;
