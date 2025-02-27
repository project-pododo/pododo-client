import axios from "axios";

// 기본 API URL 설정
const api = axios.create({
  baseURL: "http://localhost:8081/api/v1", // API 서버의 기본 URL
  headers: {
    "Content-Type": "application/json",
    Authorization: "pododo!12", // 비밀키
  },
});

export const getTestData = async () => {
  try {
    const response = await api.get("/todo/test");
    return response.data;
  } catch (error) {
    console.error("API 호출 오류:", error);
    throw error;
  }
};
