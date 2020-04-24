/**
 * 头部
 */

import React from 'react';
import { Layout } from 'antd';
import GiveaLike from '@/components/GiveaLike';

const { Header } = Layout;

interface MyHeader {
  className: string;
}

const MyHeader: React.FC<MyHeader> = ({ className }) => {
  return (
    <Header className={className}>
      <GiveaLike />
    </Header>
  );
};

export default MyHeader;
