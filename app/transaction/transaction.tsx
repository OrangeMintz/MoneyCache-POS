'use client';
import { useEffect, useState } from "react";
import Toast from 'typescript-toastify';
import api from "../../utils/api";

type Cashier = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at: string | null;
};

type TransactionFormProps = {
    cashier: Cashier;
}

export default function CashierForm({ cashier }: TransactionFormProps) {
    const [formData, setFormData] = useState({
        cashier_id: cashier.id,
        time: "AM",
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

    // Calculate totals whenever formData changes
    useEffect(() => {
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

            console.log("Store Data:", response.data);

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

    return (
        <main className="bg-gray-100 w-full text-black min-h-screen">
            <div className="relative  w-full">
                <div className="flex flex-col lg:flex-row gap-6 w-full max-w-full overflow-x-hidden">
                    <div className="flex-1">
                        <form method="POST" className=" rounded-lg shadow-md p-6 w-full" onSubmit={handleFormSubmit}>

                            <div className="bg-white p-6 flex w-full grid grid-cols-1 lg:grid-cols-7 rounded-md gap-2">
                                {/* Left Column */}
                                <div className="  flex gap-2 grid grid-cols-1 lg:grid-cols-5 col-span-5">
                                    <div className="col-span-1 lg:col-span-3 ">
                                        <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-lg p-5 border-2 rounded-t-md shadow-md">PAYMENT DETAILS:</h2>
                                        <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-lg border-2 gap-6 p-6 mb-2">
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Cash:</label>
                                                <input type="number" name="cash" placeholder="Enter your Cash..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Check:</label>
                                                <input type="number" name="check" placeholder="Enter your Check..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">BPI Credit Card:</label>
                                                <input type="number" name="bpi_ccard" placeholder="Enter Credit ..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">BPI Debit Card:</label>
                                                <input type="number" name="bpi_dcard" placeholder="Enter value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Metro Credit Card:</label>
                                                <input type="number" name="metro_ccard" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Metro Debit Card:</label>
                                                <input type="number" name="metro_dcard" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3  bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Pay Maya:</label>
                                                <input type="number" name="paymaya" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">AUB Credit Card:</label>
                                                <input type="number" name="aub_ccard" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">GCash:</label>
                                                <input type="number" name="gcash" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Food Panda:</label>
                                                <input type="number" name="food_panda" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">StreetBy:</label>
                                                <input type="number" name="streetby" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">Grab Food:</label>
                                                <input type="number" name="grabfood" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">GC Claimed (Others):</label>
                                                <input type="number" name="gc_claimed_others" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-xs font-medium">GC Claimed (OWN):</label>
                                                <input type="number" name="gc_claimed_own" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-1 lg:col-span-2">
                                        <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-lg p-5 border-2 rounded-t-md shadow-md">MM DETAILS:</h2>
                                        <div className="bg-white shadow-md  rounded-b-lg border-2 ">
                                            <div className="w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-2 gap-6 p-6">
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">Head Office:</label>
                                                    <input type="text" placeholder="Enter a Name..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_head" onChange={handleInputChange} />
                                                </div>
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">Commissary:</label>
                                                    <input type="text" placeholder="Enter a Name..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_commissary" onChange={handleInputChange} />
                                                </div>
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">MM-RM:</label>
                                                    <input type="number" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_rm" onChange={handleInputChange} />
                                                </div>
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">MM-DM:</label>
                                                    <input type="number" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_dm" onChange={handleInputChange} />
                                                </div>
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">MM-KM:</label>
                                                    <input type="number" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_km" onChange={handleInputChange} />
                                                </div>
                                                <div className="w-full">
                                                    <label className="block mb-1 text-xs font-medium text-gray-900">FOOD CHARGE:</label>
                                                    <input type="number" placeholder="Enter a value..." className="text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="food_charge" onChange={handleInputChange} />
                                                </div>
                                            </div>

                                            <div className="w-full p-6">
                                                <label className="block text-sm font-semibold">Z READING POS:</label>
                                                <input type="number" placeholder="Enter a value..." className=" text-xs w-full appearance-none block p-3 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="z_reading_pos" onChange={handleInputChange} />
                                            </div>



                                        </div>



                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-span-1 lg:col-span-2">
                                    <h2 className="bg-gray-100 font-semibold tracking-wide mt-0 text-lg p-5 border-2 rounded-t-md shadow-md">SHIFT TIME:</h2>
                                    <div className="bg-white shadow-md rounded-b-lg border-2 gap-6 p-6">
                                        <div className="w-full mb-3 flex gap-3">
                                            <div>
                                                <label className="block text-sm font-medium">User's Name:</label>
                                                <input type="text" className="text-sm w-full appearance-none block p-3 bg-gray-200 text-gray-700 border rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="cashier_id" disabled value={cashier.name} />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium">User's Role:</label>
                                                <input type="text" className="text-sm w-full appearance-none block p-3 bg-gray-200 text-gray-700 border rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="cashier_id" disabled value={cashier.role} />
                                            </div>

                                        </div>
                                        <div className="w-full">
                                            <label className="block text-sm font-medium">Shift Time:</label>
                                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="time" onChange={handleInputChange}>
                                                <option>Choose Time...</option>
                                                <option value="AM">AM</option>
                                                <option value="MID">MID</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>


                                        {/* Summary Section */}
                                        <h2 className="font-semibold tracking-wider text-lg mt-5 mb-3 pt-6">SUMMARY:</h2>
                                        <div className="border p-4 rounded-md shadow-sm bg-green-100 w-full">
                                            <div className="w-full">
                                                <div className="flex w-full mb-2">
                                                    <label className="block text-sm font-regular w-2/5">Subtotal POS:</label>
                                                    <p className="text-sm overflow-hidden border-gray-300 rounded-md w-3/5">
                                                        P {subtotalTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                                <div className="flex w-full items-end mb-2">
                                                    <label className="block text-sm font-regular w-2/5">Subtotal Non-POS:</label>
                                                    <p className="text-sm overflow-hidden border-gray-300 rounded-md w-3/5">
                                                        P {subtotalNonTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                                <div className="flex w-full items-end">
                                                    <label className="block text-sm font-regular w-2/5">Grand Total:</label>
                                                    <p className="text-sm overflow-hidden border-gray-300 rounded-md w-3/5">
                                                        P {grandTotalPOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-3 bg-green-600 text-white rounded-md text-sm mt-6 hover:bg-green-500 transition-all duration-300 hover:scale-105"
                                            disabled={disable}
                                        >
                                            Submit
                                        </button>

                                    </div>

                                                        

                                </div>
                            </div>

                        </form>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </main>
    );
}