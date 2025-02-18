<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Show Transactions</title>
  @vite('resources/css/app.css')
</head>
<body>

  @include('layoouts.header')
  
  <div class="text-gray-900 bg-gray-200">
    <div class="p-4 flex">
        <h1 class="text-3xl">
            Recent Transactions
        </h1>
    </div>
    <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
                <tr class="border-b">
                    <th class="text-center p-3 px-5">Cashier's Name</th>
                    <th class="text-center p-3 px-5">Shift</th>
                    <th class="text-center p-3 px-5">Mode of Payment</th>
                    <th class="text-center p-3 px-5">Amount</th>
                    <th class="text-center p-3 px-5">Action</th>
                </tr>
                <tr class="border-b hover:bg-green-100 bg-gray-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                <tr class="border-b hover:bg-green-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                
                <tr class="border-b hover:bg-green-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                <tr class="border-b hover:bg-green-100 bg-gray-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                <tr class="border-b hover:bg-green-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                <tr class="border-b hover:bg-green-100 bg-gray-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
                <tr class="border-b hover:bg-green-100">
                    <td class="p-3 px-5 text-center"><input type="text" value="cashier.name" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center">
                        <select value="AM" class="bg-transparent text-center">
                            <option value="am">AM</option>
                            <option value="mid">Mid</option>
                            <option value="pm">PM</option>            
                        </select>
                    </td>
                    <td class="p-3 px-5 text-center"><input type="text" value="GCash" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center"><input type="text" value="1,000" class="bg-transparent text-center"></td>
                    <td class="p-3 px-5 text-center flex justify-center"><button type="button" class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</body>
</html>