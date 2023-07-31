import { useState, useEffect, memo } from 'react';
import { Line } from '@ant-design/plots';
import { Typography, Table, Button, Tooltip, Modal, Form, Input, Popconfirm } from 'antd';
import moment from 'moment';
import { isEqual } from "lodash-es";
import { CaretDownOutlined } from "@ant-design/icons"
import { useCookies } from 'react-cookie';
import type { TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next'
import { MonthlyTransaction,Trans,TransResponse } from '../Interface/userTransactionInterface';
import { updateTransResponseById,sliceTransResponseById } from '../utils/userTransactionUtils';
const {  Title } = Typography

type DataProps = {
  monthData: MonthlyTransaction[],
  loading: boolean,
  asyncFetch: () => void
  }
  


const MonthTransactionGraph: React.FC<any> = memo(

  ({ data, onReady }) => {
    var config: any = {
      data,
      padding: 'auto',
      xField: 'formattedDate',
      yField: 'achievedQuota',
      xAxis: {
    
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

const GraphPlot: React.FC<DataProps> = ({monthData,asyncFetch}) => {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();
  const [transData, setTransData] = useState<TransResponse[]>([]);
  const [singleData, setSingleData] = useState<Trans>();
  const [updateData, setUpdataData] = useState<TransResponse>()
  const [myDisplay, setDisplay] = useState<boolean>(false)
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [loading, setLoading] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);


  const handleDelete = async (val: number) => {
    console.log(cookies['XSRF-TOKEN'])
    await fetch('/api/transaction/' + val, {
      method: 'DELETE',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 200) {
        setTransData(sliceTransResponseById(transData,val))
        }
      })
      .then(() => asyncFetch())
      .catch(err => console.log(err))
  }

  const columns: TableColumnsType<TransResponse> = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (item) => <div>RM {item}</div> },
    { title: <> {t("date")}</>, dataIndex: "date", key: 'date', render: (item) => <>{moment(item).subtract(1, "month").format("L")}</> },
    {
      title: 'Operation',
      key: 'operation',
      render: (item: TransResponse) => (
        <div>
          <Button type="primary" onClick={() => showModal2(item)} >Update</Button>
          <Popconfirm
            title={`delete the task  with id ${item.id}`}
            description="Are you sure to delete this task?"
            onConfirm={() => handleDelete(item.id)}
          >
            <Button type="primary" danger style={{ marginLeft: "10px" }}>Delete</Button>
          </Popconfirm>

        </div>
      ),
    },
  ];



  const handleDisplay = (val: boolean) => {
    setDisplay(val)
  }

  const handleDiaplayDefault = () => {
    setDisplay(false)
  }

  const handleGetMonthlyTransaction = async (values: any, initial: number) => {
    setLoading(true)
    await fetch(`/api/transaction/${values}/${initial}`)
      .then((response) => response.json())
      .then((json) => setTransData(json))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  const handleGetMonthlyCount = async (values: number) => {
    setLoading(true)
    await fetch(`/api/transaction/count/${values}`)
      .then((response) => response.json())
      .then((json) => setCount(json))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))

  }

  const handleSingle = (dataObj: Trans) => {

    setSingleData(dataObj)

    handleGetMonthlyTransaction(dataObj.id, 1)
    handleGetMonthlyCount(dataObj.id)
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

  const showModal2 = (item: TransResponse) => {
    setIsModalOpen2(true);
    setUpdataData(item);
    form.setFieldsValue({ amount: item.amount })
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
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
      .then(() => form.resetFields())
      .then(() => setIsModalOpen(false))
      .then(() => asyncFetch())
      .catch(err => console.log(err))
  };

  const onUpdate = async (values: any) => {
    console.log(values)
    await fetch(`/api/transaction/${values.id}`, {
      method: 'PUT',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
      credentials: 'include'
    })
      .then((res) => {
        if (res.status === 200) {
          setTransData(updateTransResponseById(transData,values.id, values.amount))
        }
      })
      .then(() => form.resetFields())
      .then(() => setIsModalOpen2(false))
      .then(() => asyncFetch())
      .catch(err => console.log(err))

  }



  return (
    <div style={{ height: "100%", padding: "20px", overflow: "hidden" }}>

      <Title level={5}><span>Monthly Transaction Graph</span> <span style={{ float: "right" }}><Button type="primary" onClick={showModal}>Add Transaction</Button></span> </Title>

      <div style={myDisplay ? {height:"150px"} : {height:"100%"}}  >
        <MonthTransactionGraph
          data={monthData}
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
        pagination={{
          onChange: (page) => {

            handleGetMonthlyTransaction(singleData?.id, page)
          },
          pageSize: 3,
          total: count
        }}
      />

      <Modal title={<div>Add Transaction for {moment().format('MMMM Do YYYY')}</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}  >
        <Form
          name="basic"
          ref={null}
          style={{ maxWidth: 600, height: "85px" }}
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

          <Form.Item style={{ float: "right" }} >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </Modal>

      <Modal title={<div>Update Transaction for {moment(updateData?.date).format('MMMM Do YYYY')}</div>} open={isModalOpen2} onOk={handleOk2} onCancel={handleCancel2} footer={null} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }}  >
        <Form
          form={form}
          name="basic"
          initialValues={{ amount: updateData?.amount, id: updateData?.id }}
          style={{ maxWidth: 600, height: "85px" }}
          onFinish={onUpdate}
          autoComplete="off"
        >
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Number only and do not leave the field empty ', pattern: new RegExp(/^[0-9]+$/) }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="id"
            hidden={true}
          >
            <Input />
          </Form.Item>


          <Form.Item style={{ float: "right" }} >
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