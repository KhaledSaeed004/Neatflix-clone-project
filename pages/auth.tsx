import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/components/Loader";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

function Auth() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((curr) => (curr === "login" ? "register" : "login"));
    }, []);

    const login = useCallback(async () => {
        try {
            setLoading(true);
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/profiles",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            setLoading(true);
            await axios.post("/api/register", {
                email,
                name,
                password,
            });

            login();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [email, name, password, login]);

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (variant === "login") {
                if (email && password) {
                    login();
                }
            } else {
                if (email && password && name) {
                    register();
                }
            }
        }
    };

    return (
        <div className="relative size-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
            <div className="bg-black size-full lg:bg-opacity-60">
                <nav className="px-12 py-5 bg-gradient-to-b from-black to-transparent">
                    <img
                        src="/images/logo.png"
                        alt="Neatflix logo"
                        className="h-12"
                    />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 p-16 self-center mt-10 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold text-center">
                            {variant === "login" ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input
                                    id="username"
                                    label="Username"
                                    onChange={(e: any) =>
                                        setName(e.target.value)
                                    }
                                    onKeyDown={handleKeyPress}
                                    value={name}
                                />
                            )}
                            <Input
                                id="email"
                                label="Email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                onKeyDown={handleKeyPress}
                                type="email"
                                value={email}
                            />

                            <Input
                                id="password"
                                label="Password"
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                onKeyDown={handleKeyPress}
                                type="password"
                                value={password}
                            />
                        </div>
                        {variant === "login" && (
                            <button
                                onClick={login}
                                className="bg-red-600 py-3 text-white rounded-md w-full mt-8 hover:bg-red-700 transition-all duration-300 active:scale-95"
                            >
                                {!loading ? (
                                    "Login"
                                ) : (
                                    <div className="w-full flex items-center justify-center">
                                        <Loader size={25} />
                                    </div>
                                )}
                            </button>
                        )}
                        {variant === "register" && (
                            <button
                                onClick={register}
                                className="bg-red-600 py-3 text-white rounded-md w-full mt-8 hover:bg-red-700 transition-all duration-300 active:scale-95"
                            >
                                {!loading ? (
                                    "Sign up"
                                ) : (
                                    <div className="w-full flex items-center justify-center">
                                        <Loader size={25} />
                                    </div>
                                )}
                            </button>
                        )}
                        <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
                            Or
                        </div>
                        <div className="flex items-center justify-center gap-4 ">
                            <button
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl: "/profiles",
                                    })
                                }
                                className="size-full bg-white rounded-lg py-2 flex items-center justify-center"
                            >
                                <FcGoogle size={30} />
                            </button>
                            <button
                                onClick={() =>
                                    signIn("github", {
                                        callbackUrl: "/profiles",
                                    })
                                }
                                className="size-full bg-white rounded-lg py-2 flex items-center justify-center"
                            >
                                <FaGithub size={30} />
                            </button>
                        </div>
                        {variant === "login" && (
                            <p className="text-neutral-400 mt-2">
                                First time around ?
                                <span
                                    className="text-white ml-1 hover:underline cursor-pointer"
                                    onClick={toggleVariant}
                                >
                                    Create an account
                                </span>
                            </p>
                        )}
                        {variant === "register" && (
                            <p className="text-neutral-400 mt-2">
                                Already have an account ?
                                <span
                                    className="text-white ml-1 hover:underline cursor-pointer"
                                    onClick={toggleVariant}
                                >
                                    Login
                                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
