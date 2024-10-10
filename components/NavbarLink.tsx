interface NavbarLinkProps {
    label: string;
}

function NavbarLink({ label }: NavbarLinkProps) {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    );
}

export default NavbarLink;
