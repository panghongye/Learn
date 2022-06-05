import React from 'react';
import { Card, Button } from '@arco-design/web-react';
import { IconSave, IconArrowLeft } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import history from '../../history';
import { useSelector } from 'react-redux';
import { ReducerState } from '../../redux';

const Save = (props) => {
    const { showBack, onBack, onPublish } = props;
    const goBack = () => {
        history.goBack();
    };
    const { collapsed, settings } = useSelector((state: ReducerState) => state.global);

    const width = collapsed ? `calc(100% - 48px)` : `calc(100% - ${settings.menuWidth}px)`;
    return (
        <Card bordered={false} className={styles.card} style={{ width }}>
            <div className={styles.box}>
                {/* <Link icon={<IconClockCircle />}>{message}</Link> */}
                {showBack && (
                    <Button
                        onClick={onBack || goBack}
                        className={styles.btn}
                        type="outline"
                        icon={<IconArrowLeft />}
                    >
                        返回
                    </Button>
                )}
                {/* {onRefresh && (
          <Button onClick={onRefresh} className={styles.btn} type="outline" icon={<IconRefresh />}>
            刷新
          </Button>
        )}
        {onSave && (
          <Button onClick={onSave} className={styles.btn} type="primary" icon={<IconSave />}>
            保存
          </Button>
        )} */}
                {onPublish && (
                    <Button onClick={onPublish} className={styles.btn} type="primary" icon={<IconSave />}>
                        发布
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default Save;
