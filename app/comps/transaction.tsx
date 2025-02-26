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
                <form method="POST" className="bg-white rounded-lg shadow-md p-6 w-full" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Payment Methods Section */}
                            <div className="md:w-[1220px]">
                                <h2 className="font-semibold mt-0 text-lg mb-4 p-6 border-2 rounded-lg shadow-md">PAYMENT METHODS:</h2>
                                <div className="bg-white shadow-md grid md:grid-cols-3 rounded-lg border-2 gap-6 p-6">
                                    <div className="w-full mb-3">
                                        <label className="block text-sm font-medium">Cash:</label>
                                        <input type="number" name="cash" placeholder="Enter your Cash..." className="w-full mb-4 appearance-none block p-6 bg-gray-200 text-gray-700 border rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Check:</label>
                                        <input type="number" name="check" placeholder="Enter your Check..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">BPI Credit Card:</label>
                                        <input type="number" name="bpi_ccard"  placeholder="Enter Credit ..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">BPI Debit Card:</label>
                                        <input type="number" name="bpi_dcard" placeholder="Enter value..." className="w-full appearance-none block mb-4 p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange} />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Metro Credit Card:</label>
                                        <input type="number" name="metro_ccard" placeholder="Enter a value..." className="w-full appearance-none block mb-4 p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Metro Debit Card:</label>
                                        <input type="number" name="metro_dcard" placeholder="Enter a value..." className="w-full appearance-none block p-6 mb-4  bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Pay Maya:</label>
                                        <input type="number" name="paymaya" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">AUB Credit Card:</label>
                                        <input type="number" name="aub_ccard" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">GCash:</label>
                                        <input type="number" name="gcash" placeholder="Enter a value..." className="w-full appearance-none block mb-4 p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Food Panda:</label>
                                        <input type="number" name="food_panda" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">StreetBy:</label>
                                        <input type="number" name="streetby" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">Grab Food:</label>
                                        <input type="number" name="grabfood" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">GC Claimed (Others):</label>
                                        <input type="number" name="gc_claimed_others"  placeholder="Enter a value..." className="w-full mb-4 appearance-none block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium">GC Claimed (OWN):</label>
                                        <input type="number" name="gc_claimed_own" placeholder="Enter a value..." className="w-full mb-4 appearance-none block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" step="0.01" onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </div>

                            {/* MM Details Section */}
                            <h2 className="font-semibold text-lg mb-4 p-6 border-2 rounded-lg md:w-[1220px] shadow-md">MM DETAILS:</h2>
                            <div className="bg-white rounded-lg md:w-[1220px]  rounded-lg border-2 shadow-md p-6">

                                <div className="grid md:grid-cols-3 gap-6 p-6">
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-HEAD OFFICE:</label>
                                        <input type="text" placeholder="Enter a Name..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_head" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-COMMISSARY:</label>
                                        <input type="text" placeholder="Enter a Name..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_commissary" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-RM:</label>
                                        <input type="text" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_rm" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-DM:</label>
                                        <input type="text" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_dm" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">MM-KM:</label>
                                        <input type="text" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="mm_km" onChange={handleInputChange}/>
                                    </div>
                                    <div className="w-full">
                                        <label className="block mb-1 text-sm font-medium text-gray-900">FOOD CHARGE:</label>
                                        <input type="text" placeholder="Enter a value..." className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="food_charge" onChange={handleInputChange}/>
                                    </div>
                                </div>
                            </div>

                            {/* Z Reading POS Section */}
                            <h2 className="font-semibold text-lg mb-4 p-6 md:w-[1220px] border-2 shadow-md rounded-lg">Z READING POS</h2>
                            <div className="md:w-[1220px]">
                                <div className="bg-white mb-4 rounded-lg border-2 shadow-md p-6">
                                    <label className="block text-sm font-medium">Z READING POS:</label>
                                    <input type="text" className="w-full appearance-none mb-4 block p-6 bg-gray-200 text-gray-700 border  rounded shadow-md leading-tight focus:outline-none focus:bg-white" name="z_reading_pos" onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-7 ">
                            {/* Shift Time Section */}
                            <div className="bg-white md:ml-[300px] mb-5 p-6 border-2 rounded-lg shadow-md">
                            <h2 className="font-semibold text-lg mb-4 p-4 border-2 shadow-md">SHIFT TIME:</h2>
                                <div className="w-full mb-3">
                                    <label className="block p-1 text-sm md:ml-4font-medium">Cashier's Name:</label>
                                    <input type="text" className="w-full appearance-none mb-4 block p-4 bg-gray-200 text-gray-700 border  rounded-xl shadow-md leading-tight focus:outline-none focus:bg-white"  name="cashier" disabled value={cashier.name} />
                                </div>
                                <div className="w-full ">
                                    <label className="block text-sm font-medium">Shift Time:</label>
                                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="time" onChange={handleInputChange}>
                                    <option>Choose Time...</option>
                                        <option value="AM">AM</option>
                                        <option value="MID">MID</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>

                            {/* Summary Section */}
                            <div className="bg-white rounded-lg md:ml-[300px] border-2 shadow-md p-4">
                          
                          <h2 className="font-semibold text-xl mb-3 p-4">Summary:</h2>
                          <div className="w-full mb-10 md:ml-4">
                              <div className="mb-2">
                                  <label className="block text-sm font-bold">Subtotal Trade POS:</label>
                                  <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                      P {subtotalTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                              </div>
                              <div className="mb-2">
                                  <label className="block text-sm font-bold">Subtotal Non-Trade POS:</label>
                                  <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                      P {subtotalNonTradePOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                              </div>
                              <div className="mb-2">
                                  <label className="block text-sm font-bold">GRAND TOTAL POS:</label>
                                  <p className="text-md w-full py-1 border-gray-300 rounded-md">
                                      P {grandTotalPOS.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </p>
                              </div>
                          </div>
                          <button
                              type="submit"
                              className="p-4 w-60 py-3 bg-green-600 text-white rounded-md text-sm mb-4 md:ml-4  hover:bg-green-500 transition-all duration-300 hover:scale-110"
                              disabled={disable}
                          >
                              Submit
                          </button>
                      </div>

                            {/* Submit Button */}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</main>
    );
}