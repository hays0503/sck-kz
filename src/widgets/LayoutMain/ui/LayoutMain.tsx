"use client";
import { Layout } from "antd";
import { CSSProperties, JSX } from "react";

interface ILayoutMainProps {
  readonly headerContent: JSX.Element;
  readonly content: JSX.Element;
  readonly footerContent: JSX.Element;
}

const { Header, Footer, Content } = Layout;

const LayoutMain: React.FC<ILayoutMainProps> = (props) => {
  const { headerContent, content, footerContent } = props;

  const h = "px";
  const hightHeader = 130;
  const hightFooter = 95;
  const hightContent = hightFooter+hightHeader;

  const layoutStyle: CSSProperties = {
    backgroundColor: "#FFF",
    borderRadius: 8,
    overflow: "hidden",
    width: "calc(100% - 8px)",
    maxWidth: "calc(100% - 8px)",
  };

  const headerStyle: CSSProperties = {
    "--ant-layout-header-padding": "0 10px",
    backgroundColor: "#FFF",
    width: "100dvw",
    height:`${hightHeader}${h}`,
    position: "fixed",
    zIndex: 1000,
    top: 0,    
  } as CSSProperties;
  const contentStyle: CSSProperties = {
    marginTop:`${hightHeader}${h}`,
    backgroundColor: "unset",
    paddingTop: "10px",
    paddingBottom: "10px",
    height: `calc(100vh - ${hightContent}${h})`,
    overflowY: "auto",
    overflowX: "hidden",

  };
  const footerStyle: CSSProperties = {
    paddingTop: "10px",
    backgroundColor: "#FFF",
    width: "100dvw",
    height:`${hightFooter}${h}`,
    position: "fixed",
    zIndex: 1000,
    bottom: 0,
  };
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>{headerContent}</Header>
      <Content style={contentStyle}>{content}</Content>
      <Footer style={footerStyle}>{footerContent}</Footer>
    </Layout>
  );
};

export default LayoutMain;
