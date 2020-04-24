/**
 * 点赞
 */

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { LikeTwoTone } from '@ant-design/icons';
import styles from './index.less';
import { useSetState } from '@/hooks';
import { fetchLikeCount } from '@/reducers/subReducers/like';
import { RootState } from '@/reducers';
import { setLike } from '@/api';

const GiveaLike: React.FC = () => {
  const dispatch = useDispatch();

  const count = useSelector((state: RootState) => state.like.count);

  const [state, setState] = useSetState({
    isClick: false,
    btnText: '点赞',
  });

  console.log('count >>>> ', count);

  /**
   * 为我点赞
   */
  const handleClick = async (count: number) => {
    try {
      setState({
        isClick: true,
      });
      await setLike();

      // 获取点赞数
      await dispatch(fetchLikeCount());
      setState({
        btnText: count as any,
      });
    } catch (error) {
      setState({
        isClick: false,
      });
    }
  };

  return (
    <Button
      shape="round"
      className={styles.likeBtn}
      onClick={() => handleClick(count)}
      disabled={state.isClick}
    >
      <LikeTwoTone twoToneColor={state.isClick ? '#52c41a' : ''} />
      {state.btnText}
    </Button>
  );
};

export default GiveaLike;
