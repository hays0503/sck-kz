"use server"
import { returnSpecificLayout } from "@/shared/tools/deviceDetector";
import {MobileLayout,DesktopLayout} from "./layout"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LogoutLayout(props:any) {
    const Layout = await returnSpecificLayout({
        MobileLayout,
        DesktopLayout,
        props
    })
    return await Layout;
}