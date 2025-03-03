"use server"
import { returnSpecificLayout } from "@/shared/tools/deviceDetector";
import {MobileLayout,DesktopLayout} from "./layout"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Layout(props:any) {
    const Layout = await returnSpecificLayout({
        MobileLayout,
        DesktopLayout,
        props
    })
    return await Layout;
}