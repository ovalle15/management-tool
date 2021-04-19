
import  TableComp  from '../components/TableComp'

export default function MainTable() {

const rows = [
    createData('01-001', 'NeedsReview'),
    createData('01-002', 'Updated'),
    createData('01-003', 'Upload'),
    createData('10-004', 'In Progress'),
    createData('10-005', 'Needs Updates')
    ];

function createData(item, status) {
    return {
        status,
        item,
        history: [
        { reviewed: '2020-01-05', reviewer: 'Harry', comments: 3 }
        ],
    };
}

// compomentDidMount() {
//     console.log()
// }
// console.log("This is rows", rows)

  return (
    <TableComp></TableComp>
  );
}
