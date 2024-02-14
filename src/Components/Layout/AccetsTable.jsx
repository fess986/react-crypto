import { Table } from "antd";
import { useCryptoContext } from "../../context/context";

// начальное описание колонок и их поведение: фильтрация и сортировка
const columns = [
	{
		title: "Name",
		dataIndex: "name",
		sorter: (a, b) => a.name.length - b.name.length,
		sortDirections: ["descend"],
	},
	{
		title: "Price, $",
		dataIndex: "price",
		defaultSortOrder: "descend",
		sorter: (a, b) => a.price - b.price,
	},
	{
		title: "Amount",
		dataIndex: "amount",
		defaultSortOrder: "descend",
		sorter: (a, b) => a.amount - b.amount,
	},
];

// входящие данные. Мы их сразу вытаскиваем из ассетов и приводим к нужному виду
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     age: 32,
//     address: 'London No. 2 Lake Park',
//   },
// ];

// мы не будем менять поля и тд поэтому нам это не нужно
// const onChange = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };

export default function AccetsTable() {
	const { assets } = useCryptoContext();

	const data = assets.map(a => ({
		key: a.id,
		name: a.name,
		price: a.price,
		amount: a.amount,
	}));

	return (
		<Table
			columns={columns}
			dataSource={data}
			// onChange={onChange}
			pagination={false}
		/>
	);
}
