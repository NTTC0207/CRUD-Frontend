import { MonthlyTransaction } from "../Interface/userTransactionInterface";



const fetchMonthlyTransactions = async (): Promise<MonthlyTransaction[]> => {
    try {
        const response = await fetch('/api/month');
        const json = await response.json();
        return json;
    }
    catch(err) {
        console.log('fetch data failed', err);
        return [];
    }

}