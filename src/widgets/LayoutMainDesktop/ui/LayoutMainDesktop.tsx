'use client';
import { SocialButtonFloat } from '@/features/social-buttons';
import { Layout } from 'antd';
import React, { CSSProperties, useLayoutEffect, useRef, useState } from 'react';

interface ILayoutMainProps {
  readonly headerContent: React.ReactNode;
  readonly content: React.ReactNode;
  readonly footerContent: React.ReactNode;
}

const { Header, Footer, Content } = Layout;

const LayoutMainDesktop: React.FC<ILayoutMainProps> = ({
  headerContent,
  content,
  footerContent,
}) => {
  const refHeader = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('100dvh');

  // useDisableRubberBandScroll();

  useLayoutEffect(() => {
    if (refHeader.current && refContent.current) {
      const headerHeight = refHeader.current.offsetHeight || 0;
      setContentHeight(`calc(100dvh - ${headerHeight}px)`);
    }
  }, []);

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
    gap: 5,
    '--sck-columns-on-page': 4,
  } as CSSProperties;

  const headerStyle: CSSProperties = {
    width: '90%',
    height: 'auto',
    padding: '0px',
    backgroundColor: '#f5f5f5',
  };

  const contentStyle: CSSProperties = {
    width: '90%',
    height: contentHeight,
    scrollBehavior: 'smooth',
    scrollbarGutter: 'stable',
    scrollbarWidth: 'none',
    overflowY: 'auto',
    overflowX: 'clip',
    backgroundColor: '#f5f5f5',
  };

  const footerStyle: CSSProperties = {
    width: '100%',
    // height: "auto",
    backgroundColor: '#f5f5f5',
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
            width: '100%',
            height: '0',
            visibility: 'hidden',
            pointerEvents: 'none',
            opacity: 0,
          }}
        />
        {content}
        <SocialButtonFloat />
        <Footer style={footerStyle}>{footerContent}</Footer>
      </Content>
    </Layout>
  );
};

export default LayoutMainDesktop;
