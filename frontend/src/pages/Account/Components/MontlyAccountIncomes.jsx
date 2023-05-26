import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { LoadingButton } from '../../../components/LoadingButton';

ChartJS.register(ArcElement, Tooltip);

export function MontlyAccountIncomes({ data }) {
   const chartOptions = {
      plugins: {
         legend: {
            display: false,
         },
      },
   };
   const chartData = {
      labels: ['incomes', 'sum money'],
      datasets: [
         {
            cutout: '80%',
            data: [data?.monthlyIncomesMovements, data.user?.totalMoney || 1e-10],
            backgroundColor: ['#00b094', '#00c1a150'],
            borderColor: ['#00b094', '#00c1a150'],
            borderWidth: 1,
         },
      ],
   };

   if (!data) return <LoadingButton />;

   return (
      <div>
         <h3 className='text-center pb-2'>Montly Incomes:</h3>
         <div className='w-36 h-36 relative'>
            <Doughnut data={chartData} options={chartOptions} />
            <p className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 font-bold tracking-wide flex flex-col text-center'>
               {data?.monthlyIncomesMovements}$
            </p>
         </div>
      </div>
   );
}
