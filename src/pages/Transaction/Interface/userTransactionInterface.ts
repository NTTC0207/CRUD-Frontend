

interface Transaction {
  id: number,
  localDate: string,
  amount: number,
}

interface MonthlyTransaction {
  key: React.Key;
  date: string;
  total: number;
  comission: number;
  archieved: boolean;
  isArchieved: boolean;
}

interface Trans {
  id: number
  formattedDate: string
  achievedQuota: number
}

interface TransResponse {
  id: number
  amount: number
  date: string
}

type ModeProps = {
  changeMode: () => void
  mode: boolean
}



export type { Transaction, MonthlyTransaction, Trans, TransResponse, ModeProps };