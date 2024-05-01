import { create } from "zustand";
import { useAuthStore } from "./useAuth";

interface IUseChatStore {
    chatId: string | null;
    user: any;
    isCurrentUserBlocked: boolean;
    isReceiverBlocked: boolean;
    changeChat: (chatId: string, user: any) => void;
    changeBlock: () => void;
}


export const useChatStore = create<IUseChatStore>((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useAuthStore.getState().currentUser

        if (user.blocked.includes(currentUser?.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false
            })
        }

        if (currentUser?.blocked.includes(user.id as never)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true
            })
        }

        return set({
            chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false
        })
    },
    changeBlock: () => {
        set(state => ({ ...state, isReceiverBlocked: !state.isReceiverBlocked }))
    }
}))