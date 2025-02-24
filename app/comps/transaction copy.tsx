'use client';
import { useState } from "react";
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

export default function CashierForm({cashier}:TransactionFormProps) {

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

      const [disable, setDisable] = useState(false);

    const hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        const token = localStorage.getItem('access_token');
    
        try {
            const response = await api.post("/api/transactions", { ...formData }, {
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
            <div className="relative bg-white p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Form Container */}
                    <div className="flex-1">
                        <form method="POST" className="bg-white rounded-lg shadow-md p-4" onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-1 gap-4 p-4 mb-8">
                                <h1 className="shadow-md font-semibold text-3xl mb-4 p-4">SHIFT TIME:</h1>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Cashier&apos;s Name:</label>
                                    <input type="text" className="w-full p-2 border border-gray-300 rounded-md" name="cashier" disabled value={cashier.name} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Shift Time:</label>
                                    <select className="w-full p-2 border  border-gray-300 rounded-md" name="time" onChange={hanldeInputChange}>
                                        <option value="AM">AM</option>
                                        <option value="MID">MID</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                            <h2 className="shadow-md font-semibold text-3xl mb-4 p-4">PAYMENT METHODS:</h2>
                            <div className="bg-white mb-4 shadow-md grid md:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Cash:</label>
                                    <input type="number" name="cash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Check:</label>
                                    <input type="number"  name="check" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">BPI Credit Card:</label>
                                    <input type="number" name="bpi_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">BPI Debit Card:</label>
                                    <input type="number" name="bpi_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange} />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Metro Credit Card:</label>
                                    <input type="number" name="metro_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Metro Debit Card:</label>
                                    <input type="number" name="metro_dcard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Pay Maya:</label>
                                    <input type="number" name="paymaya" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">AUB Credit Card:</label>
                                    <input type="number" name="aub_ccard" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GCash:</label>
                                    <input type="number" name="gcash" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Food Panda:</label>
                                    <input type="number" name="food_panda" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">StreetBy:</label>
                                    <input type="number" name="streetby" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">Grab Food:</label>
                                    <input type="number" name="grabfood" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GC Claimed (Others):</label>
                                    <input type="number" name="gc_claimed_others" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">GC Claimed (OWN):</label>
                                    <input type="number" name="gc_claimed_own" className="w-full p-2 border border-gray-300 rounded-md" step="0.01" onChange={hanldeInputChange}/>
                                </div>
                            </div>

                            <h2 className="shadow-md font-semibold  text-3xl  mb-4 p-4">MM Details:</h2>
                            <div className="bg-white mb-4 shadow-md p-4 grid md:grid-cols-2 gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-HEAD OFFICE:</label>
                                    <input type="text" className="w-full p-3 border  border-gray-300 rounded-md" name="mm_head" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-COMMISSARY:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="mm_commissary" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-RM:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="mm_rm" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-DM:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md" name="mm_dm" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">MM-KM:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md" name="mm_km" onChange={hanldeInputChange}/>
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-medium">FOOD CHARGE:</label>
                                    <input type="text" className="w-full p-3 border border-gray-300 rounded-md"  name="food_charge"onChange={hanldeInputChange}/>
                                </div>
                            </div>

                            <h2 className="shadow-md font-semibold text-3xl mb-4 p-4">Z Reading POS:</h2>
                            <div className="bg-white mb-4 shadow-md p-4">
                                <label className="block text-sm font-medium">Z READING POS:</label>
                                <input type="text" className="w-full p-3 border border-gray-300 rounded-md" name="z_reading_pos" onChange={hanldeInputChange} />
                            </div>

                            <div className="flex items-center justify-start m-4">
                                <button type="submit" className="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition" disabled={disable}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Summary Container */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="shadow-md font-semibold  text-3xl  p-4 mb-4">Summary:</h2>
                            <div className="w-full p-4">
                                {["Subtotal Trade POS", "Subtotal Non-Trade POS", "GRAND TOTAL POS"].map((label, index) => (
                                    <div key={index} className="mb-2">
                                        <label className="block text-sm font-bold">{label}:</label>
                                        <p className="text-md w-full py-2 border-gray-300 rounded-md">P 0.00</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}