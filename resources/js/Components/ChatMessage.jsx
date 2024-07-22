export default function ChatMessage({message, name}) {
    return (
        <div className="flex items-center gap-4 bg-backgroundnav p-3 rounded-md">
            <img src="image.png" className="w-10 h-10 rounded-full self-start" />
            <div>
                <p className="font-kanit text-textcard font-[400] text-sm">{name}</p>
                <p className="text-muted text-xs">{message}</p>
            </div>
        </div>
    );
}