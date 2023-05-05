import Head from "next/head";
import { ChatArea } from "@/containers";
import images from "@/constants/images";

export default function Home() {
    return (
        <>
            <Head>
                <title>ACEra</title>
                <meta
                    name="description"
                    content="A smart chatbot to replace forms forever"
                />
                <meta
                    name="viewport"
                    content="height=device-height, 
                      width=device-width, initial-scale=1, 
                      minimum-scale=1, maximum-scale=1.0"
                />
                <link rel="icon" href={images.aces.src} />
            </Head>
            <ChatArea />
        </>
    );
}
