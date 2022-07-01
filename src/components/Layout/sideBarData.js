import React from "react"
import { ArrowRight, Build, StorageTwoTone, WifiTwoTone, Dashboard, PersonalVideo } from "@material-ui/icons";

export const SideBarData = [
    {
        title: "Dashboard",
        icon: <Dashboard/>,
        link: "/"
    },
    {
        title: "Energi Monitoring",
        icon: <PersonalVideo/>,
        link: "/energymonitoring"
    },
    {
        title: "Alat",
        icon: <Build/>,
        link: "/alat"
    },
    {
        title: "Koneksi",
        icon: <WifiTwoTone/>,
        link: "/koneksi"
    },
    {
        title: "Test Connection and Subcription",
        icon: <ArrowRight/>,
        link: "/testcs"
    },
    {
        title: "Test Publisher and Subcription",
        icon: <ArrowRight/>,
        link: "/testpr"
    },
    {
        title: "DataStream",
        icon: <StorageTwoTone/>,
        link: "/data-stream"
    },
]