import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { data } = await API.post('/auth/login', { email: email, password: password });
            if (data.status == "Success") {
                localStorage.setItem('token', data.token);
                window.location.replace('/');
                toast.success(data.message);
            }

            return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const userRegister = createAsyncThunk(
    "auth/register",
    async ({ e, name, email, password, phone }, { rejectWithValue }) => {
        try {
            e.preventDefault();
            const { data } = await API.post('/auth/register', { name, email, password, phone });
            if (data.status == "Success") {
                window.location.replace('/login');
                toast.success(data.message);
            }
            return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)

export const currentUser = createAsyncThunk(
    'auth/currentUser',
    async ({ rejectWithValue }) => {
        try {
            const { data } = await API.get('/auth/currentUser');
            if (data) return data;
        }
        catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                return rejectWithValue(err.response.data.message);
            }
            else {
                return rejectWithValue(err.message);
            }
        }
    }
)