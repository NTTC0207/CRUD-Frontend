import moment from 'moment';
import { TransResponse } from '../Interface/userTransactionInterface';


export const parseStringtoDate = (dateString: string) => {
    const parsedDate = moment(dateString, 'YYYY-MM');
    const formattedDate = parsedDate.format('MMMM YYYY');
    return formattedDate;
}


  //update state after update without fetching data again
  export const updateTransResponseById = (transData:TransResponse[], id: number, amount: number) => {
    const CloneTrans = structuredClone(transData)
    const newTransData = CloneTrans.map((item: any) => {
      if (item.id === id) {
        return { ...item, amount }
      }
      return item
    })
   return newTransData
  }

  //delete state after delete without fetching data again
 export const sliceTransResponseById = (transData:TransResponse[],id: number) => {
    const CloneTrans = structuredClone(transData)
    const newTransData = CloneTrans.filter((item: any) => item.id !== id)
    return newTransData
  }
