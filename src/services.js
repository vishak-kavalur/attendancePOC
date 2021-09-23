import axios from "axios";
import { RECOGNITION_KEY, BASE_URL } from "./util.js";
import {message} from 'antd';

const getFormData = (object) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export const getUsers = () => {
  return axios
    .get(`${BASE_URL}/recognition/subjects/`, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": RECOGNITION_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
        return err;
    });
};

export const getAllFaces = () => {
  return axios
    .get(`${BASE_URL}/recognition/faces?size=1000`, {
      headers: {
        "x-api-key": RECOGNITION_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getFaces = (id) => {
  return axios
    .get(`${BASE_URL}/recognition/faces/${id}/img`, {
      headers: {
        "x-api-key": RECOGNITION_KEY,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};

export const addUser = (subject) => {
    return axios
        .post(
            `${BASE_URL}/recognition/subjects`,
            {subject},
            {
                headers: { "x-api-key": RECOGNITION_KEY},
            }
        )
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            const { status, headers } = (err || {}).response || {};
            message.error("User already exists");
        });
};

export const addFaceForUser = (payload, subject) => {
    const fromData = getFormData(payload);
    return axios
      .post(`${BASE_URL}/recognition/faces?subject=${subject}`, 
      fromData,
      {
        headers: {
          "x-api-key": RECOGNITION_KEY,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        const { status, headers } = (err || {}).response || {};
        message.error("Something went wrong. Try Again");

      });
};

export const recognizeUser = (payload) => {
  const fromData = getFormData(payload);
  return axios
    .post(`${BASE_URL}/recognition/recognize`, fromData, {
      headers: {
        "x-api-key": RECOGNITION_KEY,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status, headers } = (err || {}).response || {};
      message.error("Something went wrong. Try Again");
    });
};

export const deleteSingleUser = (name) => {
  return axios
    .delete(`${BASE_URL}/recognition/subjects/${name}`, {
      headers: {
        "x-api-key": RECOGNITION_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status, headers } = (err || {}).response || {};
      message.error("Something went wrong. Try Again");
    });
};

export const deleteAllUsers = () => {
  return axios
    .delete(`${BASE_URL}/recognition/subjects/`, {
      headers: {
        "x-api-key": RECOGNITION_KEY,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status, headers } = (err || {}).response || {};
      message.error("Something went wrong. Try Again");
    });
};
