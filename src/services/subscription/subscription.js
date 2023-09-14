import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getSubscription = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/subscription`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data, message } = response.data;

    return {
      data,
      message,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const addSubscription = async (subscriptionName) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/subscription`,
      {
        subscriptionName: subscriptionName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message } = response.data;

    return {
      message,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const editSubscription = async (id, subscriptionName) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/subscription`,
      {
        id: id,
        subscriptionName: subscriptionName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message } = response.data;

    return {
      message,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteSubscription = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/subscription`,
      {
        data: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { message } = response.data;

    return {
      message,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};
