import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

interface AccountNavMenuProps {
    visible?: boolean;
}

function AccountNavMenu({ visible }: AccountNavMenuProps) {
    const { data: user } = useCurrentUser();

    if (!visible) return null;

    return (
        <div className="absolute top-14 right-0 bg-black/40 backdrop-blur-md rounded-lg w-56 px-3 py-4 z-40">
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full py-2 rounded-md cursor-pointer transition">
                <img
                    className="w-8 rounded-md"
                    src="/images/default-red.png"
                    alt="Profile image"
                />
                <p className="text-white text-sm group-hover/item:underline">
                    {user?.name}
                </p>
            </div>
            <hr className="bg-gray-700 border-0 h-px my-2" />
            <ul className="flex flex-col gap-1">
                <li className="flex flex-row gap-3 items-center px-3 group/item w-full py-2 cursor-pointer hover:bg-zinc-900 rounded-md transition">
                    <IoSettingsOutline className="text-white w-4" />
                    <p className="text-white text-sm">Settings</p>
                </li>
                <li
                    className="px-3 group/item flex flex-row gap-3 items-center w-full py-2 cursor-pointer hover:bg-zinc-900 rounded-md transition"
                    onClick={() => signOut()}
                >
                    <MdLogout className="text-white w-4" />
                    <p className="text-white text-sm">Sign out</p>
                </li>
            </ul>
        </div>
    );
}

export default AccountNavMenu;
