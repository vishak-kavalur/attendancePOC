import React, { useState } from "react";
import {
  Input,
  Space,
  Col,
  Row,
  Upload,
  message,
  Button,
  Modal,
  Divider,
  Progress,
  PageHeader,
  Checkbox,
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DownloadOutlined,
  FileExcelTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

import { addUser, addFaceForUser } from "../services";

const Enrollment = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [isNew, setIsNew] = useState(true);

    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    const [createFile, setCreateFile] = useState();

    function beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
        }
        setCreateFile(file);
        return false;
    }

    // const addImage = () => {
    //   if (!name) {
    //     message.error("Add Name!");
    //     return;
    //   }
    //   if (!createFile) {
    //     message.error("No file added!");
    //     return;
    //   }
      
    // }

    const createUser = () => {
        if (!name) {
            message.error("Add Name!");
            return;
        }
        if (!createFile) {
            message.error("No file added!");
            return;
        }
        setLoading(true);
        // if(!isNew) {
        //   addImage();
        // } else {
        //   addUser(name)
        //     .then((res) => {
        //       addImage();
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     })
        //     .finally(() => {
        //       setLoading(false);
        //       setCreateFile();
        //     });
        // }
        addFaceForUser({ file: createFile }, encodeURIComponent(name))
          .then((res) => {
            console.log(res);
            message.info("Successfully Added!");
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
            setCreateFile();
          });
        
    };

    const onRemove = () => {
        setCreateFile();
    };


    return (
      <PageHeader ghost={false} title="Enroll / Add Image">
        <Divider />
        <h1 style={{ textAlign: "center" }}>
          Add new users or add an image of an existing user
        </h1>
        <br/>
        <Row gutter={16} className="mt5">
          <Col span={6} offset={9} style={{ textAlign: "center" }}>
            <Input
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <br />
            <br />
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              multiple={false}
              beforeUpload={beforeUpload}
              fileList={createFile ? [createFile] : []}
              onRemove={onRemove}
              accept="image/*"
            >
              {createFile && !loading ? "" : uploadButton}
            </Upload>
            <br />
            <br />
            <Button
              type="primary"
              ghost
              onClick={createUser}
              disabled={loading}
              icon={<UploadOutlined />}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </PageHeader>
    );
}

export default Enrollment;