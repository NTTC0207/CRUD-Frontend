import { useState, useEffect, memo ,CSSProperties } from 'react';
import { Line } from '@ant-design/plots';
import { Typography, Table ,Button ,Tooltip } from 'antd';
import moment from 'moment';
import { isEqual } from "lodash-es";
import { setDefaultNamespace } from 'i18next';
import {CaretDownOutlined } from "@ant-design/icons"
const { Text, Title } = Typography


interface Trans {
  id: number
  Date: string
  scales: number
}

const ori :CSSProperties={
  height:"100%"
}
const fix :CSSProperties={
  height:"200px"
}

const MonthTransactionGraph: React.FC<any> = memo(
  ({ data, onReady }) => {
    var config: any = {
      data,
      padding: 'auto',
      xField: 'Date',
      yField: 'scales',
      xAxis: {
        // type:"timeCat",
        tickCount: 4,
      },
      slider: {
        start: 0.5,
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

  const [data, setData] = useState<Trans[]>([]);
  const [singleData, setSingleData] = useState<Trans>();
  const [myDisplay, setDisplay] = useState<boolean>(false)


  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const handleDisplay = (val:boolean) => {
    setDisplay(val)
  }

  const handleDiaplayDefault = () => {
    setDisplay(false)
  }


  const handleSingle = (dataObj: Trans) => {

    setSingleData(dataObj)
  }

  return (
    <div style={{ height: "100%", padding: "20px", overflow: "hidden" }}>

      <Title level={5}>Monthly Transaction Graph </Title>

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
        <div style={{float:"left"}}>
        Transaction for Month 
        </div>
       <span className="caretStyle"><CaretDownOutlined onClick={handleDiaplayDefault}  /></span>
       </Tooltip>
      
     <div style={{float:"right"}}>
     {moment(singleData?.Date).format("MMMM YYYY")} 
      </div> 
    
         </Title>
      <Table style={{ height: "100%" }} />



    </div>
  )
}


export default GraphPlot;