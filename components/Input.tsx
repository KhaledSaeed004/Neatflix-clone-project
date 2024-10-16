import React from "react";

interface InputProps {
    id: string;
    onChange: any;
    onKeyDown?: any;
    value: string;
    label: string;
    type?: string;
}

function Input({ id, onChange, onKeyDown, value, label, type }: InputProps) {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-900 ring-2 ring-transparent appearance-none transition duration-200 ease-in-out outline-none focus:outline-none focus:ring-0 focus:shadow-[0_0_0_2px_rgba(182,26,31,0.7)] peer"
                placeholder=" "
            />
            <label
                className="absolute text-md text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
}

export default Input;
