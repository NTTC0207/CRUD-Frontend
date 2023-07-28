import { FC, useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next'
import { fetchMonthlyTransactions } from '../API/userTransactionAPI'
import { MonthlyTransaction } from '../Interface/userTransactionInterface';
import { parseStringtoDate } from '../utils/userTransactionUtils';

type DataProps = {
    monthData: MonthlyTransaction[],
    loading: boolean,
    asyncFetch: () => void
    }
  


const UserTransaction: FC<DataProps> = ({monthData,loading}) => {

    const { t, i18n } = useTranslation();



    const columns: TableColumnsType<MonthlyTransaction> = [
        { title: <> {t("no")}</>, dataIndex: "id", key: 'name', render: (item, _, index) => <div> {index + 1}</div> }, // third parameter in render is index
        { title: <> {t("total Quota")}</>, dataIndex: 'total_quota', key: 'name', render: (item) => <div>RM {item} </div> },
        { title: <> {t("archieve Quota")}</>, dataIndex: 'achievedQuota', key: 'name', render: (item) => <div>RM {item} </div> },
        { title: <> {t("commission")}</>, dataIndex: 'commission', key: 'name', render: (item) => <div>RM {item} </div> },
        { title: <> {t("isArchieved")}</>, dataIndex: 'archived', key: 'name', render: (item) => <div>{item === true ? "Yes" : "No"}</div> },
        { title: <> {t("date")}</>, dataIndex: "formattedDate", key: 'formattedDate', render: (item) => <div>{parseStringtoDate(item)}</div> },

    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={monthData}
                loading={loading}
            />

        </>
    )
}


export default UserTransaction;