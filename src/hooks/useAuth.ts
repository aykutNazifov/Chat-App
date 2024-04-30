import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../libs/firebase";

type TCurrentUser = {
    blocked: [];
    email: string;
    id: string;
    username: string;
    avatar: string;
}


interface IUseAuthStore {
    currentUser: TCurrentUser | null;
    isLoading: boolean;
    fetchUserInfo: (uid: string) => void
}


export const useAuthStore = create<IUseAuthStore>((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid: string) => {
        if (!uid) return set({ currentUser: null, isLoading: false })

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                set({ currentUser: docSnap.data() as TCurrentUser, isLoading: false })
            } else {
                set({ currentUser: null, isLoading: false })
            }

        } catch (error) {
            set({ currentUser: null, isLoading: false })
        }
    }
}))