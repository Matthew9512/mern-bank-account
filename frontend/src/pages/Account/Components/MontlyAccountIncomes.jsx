import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { LoadingButton } from '../../../components/LoadingButton';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MontlyAccountIncomes({ data }) {
   const chartData = {
      labels: [],
      // labels: ['incomes', 'of total'],
      datasets: [
         {
            cutout: '80%',
            label: '# of Votes',
            data: [data?.monthlyIncomesMovements, data.user?.totalMoney],
            backgroundColor: ['#00b094', '#00c1a150'],
            borderColor: ['#00b094', '#00c1a150'],
            borderWidth: 1,
         },
      ],
   };

   if (!data) return <LoadingButton />;

   return (
      <div>
         <h3 className='text-center'>Montly Incomes:</h3>
         <div className='w-36 h-36 relative'>
            <Doughnut data={chartData} />
            <p className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 font-bold tracking-wide flex flex-col text-center'>
               {data?.monthlyIncomesMovements}$
            </p>
         </div>
      </div>
   );
}
