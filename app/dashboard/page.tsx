import GaugeChart from '@/components/ui/gauge'; // Import the GaugeChart component
import LineChart from '@/components/ui/linechart';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cards */}
          {[
            { title: 'Total Page Views', value: '4,42,236', percentage: '59.3%', trend: 'up', extra: '35,000', color: 'primary' },
            { title: 'Total Users', value: '78,250', percentage: '70.5%', trend: 'up', extra: '8,900', color: 'success' },
            { title: 'Total Order', value: '18,800', percentage: '27.4%', trend: 'down', extra: '1,943', color: 'warning' },
            { title: 'Total Sales', value: '$35,078', percentage: '27.4%', trend: 'down', extra: '$20,395', color: 'danger' },
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h6 className="text-sm text-gray-500 mb-2">{card.title}</h6>
              <h4 className="text-2xl font-bold mb-3">
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

        {/* Unique Visitor Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-lg font-bold">Unique Visitor</h5>
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                Month
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 rounded-lg hover:bg-blue-600">
                Week
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4">
  {/* Line Chart - spans more columns */}
  <div className="bg-white rounded-lg shadow p-6 col-span-2">
    <LineChart />
  </div>
  {/* Gauge Chart - spans fewer columns */}
  <div className="bg-white rounded-lg shadow p-3 flex flex-col items-center">
    <GaugeChart />
    <div className="justify-center flex items-center gap-2 mt-2">
      <h1>Target</h1>
          <p>20%</p>
      <h1 className='block'>Revenue</h1>
      <p>50%</p>
      <h1>Sales</h1>
      <p>1000%</p>
    </div>
  </div>
</div>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-6">
          <h5 className="text-lg font-bold mb-3">Recent Orders</h5>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TRACKING NO.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PRODUCT NAME</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL ORDER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">TOTAL AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { id: '84564564', product: 'Camera Lens', quantity: 40, status: 'Rejected', amount: '$40,570' },
                  { id: '84564564', product: 'Laptop', quantity: 300, status: 'Pending', amount: '$180,139' },
                  { id: '84564564', product: 'Mobile', quantity: 355, status: 'Approved', amount: '$180,139' },
                ].map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${order.status === 'Approved' ? 'green' : order.status === 'Pending' ? 'yellow' : 'red'}-100 text-${order.status === 'Approved' ? 'green' : order.status === 'Pending' ? 'yellow' : 'red'}-800`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-right">{order.amount}</td>
                  </tr>
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