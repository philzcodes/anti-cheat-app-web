import { BASE_URL } from "../../constants";

const getExam = async (studentId: string, examId: string, token: string) => {
  // try {
  //   const res = await fetch(`${BASE_URL}/${studentId}/exam/${examId}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data = await res.json();

  //   if (!res.ok || data.err) {
  //     throw new Error(data.err || "Failed to get exam from server!");
  //   }

  //   return data;
  // } catch (e) {
  //   throw e;
  // }
  try {
    const res = await fetch(`http://localhost:8080/exams/${examId}/questions`);

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to get exam from server!");
    }

    const res1 = await fetch(`http://localhost:8080/exams/${examId}`);

    const data1 = await res1.json();

    return {
      _id: data1._embedded.exams.id,
      name: data1._embedded.exams.name,
      startDate: data1._embedded.exams.startDate,
      endDate: data1._embedded.exams.endDate,
      duration: data1._embedded.exams.duration,
      questionCount: data1._embedded.exams.questionCount,
      questions: data._embedded.questions,
    };
  } catch (e) {
    throw e;
  }

  // return {
  //   _id: "exam1",
  //   name: "Sample Exam",
  //   startDate: "2023-07-21T09:00:00",
  //   endDate: "2023-07-21T10:00:00",
  //   duration: 60,
  //   questionCount: 3,
  //   questions: [
  //     {
  //       title: "What is the capital of France?",
  //       options: ["London", "Berlin", "Paris", "Madrid"],
  //     },
  //     {
  //       title: "Which planet is known as the 'Red Planet'?",
  //       options: ["Mars", "Jupiter", "Venus", "Saturn"],
  //     },
  //     {
  //       title: "What is 2 + 2?",
  //       options: [2, 3, 4, 5],
  //     },
  //   ],
  // };
};

const getAssignedExams = async (userId: string, token: string) => {
  // TODO: handle res.json() error when response not in json

  // try {
  //   const res = await fetch(`${BASE_URL}/${userId}/assignedExams/all`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   const data = await res.json();

  //   if (!res.ok || data.err) {
  //     throw new Error(data.err || "Failed to get assigned exams from server!");
  //   }

  //   return data.exams;
  // } catch (e) {
  //   throw e;
  // }

  try {
    const res = await fetch("http://localhost:8080/exams");

    const data = await res.json();

    if (!res.ok || data.err) {
      throw new Error(data.err || "Failed to get assigned exams from server!");
    }

    return data._embedded.exams;
  } catch (e) {
    throw e;
  }

  // return [
  //   {
  //     _id: "exam1",
  //     questionCount: 20,
  //     name: "Mathematics Quiz",
  //     startDate: "2023-07-21T09:00:00",
  //     endDate: "2023-07-21T10:00:00",
  //     duration: 60,
  //     status: "in_progress",
  //   },
  //   {
  //     _id: "exam2",
  //     questionCount: 15,
  //     name: "Science Test",
  //     startDate: "2023-07-22T14:30:00",
  //     endDate: "2023-07-22T15:30:00",
  //     duration: 60,
  //     status: "completed",
  //   },
  //   {
  //     _id: "exam3",
  //     questionCount: 30,
  //     name: "History Quiz",
  //     startDate: "2023-07-23T11:00:00",
  //     endDate: "2023-07-23T12:00:00",
  //     duration: 60,
  //     status: "not_started",
  //   },
  // ];
};

export { getExam, getAssignedExams };
