import { useUser } from "@clerk/clerk-react"
import { useState,useEffect } from "react"
import { StreamChat } from "stream-chat"
import { useQuery } from "@tanstack/react-query"
import { getStreamToken } from "../lib/api.js"

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


const useStreamChat = () => {

    const {user} = useUser();
    const [chatClient, setChatClient] = useState(null);

    const {data:tokenData ,isLoading:tokenLoading , isError:tokenError }= useQuery({
      queryKey: ["streamToken"],
      queryFn: getStreamToken,
      enabled: !!user?.id,
    });

    useEffect(() => {
        const init = async () => {
            if(!tokenData?.token || !user) return;

            try {
                const client = StreamChat.getInstance(STREAM_API_KEY);
    
                await client.connectUser(
                    {
                        id: user.id,
                        name: user.fullName,
                        image: user.imageUrl,
                    }
                );
                setChatClient(client);
            } catch (error) {
                console.error("Error connecting to Stream Chat:", error);
            }
        }

        init();

        return () => {
            if (chatClient) {
                chatClient.disconnectUser();
            }
        }
    }, [tokenData, user,chatClient]);


    return {chatClient, isLoading: tokenLoading, error: tokenError};
}

export default useStreamChat
