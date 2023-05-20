import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MontlyAccountIncomes({ data }) {
   const [totalIncomes, setTotalIncomes] = useState();

   const chartData = {
      labels: [],
      // labels: ['incomes', 'of total'],
      datasets: [
         {
            cutout: '80%',
            label: '# of Votes',
            data: [totalIncomes, data?.totalMoney],
            backgroundColor: ['#00b094', '#00c1a150'],
            borderColor: ['#00b094', '#00c1a150'],
            // backgroundColor: ['#00b094', '#00c1a150'],
            // borderColor: ['#00b094', '#00c1a150'],
            borderWidth: 1,
         },
      ],
   };

   const filterIncomes = () => {
      return data.accountMovements.filter((value) => {
         if (value.movementType === 'income') return value.moneyAmount;
      });
   };

   useEffect(() => {
      const incomes = filterIncomes();
      const sumIncomes = incomes.reduce((acc, value) => acc + value.moneyAmount, 0);
      setTotalIncomes(sumIncomes);

      console.log(sumIncomes);
   }, [data]);

   console.log(data);

   if (!data) return <p>loading</p>;

   return (
      <div>
         <h3 className='text-center'>Montly Incomes:</h3>
         <div className='w-36 h-36 relative'>
            <Doughnut data={chartData} />
            <p className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 font-bold tracking-wide'>{totalIncomes}$</p>
         </div>
      </div>
   );
}
