import NavbarLink from "./NavbarLink";
import { navItems } from "@/utils/navItems";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileNavMenu from "./MobileNavMenu";
import { useCallback, useEffect, useState } from "react";
import AccountNavMenu from "./AccountNavMenu";

const TOP_OFFSET = 66;

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [showNavBackground, setShowNavBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > TOP_OFFSET) {
                setShowNavBackground(true);
            } else {
                setShowNavBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((curr) => !curr);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setIsAccountMenuOpen((curr) => !curr);
    }, []);

    return (
        <nav className="w-full fixed z-50">
            <div
                className={`px-8 md:px-16 py-6 flex flow-row items-center transition duration-500 ${
                    showNavBackground
                        ? "bg-zinc-900 bg-opacity-90 backdrop-blur-md"
                        : ""
                }`}
            >
                <img
                    src="/images/logo.png"
                    alt="Neatflix logo"
                    className="h-5 lg:h-7"
                />
                <div className="ml-8 gap-7 hidden lg:flex">
                    {navItems.map((item) => (
                        <NavbarLink key={item.label} label={item.label} />
                    ))}
                </div>
                <div className="lg:hidden ml-4 relative">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white text-sm flex flex-row items-center gap-2"
                    >
                        Browse
                        <BsChevronDown
                            className={`text-white w-4 transition ${
                                isMobileMenuOpen ? "rotate-180" : "rotate-0"
                            }`}
                        />
                    </button>
                    <MobileNavMenu visible={isMobileMenuOpen} />
                </div>
                <div className="flex items-center ml-auto gap-7">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>
                    <div onClick={toggleAccountMenu} className="relative">
                        <button className="flex items-center gap-2">
                            <div className="size-6 lg:size-10 rounded-md overflow-hidden">
                                <img
                                    src="/images/default-red.png"
                                    alt="Profile image"
                                />
                            </div>

                            <BsChevronDown
                                className={`text-white transition ${
                                    isAccountMenuOpen
                                        ? "rotate-180"
                                        : "rotate-0"
                                }`}
                            />
                        </button>
                        <AccountNavMenu visible={isAccountMenuOpen} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
