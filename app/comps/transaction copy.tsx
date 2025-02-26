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

export default function CashierForm({cashier}: TransactionFormProps) {
    const [formData, setFormData] = useState({
        cashier: cashier.id,
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
            formData.mm_rm,
            formData.mm_dm,
            formData.food_charge,
        ];

        const tradeTotal = tradeFields.reduce((sum, value) => sum + (value || 0), 0);
        const nonTradeTotal = nonTradeFields.reduce((sum, value) => sum + (value || 0), 0);

        setSubtotalTradePOS(tradeTotal);
        setSubtotalNonTradePOS(nonTradeTotal);
        setGrandTotalPOS(tradeTotal + nonTradeTotal);
        localStorage.removeItem('selected_date')
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
                    position: "top-right",
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
                position: "top-right",
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
<main className="bg-gray-100 w-full text-black">
    <div className="relative bg-white w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
            <div className="flex-1">
                <form method="POST" className="bg-white rounded-lg shadow-md p-5 w-full" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                        {/* Left Column */}
                        <div className="space-y-7">
                            {/* Payment Methods Section */}
                            <div>
                                <h2 className="font-semibold text-lg mb-4 p-4 shadow-md">PAYMENT METHODS:</h2>
                                <div className="bg-white mb-4 shadow-md grid md:grid-cols-2 gap-3 p-5">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Cash:</label>
                                        <input type="number" name="cash" className="w-full p-3 rounded-xs border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Check:</label>
                                        <input type="number" name="check" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">BPI Credit Card:</label>
                                        <input type="number" name="bpi_ccard" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">BPI Debit Card:</label>
                                        <input type="number" name="bpi_dcard" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Metro Credit Card:</label>
                                        <input type="number" name="metro_ccard" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Metro Debit Card:</label>
                                        <input type="number" name="metro_dcard" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Pay Maya:</label>
                                        <input type="number" name="paymaya" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">AUB Credit Card:</label>
                                        <input type="number" name="aub_ccard" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">GCash:</label>
                                        <input type="number" name="gcash" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Food Panda:</label>
                                        <input type="number" name="food_panda" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">StreetBy:</label>
                                        <input type="number" name="streetby" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">Grab Food:</label>
                                        <input type="number" name="grabfood" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">GC Claimed (Others):</label>
                                        <input type="number" name="gc_claimed_others" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium mb-1">GC Claimed (OWN):</label>
                                        <input type="number" name="gc_claimed_own" className="w-full p-3 rounded-2xl border border-gray-300 shadow-md outline-none focus:ring-4 focus:ring-gray-200 transition-all transform focus:scale-100" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </div>

                            {/* MM Details Section */}
                            <div className="bg-white rounded-lg shadow-md p-5">
                                <h2 className="font-semibold text-xl mb-4">MM Details:</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-HEAD OFFICE:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="mm_head" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-COMMISSARY:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="mm_commissary" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-RM:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="mm_rm" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-DM:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="mm_dm" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-KM:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="mm_km" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">FOOD CHARGE:</label>
                                        <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="food_charge" onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </div>

                            {/* Z Reading POS Section */}
                            <div>
                                <h2 className="font-semibold text-lg mb-4 p-4 shadow-md">Z READING POS</h2>
                                <div className="bg-white mb-4 shadow-md p-5">
                                    <label className="block text-sm font-medium mb-1">Z READING POS:</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="z_reading_pos" onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-7">
                            {/* Shift Time Section */}
                            <div className="bg-white p-5 rounded-lg shadow-md">
                                <h1 className="font-semibold text-lg mb-4">SHIFT TIME:</h1>
                                <div className="w-full mb-4">
                                    <label className="block p-1 text-sm font-medium mb-1">Cashier's Name:</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="cashier" disabled value={cashier.name} />
                                </div>
                                <div className="w-full mb-3">
                                    <label className="block text-sm font-medium mb-1">Shift Time:</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-md" name="time" onChange={handleInputChange}>
                                        <option value="AM">AM</option>
                                        <option value="MID">MID</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="bg-white rounded-lg shadow-md p-5">
                                <h2 className="font-semibold text-xl mb-4">Summary:</h2>
                                <div className="w-full space-y-3">
                                    <div className="mb-3">
                                        <label className="block text-sm font-bold">Subtotal Trade POS:</label>
                                        <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                            P {subtotalTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm font-bold">Subtotal Non-Trade POS:</label>
                                        <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                            P {subtotalNonTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm font-bold">GRAND TOTAL POS:</label>
                                        <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                            P {grandTotalPOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <button
                                        type="submit"
                                        className="p-4 w-60 py-3 bg-green-600 text-white rounded-md text-sm hover:bg-green-500 transition"
                                        disabled={disable}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
    );
}