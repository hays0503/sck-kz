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
    width: "calc(100% - 8px)",
    maxWidth: "calc(100% - 8px)",
  };

  const headerStyle: CSSProperties = {
    width: "100%",
    height: "auto",
    padding: "5px",
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
    padding:"5px"
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle} ref={refHeader}>
        {headerContent}
      </Header>
      <Content style={contentStyle} ref={refContent}>
        {content}
      </Content>
      <Footer style={footerStyle} ref={refFooter}>
        {footerContent}
      </Footer>
    </Layout>
  );
};

export default LayoutMain;
