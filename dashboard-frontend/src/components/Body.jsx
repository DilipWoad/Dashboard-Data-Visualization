import HeaderMetrix from "./HeaderMetrix";
import MainBody from "./MainBody";
import SidebarFilter from "./SidebarFilter";

const Body=()=>{
    return(
        <div className="bg-gray-800 h-full p-2 flex flex-col gap-2">
            <HeaderMetrix/>
            <div className="flex gap-2 bg-olive-500 flex-1 overflow-auto">
                <SidebarFilter/>
                <MainBody/>
            </div>
        </div>
    )
}
export default Body;