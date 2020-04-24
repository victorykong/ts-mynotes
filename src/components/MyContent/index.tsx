/**
 * Router in
 */
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface MyContent {
  className: string;
}

const MyContent: React.FC<MyContent> = ({ className }) => {
  return <Content className={className}>内容</Content>;
};

export default MyContent;
