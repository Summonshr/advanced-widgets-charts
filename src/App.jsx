import { useSearchParams } from 'react-router-dom';
import Chart from './charts/Chart';
import { companies, sectors } from './constants/companies';

function App() {
  const [searchParams] = useSearchParams();
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
          <Chart data={{ s: data.s, v: data.i }} title="Company - Investment wise" />
        </div>
        <div>
          <Chart data={{ s: data.s, v: data.t }} title="Company - Value wise" />
        </div>
        <div>
          <Chart data={{ s: data.s, v: pvalues }} title="Company - Profit wise" />
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
