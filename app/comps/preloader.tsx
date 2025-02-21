'use client';
import Image from "next/image";
const Preloader = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <Image src="/images/loading.gif" alt="Loading..." width={100} height={100} />
        </div>
    );
};

export default Preloader;
