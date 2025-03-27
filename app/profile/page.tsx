'use client';
import Preloader from "@/app/comps/preloader";
import { useAppContext } from "@/context/AppContext";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Toast from 'typescript-toastify';
import api from "../../utils/api";

export default function CashierForm() {
    const { user, globalFunction, availableTimes } = useAppContext()
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        cashier_id: 0,
        time: null,
        cash: null,
        check: null,
        bpi_ccard: null,
        bpi_dcard: null,
        metro_ccard: null,
        metro_dcard: null,
        paymaya: null,
        aub_ccard: null,
        gcash: null,
        food_panda: null,
        streetby: null,
        grabfood: null,
        gc_claimed_others: null,
        gc_claimed_own: null,
        mm_head: null,
        mm_commissary: null,
        mm_rm: null,
        mm_dm: null,
        mm_km: null,
        food_charge: null,
        z_reading_pos: null,
    });

    const [subtotalTradePOS, setSubtotalTradePOS] = useState(0);
    const [subtotalNonTradePOS, setSubtotalNonTradePOS] = useState(0);
    const [grandTotalPOS, setGrandTotalPOS] = useState(0);

    const [disable, setDisable] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prevFormData => ({
                ...prevFormData,
                cashier_id: user.id
            }));
            setLoading(false)
        }
    }, [user])

    // Calculate totals whenever formData changes
    useEffect(() => {
        globalFunction()
        const tradeFields = [
            formData.cash,
            formData.check,
            formData.bpi_ccard,
            formData.bpi_dcard,
            formData.metro_ccard,
            formData.metro_dcard,
            formData.paymaya,
            formData.aub_ccard,
            formData.gcash,
            formData.food_panda,
            formData.streetby,
            formData.grabfood,
            formData.gc_claimed_others,
            formData.gc_claimed_own,
        ];

        const nonTradeFields = [
            // formData.mm_head,
            // formData.mm_commissary,
            formData.mm_rm,
            formData.mm_dm,
            formData.mm_km,
            formData.food_charge,
        ];

        const tradeTotal = tradeFields.reduce((sum, value) => sum + (value || 0), 0);
        const nonTradeTotal = nonTradeFields.reduce((sum, value) => sum + (value || 0), 0);

        setSubtotalTradePOS(tradeTotal);
        setSubtotalNonTradePOS(nonTradeTotal);
        setGrandTotalPOS(tradeTotal + nonTradeTotal);
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: name === "mm" ? value : value === "" ? null : !isNaN(Number(value)) ? Number(value) : value,
        }));
    };


    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const token = localStorage.getItem('access_token');

        try {
            const response = await api.post("/api/transaction", { ...formData }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.status === 'success') {
                setDisable(true);
                new Toast({
                    position: "bottom-right",
                    onClose: () => { window.location.href = "/transactionlist"; },
                    toastMsg: "Successfully stored transaction!",
                    autoCloseTime: 2000,
                    canClose: true,
                    showProgress: true,
                    pauseOnHover: true,
                    pauseOnFocusLoss: true,
                    type: "success",
                    theme: 'dark',
                });
            }
        } catch (error: any) {
            console.error("Error storing transaction:", error);

            let errorMessage = "An unexpected error occurred!";
            if (error.response) {
                errorMessage = error.response.data.message || "Failed to store transaction!";
            } else if (error.request) {
                errorMessage = "No response from server. Please try again!";
            } else {
                errorMessage = error.message;
            }

            new Toast({
                position: "bottom-right",
                toastMsg: errorMessage,
                autoCloseTime: 2000,
                canClose: true,
                showProgress: true,
                pauseOnHover: true,
                pauseOnFocusLoss: true,
                type: "error",
                theme: 'dark',
            });
        }
    };

    if (loading) {
        return <Preloader />
    }

    return (
        <main className="dark:bg-gray-100 w-full text-black min-h-screen">
            <div className="relative  w-full">
                <div className="flex flex-col lg:flex-row p-6 w-full max-w-full overflow-x-hidden">
                    <div className="flex-1">
                    <div className="dark:bg-black p-6 flex w-full grid grid-cols-1 lg:grid-cols-1 rounded-md gap-2">
                            <div className="flex gap-2  lg:grid-cols-5 col-span-5">
                                <div className="col-span-1 w-full">
                                    <h2 className="dark:bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">PROFILE DETAILS:</h2>
                                    <div className="dark:bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2">
                                        <div className="flex items-center space-x-6">
                                        <div className="w-48 h-48 rounded-full dark:bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <Image 
                                                src="/images/r.JPG" 
                                                alt="Profile" 
                                                width={50} 
                                                height={192} 
                                                className="w-full h-full object-cover rounded-full"
                                                priority
                                                quality={90}
                                            />
                                        </div>
                                            <div className="flex-grow space-y-4">
                                                <div>
                                                    <h3 className="text-xl font-bold">Ramon Paulo Caumban</h3>
                                                    <p className="text-gray-600">Web Developer</p>
                                                </div>
                                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-2  lg:grid-cols-5 col-span-5">
                                <div className="col-span-1 w-full">
                                    <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">PASSWORD CONFIGURATION</h2>
                                    <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2 ">   
                                    <form action="">
                                    <div className="space-y-4">
                                           
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
                                                </label>
                                                <input 
                                                    type="password"
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    placeholder="Enter current password"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <input 
                                                    type="password"
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    placeholder="Enter new password"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Retype New Password
                                                </label>
                                                <input 
                                                    type="password"
                                                    className="w-full px-3 py-2 border rounded-md"
                                                    placeholder="Confirm new password"
                                                    required
                                                />
                                            </div>
                                            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
                                                Save
                                            </button>
                                         
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex gap-2  lg:grid-cols-5 col-span-5">
                                <div className="col-span-1 w-full">
                                    <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-sm p-5 border-2 rounded-t-md shadow-md">DELETE ACCOUNT</h2>
                                    <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2 ">
                                        <div className="bg-red-50 p-4 rounded-md">
                                            <p className="text-red-700 text-sm mb-4">
                                                Warning: Deleting your account is a permanent action. 
                                                Once deleted, your account cannot be recovered and all data will be permanently lost.
                                            </p>
                                            <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div >
        </main >
    );
}