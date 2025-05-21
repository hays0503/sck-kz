'use client';
import { Layout } from 'antd';
import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface ILayoutMainProps {
  readonly headerContent: React.ReactNode;
  readonly content: React.ReactNode;
  readonly footerContent: React.ReactNode;
}

const { Header, Footer, Content } = Layout;

const LayoutMain: React.FC<ILayoutMainProps> = ({
  headerContent,
  content,
  footerContent,
}) => {
  console.count('render LayoutMain');
  const refHeader = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refFooter = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('100dvh');
  const [, setContentHeightLocal] = useLocalStorage<string | undefined>(
    'ContentHeight',
    undefined,
  );

  // useDisableRubberBandScroll();

  useLayoutEffect(() => {
    if (refHeader.current && refFooter.current && refContent.current) {
      const headerHeight = refHeader.current.offsetHeight || 0;
      const footerHeight = refFooter.current.offsetHeight || 0;
      setContentHeight(`calc(100dvh - ${headerHeight + footerHeight}px)`);
      setContentHeightLocal(`calc(100dvh - ${headerHeight + footerHeight}px)`);
    }
  }, [setContentHeightLocal]);

  const layoutStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    height: '100dvh',
    width: '100dvw',
    touchAction: 'none',
    scrollBehavior: 'smooth',
    overscrollBehavior: 'none',
  };

  const headerStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    padding: '0px',
    backgroundColor: '#f5f5f5',
  };

  const contentStyle: CSSProperties = {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: contentHeight,
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const footerStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    minHeight: '73px',
    backgroundColor: '#fff',
    padding: '0px',
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle} ref={refHeader}>
        {headerContent}
      </Header>
      <Content style={contentStyle} className='scrollable' ref={refContent}>
        <div
          id='contentOverlay'
          style={{
            height: '0',
            visibility: 'hidden',
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
        {content}
      </Content>
      <Footer style={footerStyle} ref={refFooter}>
        {footerContent}
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
