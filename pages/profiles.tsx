import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}

function Profiles() {
    const router = useRouter();
    const { data: user } = useCurrentUser();

    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Who&apos;s watching?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                    <div onClick={() => router.push("/")}>
                        <div className="group flex-row w-44 mx-auto">
                            <div className="relative size-44 flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer">
                                <div className="absolute size-full rounded-md bg-neutral-700 z-0 transform group-hover:rotate-12 transition-all duration-300 ease-in-out" />
                                <img
                                    src="/images/default-red.png"
                                    alt="profile"
                                    className="size-full rounded-md z-10"
                                />
                            </div>
                            <p className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white transition">
                                {user?.name}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profiles;
