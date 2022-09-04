
import axios from 'axios';

export const chatAPI = {
    createRoom: function (data) {
      return axios.post(`/api/chat/rooms`, data);
    },
    getChatList: function () {
      return axios.get(`/api/chat/rooms`);
    },
    getChatMessages: function (roomId) {
      return axios.get(`/api/chat/rooms/${roomId}/messages`);
    },
    selectCategory: function (category) {
      return axios.get(`/api/chat/rooms/search/${category}`);
    }
  };