import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getGameCategory = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game-category`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data, message } = response.data;

    return {
      data: data,
      message: message,
      status: response.status,
    };
  } catch (error) {
    throw error;
  }
};

export const addGameCategory = async (categoryName) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game-category`,
      {
        categoryName: categoryName,
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

export const editGameCategory = async (id, categoryName) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game-category`,
      {
        id: id,
        categoryName: categoryName,
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

export const deleteGameCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game-category`,
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
