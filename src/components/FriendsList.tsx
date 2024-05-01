import { Key, useEffect, useState } from "react"
import ProfileInfo from "./ProfileInfo"
import AddFriendDialog from "./AddFriendDialog"
import { signOut } from "firebase/auth"
import { auth, db } from "../libs/firebase"
import { useAuthStore } from "../hooks/useAuth"
import { DocumentData, doc, getDoc, onSnapshot } from "firebase/firestore"

const FriendList = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [chats, setChats] = useState<DocumentData | undefined>([])
    const { currentUser } = useAuthStore()

    const handleLogout = async () => {
        await signOut(auth)
    }

    useEffect(() => {

        if (currentUser) {
            const unsub = onSnapshot(doc(db, "userchats", currentUser?.id), async (res) => {
                const items = res.data()?.chats

                const promises = items.map(async (item: any) => {

                    const userDocRef = doc(db, "users", item.receiverId);
                    const userDocSnap = await getDoc(userDocRef);

                    const user = userDocSnap.data()

                    return { ...item, user }
                })

                const chatData = await Promise.all(promises)

                setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
            });

            return () => {
                unsub()
            }
        }
    }, [currentUser])

    console.log("chatss", chats)


    return (
        <div className="flex flex-col h-full">
            <div className="mb-4">
                <ProfileInfo />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex items-center gap-5">
                    <div className="flex-1 flex items-center gap-1 bg-blue-900/50 rounded p-2">
                        <img className="w-4" src="./search.png" alt="" />
                        <input className="w-full bg-transparent outline-none" type="text" placeholder="Search..." />
                    </div>
                    <img onClick={() => setIsAddDialogOpen(!isAddDialogOpen)} className="w-9 h-9 cursor-pointer bg-blue-900/50 p-2 rounded" src={isAddDialogOpen ? "./minus.png" : "./plus.png"} alt="" />
                </div>

                <div>

                    {chats?.map((chat: any) => (
                        <div key={chat.chatId} className="flex items-center gap-5 p-4 cursor-pointer border-b border-b-gray-400">
                            <img className="w-[50px] rounded-full object-cover" src={chat.user?.avatar || "./avatar.png"} alt="" />
                            <div className="flex flex-col gap-2">
                                <h3 className="font-medium">{chat.user?.username}</h3>
                                <p className="font-light text-[13px]">Hello</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div>
                <button onClick={handleLogout} className="w-full py-2 bg-blue-600/80 hover:bg-blue-600 transition-colors duration-300 rounded-md">Logout</button>
            </div>


            {isAddDialogOpen && <AddFriendDialog closeDialog={() => setIsAddDialogOpen(false)} />}
        </div>
    )
}

export default FriendList