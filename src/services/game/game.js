import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const getGame = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game`,
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

export const addGame = async (
  gameName,
  gameIframeURL,
  subscriptionId,
  isCameraRequired,
  isMicrophoneRequired,
  gameCategoryId
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game`,
      {
        gameName: gameName,
        gameIframeURL: gameIframeURL,
        subscriptionId: subscriptionId,
        isCameraRequired: isCameraRequired,
        isMicrophoneRequired: isMicrophoneRequired,
        gameCategoryId: gameCategoryId,
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

export const editGame = async (
  id,
  gameName,
  gameIframeURL,
  subscriptionId,
  isCameraRequired,
  isMicrophoneRequired,
  gameCategoryId
) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game`,
      {
        id: id,
        gameName: gameName,
        gameIframeURL: gameIframeURL,
        subscriptionId: subscriptionId,
        isCameraRequired: isCameraRequired,
        isMicrophoneRequired: isMicrophoneRequired,
        gameCategoryId: gameCategoryId,
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

export const deleteGame = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVICE_URI}/api/admin/game`,
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
