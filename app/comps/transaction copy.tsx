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
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) || 0, 
        });
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
        <main className="bg-gray-100 p-6 text-black">
            <div className="relative bg-white p-4 w-full">
                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    <div className="flex-1">
                        <form method="POST" className="bg-white rounded-lg shadow-md p-4 w-full" onSubmit={handleFormSubmit}>
                        <div className="grid md:grid-cols-3 gap-3">
            
                                    <div className="bg-white rounded-lg shadow-md p-2 h-60">
                                        <h1 className="font-semibold text-xl mb-2">SHIFT TIME:</h1>
                                        <div className="w-full mb-1">
                                            <label className="block text-sm font-medium">Cashier&apos;s Name:</label>
                                            <input type="text" className="w-full p-1 border border-gray-300 rounded-md" name="cashier" disabled value={cashier.name} />
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-sm font-medium">Shift Time:</label>
                                            <select className="w-full p-1 border border-gray-300 rounded-md" name="time" onChange={handleInputChange}>
                                                <option value="AM">AM</option>
                                                <option value="MID">MID</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Summary Section */}
                                    <div className="bg-white rounded-lg shadow-md p-2 h-60"> {/* Added h-fit */}
                                        <h2 className="font-semibold text-xl mb-2">Summary:</h2>
                                        <div className="w-full">
                                            <div className="mb-1">
                                                <label className="block text-sm font-bold">Subtotal Trade POS:</label>
                                                <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                                    P {subtotalTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                            <div className="mb-1">
                                                <label className="block text-sm font-bold">Subtotal Non-Trade POS:</label>
                                                <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                                    P {subtotalNonTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                            <div className="mb-1">
                                                <label className="block text-sm font-bold">GRAND TOTAL POS:</label>
                                                <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                                    P {grandTotalPOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* MM Details Section */}
                                    <div className="bg-white rounded-lg shadow-md p-2 h-60">
                                            <h2 className="font-semibold text-xl mb-2">MM Details:</h2>
                                            <div className="grid md:grid-cols-2 gap-2">
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">MM-HEAD OFFICE:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md" name="mm_head" onChange={handleInputChange}/>
                                                </div>
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">MM-COMMISSARY:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md"  name="mm_commissary" onChange={handleInputChange}/>
                                                </div>
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">MM-RM:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md"  name="mm_rm" onChange={handleInputChange}/>
                                                </div>
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">MM-DM:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md" name="mm_dm" onChange={handleInputChange}/>
                                                </div>
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">MM-KM:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md" name="mm_km" onChange={handleInputChange}/>
                                                </div>
                                                <div className="w-full">
                                                    <label className="block text-sm font-medium">FOOD CHARGE:</label>
                                                    <input type="text" className="w-full p-1 border border-gray-300 rounded-md"  name="food_charge" onChange={handleInputChange}/>
                                                </div>
                                             
                                            </div>
                                        </div>
                                </div>


                            <h2 className="shadow-md font-semibold text-lg mb-4  mt-0 p-4 ">PAYMENT METHODS:</h2>
                            <div className="bg-white mb-4 shadow-md grid  md:grid-cols-3 sm:grid-cols-3 gap-2 p-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Cash:</label>
                                    <input type="number" name="cash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Check:</label>
                                    <input type="number"  name="check" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">BPI Credit Card:</label>
                                    <input type="number" name="bpi_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">BPI Debit Card:</label>
                                    <input type="number" name="bpi_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Metro Credit Card:</label>
                                    <input type="number" name="metro_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Metro Debit Card:</label>
                                    <input type="number" name="metro_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Pay Maya:</label>
                                    <input type="number" name="paymaya" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">AUB Credit Card:</label>
                                    <input type="number" name="aub_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GCash:</label>
                                    <input type="number" name="gcash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Food Panda:</label>
                                    <input type="number" name="food_panda" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">StreetBy:</label>
                                    <input type="number" name="streetby" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Grab Food:</label>
                                    <input type="number" name="grabfood" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GC Claimed (Others):</label>
                                    <input type="number" name="gc_claimed_others" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GC Claimed (OWN):</label>
                                    <input type="number" name="gc_claimed_own" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={handleInputChange}/>
                                </div>
                                
                            </div>
                            <div>
                                                <label className="block text-sm font-medium">Z READING POS:</label>
                                                <input type="text" className="w-full p-1 border border-gray-300 rounded-md" name="z_reading_pos" onChange={handleInputChange} />
                                            </div>
                            <button type="submit" className="py-2 px-8 bg-green-600 text-white rounded-md hover:bg-green-500 transition" disabled={disable}>
                                                Submit
                                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}