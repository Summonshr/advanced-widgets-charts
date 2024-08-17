import { useSearchParams } from 'react-router-dom';
import Chart from './charts/Chart';
import { companies, sectors } from './constants/companies';

function App() {
  const [searchParams] = useSearchParams();

  if (!searchParams.get('data')) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <svg className="w-16 h-16 mx-auto mb-4 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M21 3L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">No Data Found</h2>
          <p className="mb-6 text-gray-600">We couldn't find any data matching your request. Please try again with different parameters.</p>
        </div>
      </div>
    )
  }
  const data = JSON.parse(searchParams.get('data'));

  let sectorDataByInvestment = {};
  let sectorDataByValue = {};

  data.s.map((company, i) => {
    const sectorName = sectors[companies.find(c => c.symbol === company)?.sid] || 'Other';
    if (!sectorDataByInvestment[sectorName]) {
      sectorDataByInvestment[sectorName] = 0;
    }
    if (!sectorDataByValue[sectorName]) {
      sectorDataByValue[sectorName] = 0;
    }
    sectorDataByInvestment[sectorName] += data.i[i];
    sectorDataByValue[sectorName] += data.t[i];
  }, {});

  const labels = Object.keys(sectorDataByInvestment);
  const ivalues = Object.values(sectorDataByInvestment);
  const tvalues = Object.values(sectorDataByValue);
  const pvalues = data.s.map((company, i) => Math.max(data.t[i] - data.i[i], 0));
  const spvalues = labels.map((sector, i) => Math.max(tvalues[i] - ivalues[i], 0));
  return (
    <div>
      <h1 className='text-2xl font-semibold text-blue-900 text-center p-5'>Advanced widgets for Meroshare - Charts</h1>
      <div class="grid grid-cols-[repeat(auto-fill,_minmax(30rem,_1fr))]">
        <div>
          <Chart data={{ s: data.s, v: data.i }} thresold={2} title="Company - Investment wise" />
        </div>
        <div>
          <Chart data={{ s: data.s, v: data.t }} thresold={2} title="Company - Value wise" />
        </div>
        <div>
          <Chart data={{ s: data.s, v: pvalues }} thresold={2} title="Company - Profit wise" />
        </div>
        <div>
          <Chart data={{ s: labels, v: ivalues }} title="Sector - Investment wise" />
        </div>
        <div>
          <Chart data={{ s: labels, v: tvalues }} title="Sector - Value wise" />
        </div>
        <div>
          <Chart data={{ s: labels, v: spvalues }} title="Sector - Profit wise" />
        </div>
      </div>
    </div>
  );
}

export default App;
