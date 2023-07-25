import { BASE_URL } from "../../constants";

const getExam = async (studentId: string, examId: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/exams/${examId}/questions`);

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to get exam questions from server!");
    }

    const res1 = await fetch(`${BASE_URL}/exams/${examId}`);

    const data1 = await res1.json();
    if (!res1.ok || data1.err) {
      throw new Error(data1.err || "Failed to get exam details from server!");
    }

    return {
      _id: data1.id,
      name: data1.name,
      startDate: data1.startDate,
      endDate: data1.endDate,
      duration: data1.duration,
      questionCount: data1.questionCount,
      questions: data._embedded.questions,
    };
  } catch (e) {
    throw e;
  }
};

const getAssignedExams = async (userId: string, token: string) => {
  // TODO: handle res.json() error when response not in json

  try {
    const res = await fetch(`${BASE_URL}/exams`);

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to get assigned exams from server!");
    }

    return data._embedded.exams;
  } catch (e) {
    throw e;
  }
};

export { getExam, getAssignedExams };
