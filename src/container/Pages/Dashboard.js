// Import Dependencies
// import { QurbanContext } from "../../Context/QurbanContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from 'react-router-dom';

// Import Ant Design's Components
import { Card, Col, Layout, Row, Spin, Table, Tag } from "antd";
import { Content } from "antd/lib/layout/layout";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";

// Import CSS
import "antd/dist/antd.css";
import "./Dashboard.css";

// Create Styles
const styles = {
  textAlign: "center",
  fontSize: "25px",
  color: "#096dd9",
};

// Create Table's Columns
const columns = [
  {
    title: "No",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Device ID",
    dataIndex: "dev_id",
    key: "dev_id",
    filters: [
      {
        text: "Board 1",
        value: "Board_1",
      },
      {
        text: "Board 2",
        value: "Board_2",
      },
    ],
    onFilter: (value, record) => record.dev_id.indexOf(value) === 0,
  },
  {
    title: "Message ID",
    dataIndex: "msg_id",
    key: "msg_id",
    sorter: (a, b) => a.msg_id - b.msg_id,
  },
  {
    title: "Time Stamp",
    dataIndex: "timestamp",
    key: "timestamp",
    sorter: (a, b) => a.timestamp - b.timestamp,
  },
  {
    title: "RFID",
    dataIndex: "rfid",
    key: "rfid",
    // filters: [
    //     {

    //     }
    // ]
    // onFilter: (value, record) => record.rfid.indexOf(value) === 0,
  },
  {
    title: "Cattle Code",
    dataIndex: "cattle_code",
    key: "cattle_code",
    filters: [
      {
        text: "Cow",
        value: "QS",
      },
      {
        text: "Lamb",
        value: "QD",
      },
    ],
    onFilter: (value, record) => record.cattle_code.indexOf(value) === 0,
  },
  {
    title: "Weight (kg)",
    dataIndex: "weight",
    key: "weight",
    sorter: (a, b) => a.weight - b.weight,
  },
  {
    title: "Temperature (Celcius)",
    dataIndex: "temp",
    key: "temp",
    sorter: (a, b) => a.temp - b.temp,
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    filters: [
      {
        text: "Valid Data",
        value: "valid data",
      },
      {
        text: "Invalid Data",
        value: "invalid data",
      },
    ],
    onFilter: (value, record) => record.tags.indexOf(value) === 0,
    render: (_, record, tags) =>
      record.tags === "valid data" ? (
        <Tag color={"geekblue"}>VALID DATA</Tag>
      ) : (
        <Tag color={"volcano"}>INVALID DATA</Tag>
      ),
  },
  {
    title: "Source",
    dataIndex: "",
    key: "",
    filters: [
      {
        text: "Device",
        value: "1",
      },
      {
        text: "Human",
        value: "2",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (_, record) =>
      record.status > 1 ? <UserOutlined /> : <LaptopOutlined />,
  },
];

export default function Dashboard({ props }) {
  // const { dataQurban, setDataQurban } = useState([]);

  const [loading, setLoading] = useState(false);
  const [dataQurban, setDataQurban] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/qurban`)
    //  .get(`http://192.168.0.100:8080/api/mqttmessages`)
      .then((response) => response.data)
      .then((data) => {
        setDataQurban(data);
        setFetchStatus(false);

        let uniqueRFID = [...new Set(data.map((item) => item.rfid))];
        console.log("UNIQUE RFID = ", uniqueRFID);

        // console.log("Data = ", data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    let interval = setInterval(() => {
      axios
        .get(`http://localhost:3000/qurban`)
        //.get(`http://192.168.0.100:8080/api/mqttmessages`)
        .then((response) => response.data)
        .then((data) => {
          setDataQurban(data);
          console.log("Interval", data);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [fetchStatus, setFetchStatus]);

  // console.log(dataQurban);

  return (
    <>
      <Layout>
        <Content style={{ padding: 30, margin: 1 }}>
          <Row justify="space-between">
            {/* <Card> */}
            <Col xs={20} xl={4}>
              <Card title="Total Data" bordered={true} style={styles}>
                100
              </Card>
            </Col>
            <Col xs={20} xl={4}>
              <Card title="Total Valid Data" bordered={true} style={styles}>
                65
              </Card>
            </Col>
            <Col xs={20} xl={4}>
              <Card title="Total Invalid Data" bordered={true} style={styles}>
                35
              </Card>
            </Col>
            {/* </Card> */}

            {/* <Card> */}
            <Col xs={20} xl={4}>
              <Card title="Jumlah Sapi" bordered={true} style={styles}>
                5/25
              </Card>
            </Col>
            <Col xs={20} xl={4}>
              <Card title="Jumlah Domba" bordered={true} style={styles}>
                25/75
              </Card>
            </Col>
            {/* </Card> */}
          </Row>
        </Content>

        <Content style={{ padding: 30, margin: 1 }}>
          <h1>Tabel Hewan Qurban</h1>

          <Table
            columns={columns}
            dataSource={dataQurban}
            // loading={{ indicator: <div><Spin /></div>, spinning:!dataQurban }}
            bordered={true}
            scroll={{
              x: 1500,
            }}
            rowClassName={(record) =>
              record.tags === "invalid data" ? "red" : "green"
            }
            style={styles}
            // data={props}
          />
        </Content>
      </Layout>
    </>
  );
}
