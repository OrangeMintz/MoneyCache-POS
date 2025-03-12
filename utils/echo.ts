import Echo from "laravel-echo";
import Pusher from "pusher-js";

const echo = new Echo({
    broadcaster: "pusher",
    key: "376033264c1b14601054",
    wsHost: process.env.NEXT_PUBLIC_SOCKET_HOST || "127.0.0.1",
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
});

export default echo;
