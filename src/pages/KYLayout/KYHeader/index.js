import React, { useState, useRef } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Button, theme, Tabs,Pagination  } from 'antd';

import { setCollapsed, selectHeader } from '@/redux/reducers/headerReducer'

const { Header } = Layout;

const initialItems = [
  {
    label: 'Tab 1',
    key: '1',
  },
  {
    label: 'Tab 2',
    key: '2',
  },
  {
    label: 'Tab 3',
    key: '3',
    closable: false,
  },
];

export default function KYHeader() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const headerReducer = useSelector(selectHeader);
  const dispatch = useDispatch();
  const collapsed = headerReducer.collapsed;

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const onChange = (newActiveKey) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: 'New Tab',
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setCollapsed())}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <div   
      style={{
          backgroundColor: 'white',
          width: '100%',
          height:'140px'
        }}>
      <Tabs
        hideAdd
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        style={{
          margin: '0 0 0 16px',
        }}
      />

      </div>
    
    </Header>
  )
}
