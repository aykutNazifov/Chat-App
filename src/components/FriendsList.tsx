import { useState } from "react"
import ProfileInfo from "./ProfileInfo"

const FriendList = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <ProfileInfo />
            </div>
            <div className="flex-1 overflow-y-scroll custom-scrollbar">

                <div className="flex items-center gap-5">
                    <div className="flex-1 flex items-center gap-1 bg-blue-900/50 rounded p-2">
                        <img className="w-4" src="./search.png" alt="" />
                        <input className="w-full bg-transparent outline-none" type="text" placeholder="Search..." />
                    </div>
                    <img onClick={() => setIsAddDialogOpen(!isAddDialogOpen)} className="w-9 h-9 cursor-pointer bg-blue-900/50 p-2 rounded" src={isAddDialogOpen ? "./minus.png" : "./plus.png"} alt="" />
                </div>

                <div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                        <img className="w-[50px] rounded-full object-cover" src="./avatar.png" alt="" />
                        <div className="flex flex-col gap-2">
                            <h3 className="font-medium">Jane Doe</h3>
                            <p className="font-light text-[13px]">Hello</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default FriendList