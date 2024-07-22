import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";

export default function Chat({disable = true, auth}){
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(""); 

    useEffect(() => {
        window.Echo.channel('chat')
            .listen('MessageSent', (e) => {
                console.log(e)
                var novaMensagem = {name: e.message.name, message: e.message.message};
                var newMessages = [...messages, novaMensagem];
                setMessages(newMessages);
                
            });

     
    }, [messages]);

    
    const handleChange = (e) => {
        setNewMessage(e.target.value);
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage) {
            return;
        }
        console.log(newMessage)
        axios.post('/send-message', {
            message: newMessage,
            name: auth.user.name
        }).then((response) => {
            
        }).catch((error) => {
            
        });

        setNewMessage("");
    }

    return(
        <div className='max-w-72 h-[692px] bg-backprin flex-1 flex flex-col justify-between rounded-lg'>
            <div className="bg-[#1E2129] px-4 py-3 flex justify-between">
                <h1 className="font-kanit text-left text-textcard font-medium">Chat Online</h1>
                <button>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.2385 12.2585L4.25852 12.2585" stroke="#ECEDF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.2406 8.25752L20.2416 12.2585L16.2406 16.2595" stroke="#ECEDF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4.25854 8.25851L4.25854 16.2585" stroke="#ECEDF2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </button>
            </div>

            <div className="flex-1 flex flex-col p-4 gap-2 overflow-y-auto scrollbar-thumb-blue-600 scrollbar-thin scrollbar-track-backprin scrollbar2">
              {messages.map((e, index) => <ChatMessage key={e.message + index} message={e.message} name={e.name}/>)}
             
            </div>

            <div className="h-11 bg-[#232839] text-textcard text-left px-4 py-2 text-xs flex justify-between items-center rounded-b-lg">
                <form action="" onSubmit={sendMessage}>
                    <input name="message" value={newMessage} type="text" disabled={disable} onChange={handleChange} placeholder="Envie uma mensagem" className="w-full h-full bg-transparent border-none focus:border-none focus:ring-transparent" />
                    <button type="button" onClick={sendMessage} hidden></button>
                </form>

                <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8906 10.8525C15.6115 11.2168 15.1819 11.4344 14.7231 11.4438C14.2653 11.4318 13.837 11.2147 13.5566 10.8525" stroke="#545B75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.4433 10.8525C10.1645 11.2165 9.73531 11.4341 9.27686 11.4438C8.81871 11.4318 8.39014 11.2148 8.10938 10.8525" stroke="#545B75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 20.3365C15.7544 20.3347 19.0441 17.8225 20.0343 14.2009C21.156 14.0787 22.0058 13.1314 22.0058 12.003C22.0058 10.8746 21.156 9.9273 20.0343 9.80509C19.0466 6.18158 15.7557 3.6676 12 3.6676C8.24424 3.6676 4.95329 6.18158 3.96561 9.80509C2.84386 9.9273 1.99414 10.8746 1.99414 12.003C1.99414 13.1314 2.84386 14.0787 3.96561 14.2009C4.95583 17.8225 8.24549 20.3347 12 20.3365Z" stroke="#545B75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.223 15.0083C12.9493 16.1194 11.0508 16.1194 9.7771 15.0083" stroke="#545B75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
            </div>


        </div>
    )
}