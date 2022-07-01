// Import React
import React, { useEffect, useState } from "react";
import axios from "axios";

// Import Ant Design's Components
import "antd/dist/antd.css";
import {
  Layout,
  Table,
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";
import { Content } from "antd/lib/layout/layout";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

// Cattle Data Page
export default function CattleData() {
  // Create Column's Table
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      width: 75,
    },
    {
      title: "RFID",
      dataIndex: "rfid",
      key: "rfid",
    },
    {
      title: "Cattle Code",
      dataIndex: "cattle_code",
      key: "cattle_code",
    },
    {
      title: "Device ID",
      dataIndex: "dev_id",
      key: "dev_id",
    },
    {
      title: "Action",
      key: "action",
      width: 125,
      render: (text, record, index) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModals(record)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showDeleteConfirm(text.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // Data Table
  const [dataCattle, setDataCattle] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const [input, setInput] = useState({
    id: 0,
    rfid: 0,
    dev_id: "",
    cattle_code: "",
  });

  // Modals
  const [visibleModals, setVisibleModals] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentId, setCurrentId] = useState(-1);
  const [fetchStatus, setFetchStatus] = useState(false);
  const [modalText, setModalText] = useState("Content of the Modal");

  // input biar disimpen disini
  const [i_cattlecode, seti_cattlecode] = useState("");
  const [i_RFID, seti_RFID] = useState(0);
  const [i_deviceid, seti_deviceid] = useState("");

  const showModals = () => {
    setVisibleModals(true);
  };

  // Fetch Data API
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3003/cattle`)
      .then((response) => response.data)
      .then((data) => {
        setDataCattle(data);

        console.log("Data Cattle = ", data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });

    if (fetchStatus) {
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  // Submit Form
  const handleSubmit = (event) => {
    event.preventDefault();
    // let { id, rfid, dev_id, cattle_code } = input;
    // let dataId = parseInt(event.target.value)

    // setInput({
    //   id: 202,
    //   rfid: 2019178,
    //   dev_id: "cobain",
    //   cattle_code: "QS",
    // });

    setModalText("Your Data is being Submitted, wait for a minute");
    setConfirmLoading(true);

    if (currentId === -1) {
      axios
        .post(`http://localhost:3003/cattle`, {
          id: input.id,
          rfid: input.rfid,
          dev_id: input.dev_id,
          cattle_code: input.cattle_code,
        })
        .then((response) => {
          // setDataCattle([...dataCattle])

          console.log("Ini isi");
          console.log(input.rfid);
        })
        .catch((err) => {
          console.log(err);
        });

      setTimeout(() => {
        setVisibleModals(false);
        setConfirmLoading(false);
        setFetchStatus(true);

        console.log("A New Cattle Data has been created successfully!");
      }, 2000);
    } else {
      axios
        .put(`http://localhost:3003/cattle/${currentId}`, {
          rfid: input.rfid,
          dev_id: input.dev_id,
          cattle_code: input.cattle_code,
        })
        .then(() => {
          setFetchStatus(true);
          setDataCattle([...dataCattle]);
        });
    }

    setCurrentId(-1);
  };

  useEffect(() => {
    setInput({
      rfid: i_RFID,
      dev_id: i_deviceid,
      cattle_code: i_cattlecode,
    });
  }, [i_RFID, i_cattlecode, i_deviceid]);

  // Handle Change
  //   const handleChange = (event) => {
  //       let {name, value} = event.target;
  //       setInput({...input, [name] : value});
  //       setInput
  //   }

  // Cancel Form
  const handleCancel = () => {
    console.log("Data Creation Cancelled");
    setVisibleModals(false);
  };

  // Handle Delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3003/cattle/${id}`)
      .then((result) => {
        setFetchStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Delete Data
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure want to delete this data?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",

      onOk() {
        handleDelete(id);
        console.log("Data Has Been Deleted Successfully!");
      },

      onCancel() {
        console.log("Data Deletion Cancelled");
      },
    });
  };

  return (
    <>
      <Layout>
        <Content style={{ padding: 30, margin: 1 }}>
          <h1>Cattle Data RFID</h1>

          <Table
            columns={columns}
            dataSource={dataCattle}
            bordered={true}
            scroll={{
              x: 1000,
            }}
            rowClassName={(record) => (record.status > 1 ? "red" : "green")}
          />

          <Divider />

          <Button
            type="primary"
            shape="round"
            onClick={showModals}
            block
            size="large"
            style={{
              fontWeight: "bolder",
              placeContent: "center",
            }}
          >
            Add a New Cattle Data
          </Button>

          <Modal
            title="Create A New Cattle Data"
            visible={visibleModals}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            onOk={handleSubmit}
          >
            <Form
              onFinish={
                (handleSubmit,
                function (evt) {
                  console.log(evt);
                })
              }
            >
              <Form.Item
                label="Cattle Code"
                name="cattle_code"
                rules={[
                  {
                    required: true,
                    message: "Input Cattle Code QS (for cow) or QD (for lamb)",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Input Cattle Code QS (for cow) or QD (for lamb)"
                  onChange={function (evt) {
                    seti_cattlecode(evt.target.value);
                  }}
                  //   value={record.cattle_code}
                />
              </Form.Item>
              <Form.Item
                label="RFID"
                name="rfid"
                rules={[
                  {
                    required: true,
                    message: "Input the RFID number",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="RFID consists of 8 unique numbers"
                  onChange={function (evt) {
                    seti_RFID(evt);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Device ID"
                name="dev_id"
                rules={[
                  {
                    required: true,
                    message: "Input Device ID",
                  },
                ]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Choose between Board_1 or Board_2"
                  onChange={function (evt) {
                    seti_deviceid(evt.target.value);
                  }}
                />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </>
  );
}
