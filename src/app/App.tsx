/**
 * 业务容器根组件
 */

import React from 'react';
import { Layout } from 'antd';
import Siderbar from '@/components/Siderbar';
import MyContent from '@/components/MyContent';
import MyHeader from '@/components/MyHeader';
import styles from './index.less';

const { Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout className={styles.container}>
      {/* 侧边导航 */}
      <Siderbar />

      <Layout>
        {/* 头部 */}
        <MyHeader className={styles.header} />

        {/* 主要区域内容 */}
        <MyContent className={styles.content} />

        {/* 底部备案号 */}
        <Footer className={styles.footer}>网站备案号：粤ICP备19146867号</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
