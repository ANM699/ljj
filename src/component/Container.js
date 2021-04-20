import React from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';

export default function Container({ children }) {
  return (
    <WingBlank>
      <WhiteSpace />
      {children}
    </WingBlank>
  );
}
