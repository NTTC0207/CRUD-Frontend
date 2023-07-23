import { useState, useEffect, memo, CSSProperties } from 'react';
import { Line } from '@ant-design/plots';
import { Typography, Table, Button, Tooltip, Modal, Form, Input,Popconfirm } from 'antd';
import moment from 'moment';
import { isEqual } from "lodash-es";
import { CaretDownOutlined } from "@ant-design/icons"
import { useCookies } from 'react-cookie';
import type { TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next'
const { Text, Title } = Typography


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


const ori: CSSProperties = {
  height: "100%"
}
const fix: CSSProperties = {
  height: "200px"
}
const MonthTransactionGraph: React.FC<any> = memo(
  ({ data, onReady }) => {
    var config: any = {
      data,
      padding: 'auto',
      xField: 'formattedDate',
      yField: 'achievedQuota',
      xAxis: {
        // type:"timeCat",
        tickCount: 4,
      },
      slider: {
        start: 0,
        end: 1.0,
      },
      onReady
    };
    return <Line {...config} />;
  },
  (pre, next) => {
    return isEqual(pre?.data, next?.data);
  }
);

const GraphPlot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<Trans[]>([]);
  const [transData, setTransData] = useState<TransResponse[]>([]);
  const [singleData, setSingleData] = useState<Trans>();
  const [myDisplay, setDisplay] = useState<boolean>(false)
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [loading, setLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async(val :number) => {
    console.log(cookies['XSRF-TOKEN'])
    await fetch('/api/transaction/' + val,{
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(()=> asyncFetch())
      .catch(err => console.log(err))
  }

  const columns: TableColumnsType<TransResponse> = [
    { title: 'ID', dataIndex: 'id', key: 'date' },
    { title: 'Amount', dataIndex: 'amount', key: 'name', render: (item) => <div>RM {item}</div> },
    { title: <> {t("date")}</>, dataIndex: "date", key: 'createdAt', render: (item) => <div>{moment(item).format("l")}</div> },

    {
      title: 'Operation',
      dataIndex: 'id',
      key: 'operation',
      render: (id:number) => (
        <div>
          <Button type="primary" >Update</Button>
          <Popconfirm
       title={`delete the task  with id ${id}`}
       description ="Are you sure to delete this task?"
       onConfirm={()=>handleDelete(id)}
       >
       <Button type="primary"  danger style={{ marginLeft: "10px" }}>Delete</Button>
       </Popconfirm>
        
        </div>
      ),
    },
  ];


  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    await fetch('/api/month')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const handleDisplay = (val: boolean) => {
    setDisplay(val)
  }

  const handleDiaplayDefault = () => {
    setDisplay(false)
  }

  const handleGetMonthlyTransaction = async (values: number) => {
    setLoading(true)
    console.log(cookies['XSRF-TOKEN'])
    await fetch('/api/transaction/' + values)
      .then((response) => response.json())
      .then((json) => setTransData(json))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleSingle = (dataObj: Trans) => {

    setSingleData(dataObj)

    handleGetMonthlyTransaction(dataObj.id)
    console.log(dataObj)

  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    console.log(cookies['XSRF-TOKEN'])
    await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
      credentials: 'include'
    })
      .then(res => console.log(res))
      .then(()=>setIsModalOpen(false))
      .then(()=> asyncFetch())
      .catch(err => console.log(err))


  };


  return (
    <div style={{ height: "100%", padding: "20px", overflow: "hidden" }}>

      <Title level={5}><span>Monthly Transaction Graph</span> <span style={{ float: "right" }}><Button type="primary" onClick={showModal}>Add Transaction</Button></span> </Title>

      <div style={myDisplay ? fix : ori}  >
        <MonthTransactionGraph
          data={data}
          onReady={(plot: any) => {
            plot.on('plot:click', (evt: any) => {
              const { x, y } = evt;
              const { xField } = plot.options;
              const tooltipData = plot.chart.getTooltipItems({ x, y });
              handleSingle(tooltipData[0].data)
              handleDisplay(true)
            });
          }}
        />
      </div>

      <Title level={5}>


        <Tooltip title="Close Table">
          <div style={{ float: "left" }}>
            Transaction for Month
          </div>
          <span className="caretStyle"><CaretDownOutlined onClick={handleDiaplayDefault} /></span>
        </Tooltip>

        <div style={{ float: "right" }}>
          {moment(singleData?.formattedDate).format("MMMM YYYY")}
        </div>

      </Title>
      <Table style={{ height: "100%" }}
        dataSource={transData}
        columns={columns}
        loading={loading}
        pagination={{onChange:(page)=>{
    
        },
         pageSize:3,
         }}
      />

      <Modal title={<div>Add Transaction for {moment().format('MMMM Do YYYY')}</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}  >
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600,height:"85px" }}
          initialValues={{ remember: true }}

          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Number only and do not leave the field empty ', pattern: new RegExp(/^[0-9]+$/) }]}
          >
            <Input />
          </Form.Item>

          <Form.Item style={{float:"right"}} >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>



    </div>
  )
}


export default GraphPlot;