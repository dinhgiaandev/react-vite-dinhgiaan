// import axios from "axios";
import axios from './axios.customize';

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = '/api/v1/user';
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = '/api/v1/user';
    const data = {
        _id,
        fullName,
        phone
    }
    return axios.put(URL_BACKEND, data)
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = '/api/v1/file/upload';
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }

    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file);

    return axios.post(URL_BACKEND, bodyFormData, config);
}

const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
    const URL_BACKEND = '/api/v1/user';
    const data = {
        _id,
        avatar,
        fullName,
        phone
    }
    return axios.put(URL_BACKEND, data)
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = '/api/v1/user/register';
    const data = {
        fullName,
        email,
        password,
        phone
    }
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = '/api/v1/auth/login';
    const data = {
        //ở đây cần phải ghi thêm username và password giống key API mới có thể vào đc
        username: email,
        password: password,
        delay: 3000
    }
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = '/api/v1/auth/account';
    return axios.get(URL_BACKEND);
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

export {
    createUserAPI, fetchAllUserAPI, updateUserAPI, deleteUserAPI, handleUploadFile, updateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI
}