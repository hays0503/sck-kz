"use client";
import { Layout } from "antd";
import React, { CSSProperties, useLayoutEffect, useRef, useState } from "react";

interface ILayoutMainProps {
  readonly headerContent: React.ReactNode;
  readonly content: React.ReactNode;
  readonly footerContent: React.ReactNode;
}

const { Header, Footer, Content } = Layout;


const LayoutMain: React.FC<ILayoutMainProps> = ({ headerContent, content, footerContent }) => {
  const refHeader = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refFooter = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState("100dvh");

  // useDisableRubberBandScroll();

  useLayoutEffect(() => {
    if (refHeader.current && refFooter.current && refContent.current) {
      const headerHeight = refHeader.current.offsetHeight || 0;
      const footerHeight = refFooter.current.offsetHeight || 0;
      setContentHeight(`calc(100dvh - ${headerHeight + footerHeight}px)`);
    }
  }, []);

  const layoutStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    overflow: "hidden",
    height:"100dvh",
    width: "calc(100%)",
    touchAction:"none",
    scrollBehavior:"smooth",
    overscrollBehavior:"none"
  };

  const headerStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    padding: "0px",
    backgroundColor: "#fff",
  };

  const contentStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "#fff",
    height: contentHeight,
    overflowY:"auto",
    overflowX:"clip"
  };

  const footerStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    backgroundColor: "#fff",
    padding:"0px",
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle} ref={refHeader}>
        {headerContent}
      </Header>
      <Content style={contentStyle} className="scrollable" ref={refContent}>
        {content}
      </Content>
      <Footer style={footerStyle} ref={refFooter}>
        {footerContent}
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
