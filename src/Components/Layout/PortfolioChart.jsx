import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useCryptoContext } from '../../context/context';

ChartJS.register(ArcElement, Tooltip, Legend);



export default function PortfolioChart() {

  const { assets } = useCryptoContext();

const data = {
  // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],- массив входных данных. Мы будем использовать наши ассеты и сразу из мэпить в данные
  labels: assets.map(a => a.name),
  datasets: [
    {
      label: '# of Votes',
      // data: [12, 19, 3, 5, 2, 3], 
      data: assets.map(a => a.totalProfit),
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      // borderColor: [
      //   'rgba(255, 99, 132, 1)',
      //   'rgba(54, 162, 235, 1)',
      //   'rgba(255, 206, 86, 1)',
      //   'rgba(75, 192, 192, 1)',
      //   'rgba(153, 102, 255, 1)',
      //   'rgba(255, 159, 64, 1)',
      // ],
      // borderWidth: 1,
    },
  ],
};

  return (
    <div style={{display: 'flex', height: 400, justifyContent: 'center', marginBottom: '1rem'}}><Pie data={data} /></div>
  )
}