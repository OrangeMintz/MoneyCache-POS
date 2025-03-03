'use client';

import Footer from '@/app/comps/footer';
import TransactionForm from "@/app/transaction/transaction";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // useEffect(() => {
    //     getUser(router, setUser, setLoading);
    // }, []);

    // if (loading) {
    //     return <Preloader />;
    // }

    return (
        <div>
            <main>

                <TransactionForm />

            </main>

        </div>
    );
}
