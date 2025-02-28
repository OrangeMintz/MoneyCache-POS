'use client';

import Footer from '@/app/comps/footer';
import Preloader from "@/app/comps/preloader";
import TransactionForm from "@/app/transaction/transaction";
import { getUser } from '@/utils/getUser';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getUser(router, setUser, setLoading);
    }, []);

    if (loading) {
        return <Preloader />;
    }

    return (
        <div>
            <main>
               
                <TransactionForm cashier={user} />

            </main>
        
        </div>
    );
}
