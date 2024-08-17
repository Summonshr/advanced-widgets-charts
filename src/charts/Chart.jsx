import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function PieChart(props) {
    const data = props.data;

    // Calculate total sum
    const total = data.v.reduce((sum, value) => sum + value, 0);

    // Group small slices
    const threshold = props.thresold * 0.01 || 0; 
    let groupedData = { s: [], v: [] };
    let otherValue = 0;

    data.v.forEach((value, index) => {
        if (value / total >= threshold) {
            groupedData.s.push(data.s[index]);
            groupedData.v.push(value);
        } else {
            otherValue += value;
        }
    });

    if (otherValue > 0) {
        groupedData.s.push('Other');
        groupedData.v.push(otherValue);
    }

    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: groupedData.s,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        tooltip: {
            y: {
                formatter: function (value) {
                    return value.toFixed(2);
                }
            }
        }
    };

    const chartSeries = groupedData.v;

    return (
        <div className="h-[25rem] w-[30rem] text-center">
            <h2 className='text-2xl font-semibold text-blue-900'>{props.title}</h2>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="pie"
                width="100%"
                height={550}
            />
        </div>
    );
}