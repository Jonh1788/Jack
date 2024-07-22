import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-none focus:ring-transparent text-textcard bg-background1 text-sm h-12 w-[480px]  rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});
