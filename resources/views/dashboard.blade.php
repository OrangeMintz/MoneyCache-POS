<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inputs</title>
    @vite('resources/css/app.css')

    <style>
        /* Styling for the layout to create 3 columns */
        .container {
            display: grid;
            grid-template-columns: minmax(300px, 3fr) 1fr;
            gap: 10px;
            /* margin: 0 auto; */
        }

        .form-column {
            grid-column: span 1;
        }

        .total-column {
            grid-column: span 1;
            padding: 20px;
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>

<body>

    <header class="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
        <!-- logo -->
        <h1 class="w-3/12">
            <a href="">
                <svg viewBox="0 0 248 31" class="h-6 w-auto hover:text-green-500 duration-200">
                    <path
                        d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                        fill="#22C55E"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                        fill="currentColor"></path>
                </svg>
            </a>
        </h1>

        <!-- navigation -->
        <nav class="nav font-semibold text-lg">
            <ul class="flex items-center">
                <li
                    class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                    <a href="">Dashboard</a>
                </li>
                <li
                    class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                    <a href="">Produits</a>
                </li>
                <li
                    class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                    <a href="">Transactions</a>
                </li>
            </ul>
        </nav>

        <!-- buttons --->
        <div class="w-3/12 flex justify-end">
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <a href="{{ route('logout') }}"class="p-4 border-b-2 border-green-500 border-opacity-0 hover:text-green-500 duration-200 cursor-pointer"
                    onclick="event.preventDefault();
            this.closest('form').submit();">Log
                    Out</a>
            </form>
        </div>

    </header>

    <div class="font-sans bg-gray-100 p-6">

        <div class="bg-white p-4">
            <div class="container mx-auto">

                {{-- First column for Cashier Form --}}
                <form action="" method="POST" class="bg-white rounded-lg shadow-md">


                    <!-- FIRST ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Payment Details:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">

                        <div class="w-full col-span-2">
                            <label for="cashier_name" class="block text-sm font-medium">Cashier's Name:</label>
                            <input type="text" id="cashier_name" name="cashier_name"
                                class="w-full p-2 border border-gray-300 rounded-md" required>
                        </div>

                        <div class="w-full">
                            <label for="cash" class="block text-sm font-medium">Cash:</label>
                            <input type="number" id="cash" name="cash"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="check" class="block text-sm font-medium">Check:</label>
                            <input type="text" id="check" name="check"
                                class="w-full p-2 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="bpi_credit_card" class="block text-sm font-medium">BPI Credit Card:</label>
                            <input type="number" id="bpi_credit_card" name="bpi_credit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="bpi_debit_card" class="block text-sm font-medium">BPI Debit Card:</label>
                            <input type="number" id="bpi_debit_card" name="bpi_debit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="metro_credit_card" class="block text-sm font-medium">Metro Credit Card:</label>
                            <input type="number" id="metro_credit_card" name="metro_credit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="metro_debit_card" class="block text-sm font-medium">Metro Debit Card:</label>
                            <input type="number" id="metro_debit_card" name="metro_debit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="pay_maya" class="block text-sm font-medium">Pay Maya:</label>
                            <input type="number" id="pay_maya" name="pay_maya"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="aub_credit_card" class="block text-sm font-medium">AUB Credit Card:</label>
                            <input type="number" id="aub_credit_card" name="aub_credit_card"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="gcash" class="block text-sm font-medium">GCash:</label>
                            <input type="number" id="gcash" name="gcash"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                        <div class="w-full">
                            <label for="food_panda" class="block text-sm font-medium">Food Panda:</label>
                            <input type="number" id="food_panda" name="food_panda"
                                class="w-full p-2 border border-gray-300 rounded-md" step="0.01">
                        </div>

                    </div>

                    <!-- SECOND ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">MM Details:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        <div class="w-full">
                            <label for="mm_head_office" class="block text-sm font-medium">MM-HEAD OFFICE:</label>
                            <input type="text" id="mm_head_office" name="mm_head_office"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="mm_commissary" class="block text-sm font-medium">MM-COMMISSARY:</label>
                            <input type="text" id="mm_commissary" name="mm_commissary"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="mm_rm" class="block text-sm font-medium">MM-RM:</label>
                            <input type="text" id="mm_rm" name="mm_rm"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="mm_dm" class="block text-sm font-medium">MM-DM:</label>
                            <input type="text" id="mm_dm" name="mm_dm"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>

                        <div class="w-full">
                            <label for="food_change" class="block text-sm font-medium">FOOD CHANGE:</label>
                            <input type="text" id="food_change" name="food_change"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <!-- THIRD ROW -->
                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Z Reading POS:</h2>
                    <div class="bg-white mb-4 shadow-md grid grid-cols-3 gap-2 justify-items-start p-4">
                        <div class="w-full">
                            <label for="z_reading_pos" class="block text-sm font-medium">Z READING POS:</label>
                            <input type="text" id="z_reading_pos" name="z_reading_pos"
                                class="w-full p-3 border border-gray-300 rounded-md">
                        </div>
                    </div>

                    <div class="flex items-center justify-start m-4">
                        <button type="submit"
                            class="py-3 px-6 bg-green-600 text-white rounded-md hover:bg-green-500 transition">Submit</button>
                    </div>

                </form>


                <!-- Second column for Gross Total (now placed in 3rd column) -->
                <div class="bg-white rounded-lg shadow-md">

                    <h2 class="shadow-md font-semibold text-lg mb-4 p-4">Shift Time:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-8">
                        <div class="w-full">
                            <label for="shift_time" class="block text-sm font-medium">Shift Time:</label>
                            <select id="shift_time" name="shift_time"
                                class="w-full p-2 border border-gray-300 rounded-md">
                                <option value="AM">AM</option>
                                <option value="MID">MID</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>

                        {{-- <div class="w-full">
            <label for="cashier_name" class="block text-sm font-medium">Cashier's Name:</label>
            <input type="text" id="cashier_name" name="cashier_name" class="w-full p-2 border border-gray-300 rounded-md" required>
          </div> --}}
                    </div>

                    <h2 class="shadow-md font-semibold text-lg p-4 mb-4">Summary:</h2>
                    <div class="grid grid-cols-1 gap-2 justify-items-start p-4 mb-2">
                        <div class="w-full">
                            <label for="payment-gross" class="block text-sm font-bold">Subtotal Non-Trade POS:</label>
                            <p id="payment-gross" name="payment-gross"
                                class="text-md w-full py-2 border-gray-300 rounded-md">
                                P 107,105.00</p>
                        </div>
                        <div class="w-full">
                            <label for="payment-gross" class="block text-sm font-bold">Subtotal Trade POS:</label>
                            <p id="payment-gross" name="payment-gross"
                                class="text-md w-full py-2 border-gray-300 rounded-md">
                                P 107,105.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</body>

</html>
