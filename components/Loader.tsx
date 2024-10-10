interface LoaderProps {
    size?: number;
    alt?: boolean;
}

function Loader({ size = 56, alt = false }: LoaderProps) {
    return (
        <div
            style={{
                width: size,
                height: size,
                border: `${alt ? "5px solid #d81f26" : "3px solid #fff"}`,
                borderBottomColor: "transparent",
                borderRadius: "50%",
                display: "inline-block",
            }}
            className="animate-loader"
        ></div>
    );
}

export default Loader;
