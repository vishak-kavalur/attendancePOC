import Reactm, { useState } from "react";
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
} from "antd";
import {
  LoadingOutlined,
  PlusOutlined,
  DownloadOutlined,
  FileExcelTwoTone,
  UploadOutlined,
} from "@ant-design/icons";

import { recognizeUser } from "../services";

const Recognition = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

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
        message.error("Image must smaller than 2MB!");
        return false;
      }
      setCreateFile(file);
      return false;
    }

    const verifyUser = () => {
      
      if (!createFile) {
        message.error("No file added!");
        return;
      }
      setLoading(true);
      recognizeUser({ file: createFile })
        .then((res) => {
          console.log(res);
          setUser(res.result[0].subjects[0]);
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
      <div>
        <PageHeader ghost={false} title="Recognition">
          <Divider />
          <h1 style={{ textAlign: "center" }}>
            Upload an image of the exisiting user to verify
          </h1>
          <br/>
          <Row gutter={16} className="mt5">
            <Col span={6} offset={9} style={{ textAlign: "center" }}>
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
                onClick={verifyUser}
                disabled={loading}
              >
                Verify User
              </Button>
            </Col>
          </Row>
          {user.subject && (
            <>
              {user.similarity >= 0.85 ? (
                <h1>
                  {user.subject} - {user.similarity * 100} %
                </h1>
              ) : (
                <h1>No match found!</h1>
              )}
            </>
          )}
        </PageHeader>
      </div>
    );
}

export default Recognition;