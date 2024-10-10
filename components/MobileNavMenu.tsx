import { navItems } from "@/utils/navItems";
import React from "react";

interface MobileNavMenuProps {
    visible?: boolean;
}

function MobileNavMenu({ visible }: MobileNavMenuProps) {
    if (!visible) return null;

    return (
        <div className="absolute top-8 left-0 bg-black/40 backdrop-blur-md rounded-lg w-56 py-5 z-40">
            <ul className="flex flex-col gap-2 px-6">
                {navItems.map((item, i) => (
                    <li
                        key={`${item.label}-${i}`}
                        className="py-2 text-white text-center hover:bg-zinc-900 rounded-md cursor-pointer transition"
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MobileNavMenu;
