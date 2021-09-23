import React, {useEffect, useState} from "react";
import {
  getUsers,
  getAllFaces,
  deleteAllUsers,
  deleteSingleUser,
} from "../services";
import {
  PageHeader,
  Button,
  Divider,
  Descriptions,
  Popconfirm,
  message,
} from "antd";
import { RECOGNITION_KEY, BASE_URL } from "../util.js";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [faces, setFaces] = useState({});

    const initPage = () => {
      getUsers().then((data) => {
        setUsers(data.subjects);
      });

      getAllFaces().then((data) => {
        let obj = {};
        data.faces?.forEach((subject) => {
          if (obj[subject.subject]) {
            obj[subject.subject].push(subject.image_id);
          } else {
            obj[subject.subject] = [subject.image_id];
          }
        });
        setFaces(obj);
        console.log(obj);
      });
    }
    
    useEffect(() =>{
       initPage();
    },[])

    const deleteAll = () => {
        deleteAllUsers().then((data) => {
          console.log(data);

          initPage();
          message.info(`All users removed successfully!`);
        });
    }


    const deleteUser = (user) => {
      deleteSingleUser(encodeURIComponent(user)).then((data) => {
        console.log(data);

        initPage();
        message.info(`${user} removed successfully!`);
      });
    }


    return (
      <div>
        <PageHeader
          ghost={false}
          title="Users"
          subTitle="All enrolled users"
          extra={[
            <Popconfirm
              title="Are you sure want to delete all the users?"
              onConfirm={deleteAll}
              okText="Yes"
              cancelText="No"
              disabled={!users?.length}
            >
              <Button key="1" danger disabled={!users?.length}>
                Delete All
              </Button>
            </Popconfirm>,
          ]}
        >
          <Divider />
          <Descriptions title="User Info" bordered column={2} size="small">
            {!users?.length && <h1>No Users present</h1>}
            {users?.length &&
              users?.map((user, i) => (
                <Descriptions.Item label={user} key={i}>
                  {faces[user] &&
                    faces[user].map((face, j) => (
                      <li key={j}>
                        <a
                          href={`${BASE_URL}/static/${RECOGNITION_KEY}/images/${face}`}
                          target="_blank"
                        >
                          Image {j + 1}
                        </a>
                      </li>
                    ))}
                  <li>
                    <Popconfirm
                      title="Are you sure want to delete this user?"
                      onConfirm={() => deleteUser(user)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link" danger style={{ float: "right" }}>
                        Delete user
                      </Button>
                    </Popconfirm>
                  </li>
                </Descriptions.Item>
              ))}
          </Descriptions>
        </PageHeader>
      </div>
    );
}

export default Users;