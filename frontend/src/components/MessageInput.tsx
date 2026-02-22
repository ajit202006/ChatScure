import { useRef, useState } from 'react';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const files = e.target?.files || [];
        if (!files[0].type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(typeof reader.result == "string" ? reader.result : "");
        }
        reader.readAsDataURL(files[0]);
    }

    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage: React.SubmitEventHandler = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            });
            // Clear form
            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }

    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className="mb-2 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="size-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
                            onClick={removeImage}
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex flex-1 gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Message..."
                        value={text}
                        onChange={(e) => { setText(e.target?.value) }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="btn btn-circle btn-sm bg-transparent"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>


        </div>
    )
}

export default MessageInput;