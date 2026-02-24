import type { Socket } from "socket.io-client"

interface UserType {
    _id: string,
    profilePic: string,
    fullName: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

interface MessageType {
    _id: string,
    senderId: string,
    receiverId: string,
    text: string,
    createdAt: string,
    image: string
}



interface UseChatStoreType {
    users: Array<UserType>,
    messages: Array<MessageType>
    selectedUser: UserType | null,
    isUsersLoading: boolean,
    isMessagesLoading: boolean,
    getUsers: () => {},
    getMessages: (userId: string) => {},
    sendMessage: (messageData: { text: string | null, image: string | null }) => {},
    subscribeToMessages: () => void,
    unsubscribeFromMessages: () => void,
    setSelectedUser: (selectedUser: UserType | null) => void
}

interface UseAuthStoreType {
    authUser: UserType | null,
    isSigningUp: boolean,
    isLoggingIn: boolean,
    isUpdatingProfile: boolean,
    onlineUsers: Array<string>,
    socket: Socket | null,
    isCheckingAuth: boolean,

    checkAuth: () => {},

    signUp: (data: { fullName: string, email: string, password: string }) => {},

    login: (data: { email: string, password: string }) => {},

    logout: () => {},

    updateProfile: (data: { profilePic: string | ArrayBuffer | null }) => {},

    connectSocket: () => void,

    disconnectSocket: () => void
}


export type { UserType, MessageType, UseChatStoreType, UseAuthStoreType }