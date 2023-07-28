import { MonthlyTransaction } from "../Interface/userTransactionInterface";




export const fetchMonthlyTransactions = async (): Promise<MonthlyTransaction[]> => {
    try {
      const response = await fetch('/api/month');
      const json = await response.json();
      return json;
    } catch (error) {
      console.log('fetch data failed', error);
      return [];
    }
  };


// export const deleteMonthlyTransaction = async (id: string): Promise<MonthlyTransaction[]> => {

//   await fetch('/api/transaction/' + id, {
//     method: 'DELETE',
//     headers: {
//       'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include'
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         sliceTransResponseById(id)
//       }
//     })
//     .catch(err => console.log(err))
// }