'use client';
import LineChart from '@/components/ui/linechart';
import PieChart from '@/components/ui/piechart';
import { fetchTotals, fetchTransactions, fetchUsers } from '@/utils/fetch';
import { formatNumber } from '@/utils/formatter';
import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function Home() {
    const [transactions, setTransactions] = useState([])
    const [users, setUsers] = useState([])
    const [totals, setTotal] = useState(null)

    const fetchDashboardData = async () => {
        try {

            fetchTransactions().then(setTransactions);
            fetchUsers().then(setUsers)
            fetchTotals().then(setTotal)

        } catch (error) {
            console.error("Error retrieving dashboard data: ", error)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])


    return (
<>
    {/* Main Content */}
    <div className="p-4 md:p-10 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left side: 2x2 grid of cards (taking 2 columns on medium screens and above) */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { title: 'Total Gross', value: (totals ? "₱ " + formatNumber(totals.gross) : ""), percentage: '59.3%', trend: 'up', extra: '35,000', color: 'primary' },
                    { title: 'Total Net', value: (totals ? "₱ " + formatNumber(totals.net) : ""), percentage: '70.5%', trend: 'up', extra: '8,900', color: 'success' },
                    { title: 'Total Transactions', value: ((transactions.length > 0) ? transactions.length : ""), percentage: '27.4%', trend: 'down', extra: '1,943', color: 'warning' },
                    { title: 'Total Users', value: ((users.length > 0) ? users.length : ""), percentage: '27.4%', trend: 'down', extra: '$20,395', color: 'danger' },
                ].map((card, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-4">
                        <h6 className="text-sm text-gray-500 mb-2">{card.title}</h6>
                        <h4 className="text-xl md:text-2xl font-bold mb-3">
                            {card.value}{' '}
                            <span className={`text-xs bg-${card.color}-100 border border-${card.color}-500 text-${card.color}-500 px-2 py-1 rounded-full`}>
                                {card.trend === 'up' ? '↑' : '↓'} {card.percentage}
                            </span>
                        </h4>
                        <p className="text-sm text-gray-500">
                            You made an extra <span className={`text-${card.color}-500`}>{card.extra}</span> this year
                        </p>
                    </div>
                ))}
            </div>

            {/* Right side: Activity Logs as Timeline (taking 1 column on medium screens and above) */}
            <div className="col-span-1 flex flex-col">
                <div className="bg-white rounded-lg shadow p-4 md:p-6 flex-grow">
                    <h5 className="text-lg font-bold mb-4">Activity Logs</h5>
                    <div className="max-h-64 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {/* Hide scrollbar for Chrome, Safari, and Opera */}
                        <style jsx>{`
                            .max-h-64::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        <div className="relative">
                            {/* Timeline vertical line */}
                            <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gray-200 ml-0.5"></div>
                            
                            {/* Timeline items */}
                            {transactions.map((transaction, index) => (
                                <div key={index} className="relative pl-8 pb-5">
                                    {/* Timeline dot */}
                                    <div className="absolute left-0 mt-1.5">
                                        <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white shadow"></div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="bg-gray-50 rounded-lg p-3 md:mr-5 shadow-sm">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-900">ID: {transaction.id}</span>
                                            <span className="text-xs text-gray-500">{new Date(transaction.created_at).toISOString().split("T")[0]}</span>
                                        </div>
                                        <div className="mb-1">
                                            <span className="text-sm text-gray-700">{transaction.cashier?.name || "Unknown"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-500">Hours: {transaction.time}</span>
                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 hover:bg-green-400 hover:text-white text-blue-800">
                                                <a href="/user">Details</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Unique Visitor Section */}
        <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
                <h5 className="text-lg font-bold">INCOME</h5>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                        Month
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600">
                        Week
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Line Chart - spans more columns */}
                <div className="bg-white rounded-lg shadow p-4 md:p-6 col-span-1 md:col-span-2">
                    <LineChart transactions={transactions} />
                </div>
                {/* Gauge Chart - spans fewer columns */}
                <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
                    <PieChart gross={totals ? totals.gross : 0} net={totals ? totals.net : 0} />
                </div>
            </div>
        </div>

        {/* Recent Transactions Section */}
        <div className="mt-6">
            <h5 className="text-lg font-bold mb-3">RECENT TRANSACTIONS</h5>
            <div className="bg-white rounded-lg shadow overflow-hidden p-4 md:p-8">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CASHIER</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DATE</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUB TOTAL TRADE</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SUB TOTAL NON TRADE</th>
                            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GRAND TOTAL</th>
                            <th className="px-4 md:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PERIOD</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((transaction, index) => (
                            (index < 3) ?
                                <tr key={index}>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{transaction.id}</td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{transaction.cashier?.name || "Unknown"}</td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">{new Date(transaction.created_at).toISOString().split("T")[0]}</td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(transaction.sub_total_trade > 5000) ? 'text-green-700 bg-green-100' : (transaction.sub_total_trade > 500 && transaction.sub_total_trade < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}>
                                            ₱ {formatNumber(transaction.sub_total_trade)}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(transaction.sub_total_non_trade > 5000) ? 'text-green-700 bg-green-100' : (transaction.sub_total_non_trade > 500 && transaction.sub_total_non_trade < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}>
                                            ₱ {formatNumber(transaction.sub_total_non_trade)}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-md text-xs ${(transaction.grand_total > 5000) ? 'text-green-700 bg-green-100' : (transaction.grand_total > 500 && transaction.grand_total < 5000) ? 'text-orange-700 bg-gray-100' : 'text-red-700 bg-red-100'}`}>
                                            ₱ {formatNumber(transaction.grand_total)}
                                        </span>
                                    </td>
                                    <td className="px-4 md:px-6 py-4 text-sm text-gray-500 text-right">{transaction.time}</td>
                                </tr>
                                : ""
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    {/* Scripts */}
    <Script src="/assets/js/plugins/apexcharts.min.js" strategy="afterInteractive" />
    <Script src="/assets/js/pages/dashboard-default.js" strategy="afterInteractive" />
</>
    );
}