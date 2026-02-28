import { useEffect } from "react";
import { base_url } from "../constant.js";
import HeaderMetrix from "./HeaderMetrix";
import MainBody from "./MainBody";
import SidebarFilter from "./SidebarFilter";
import axios from "axios";

const Body=()=>{
    const onFilterChange=async(urlData)=>{
        // console.log("This DATA WILL GO TO BACKEND :: ",urlData)
        const queryString = new URLSearchParams(urlData).toString();

        const url = `${base_url}?${queryString}`;

        // console.log("This the params url :: ",url);
        try {
            const res = await axios.get(url);
            const data = res.data.data;
            console.log("Data from the Backend :: ",data);

        } catch (error) {
            console.error("Error while fetching data :: ",error)
        }
    }

    const getAllFilterData =async ()=>{
        try {
            const res = await axios.get(`${base_url}/filters`);

            console.log("Filter :: ",res.data.data);
        } catch (error) {
            console.log("Error while fetching filter data :: ",getAllFilterData)
        }
    }
    useEffect(()=>{
        getAllFilterData();
    },[])
    return(
        <div className="bg-gray-800 h-full p-2 flex flex-col gap-2">
            <HeaderMetrix/>
            <div className="flex gap-2 bg-olive-500 flex-1 overflow-auto">
                <SidebarFilter onFilterChange={onFilterChange}/>
                <MainBody/>
            </div>
        </div>
    )
}
export default Body;