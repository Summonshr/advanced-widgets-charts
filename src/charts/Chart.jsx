import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function (props) {
    const data = props.data;
    const chartOptions = {
        chart: {
            type: 'pie',
        },
        labels: data.s,
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

    const chartSeries = data.v;

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