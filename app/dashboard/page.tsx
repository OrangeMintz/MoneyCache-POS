'use client';

import Footer from '@/app/comps/footer';
import Navbar from "@/app/comps/header";
import Preloader from "@/app/comps/preloader";
import TransactionForm from "@/app/transaction/transaction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { getUser } from '@/utils/getUser';

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
                <Navbar />
                <TransactionForm cashier={user} />
            </main>
            <Footer />
        </div>
    );
}
