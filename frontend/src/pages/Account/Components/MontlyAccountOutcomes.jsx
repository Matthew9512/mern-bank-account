import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function MontlyAccountOutcomes({ data }) {
   const [totalOutcomes, setTotalOutcomes] = useState();

   const chartData = {
      labels: [],
      // labels: ['outcomes', 'of total'],
      datasets: [
         {
            cutout: '80%',
            label: '# of Votes',
            data: [totalOutcomes, data?.totalMoney],
            backgroundColor: ['#00b094', '#00c1a150'],
            borderColor: ['#00b094', '#00c1a150'],
            // backgroundColor: ['#e34242', '#e3424257'],
            // borderColor: ['#e34242', '#e3424257'],
            borderWidth: 1,
         },
      ],
   };

   const filterOutcomes = () => {
      return data.accountMovements.filter((value) => {
         if (value?.movementType === 'outcome') return value?.moneyAmount;
      });
   };

   useEffect(() => {
      const outcomes = filterOutcomes();
      const sumOutcomes = outcomes.reduce((acc, value) => acc + value.moneyAmount, 0);
      setTotalOutcomes(sumOutcomes);

      console.log(sumOutcomes);
   }, [data]);

   console.log(data);

   if (!data) return <p>loading</p>;

   return (
      <div>
         <h3 className='text-center'>Montly Outcomes:</h3>
         <div className='w-36 h-36 relative'>
            <Doughnut data={chartData} />
            <p className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 font-bold tracking-wide'>{totalOutcomes}$</p>
         </div>
      </div>
   );
}
