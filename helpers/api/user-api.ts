import { BASE_URL } from "../../constants";

const getUser = async (id: string, password: string) => {
  try {
    const credentials = {
      id: id,
      password: password,
    };
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok || data.err) {
      const data = await res.json();
      throw new Error(data.err || "Failed to signin user!");
    }

    return {
      id: data?.id,
      fname: data?.fname,
      lname: data?.lname,
      token: data?.token,
    };
  } catch (e) {
    throw new Error(e.message || "Failed to signin user!");
  }
};

const submitExam = async (
  studentId: string,
  examId: string,
  answers: string[],
  token: string
) => {
  try {
    // const res = await fetch(`${BASE_URL}/submitExam/${studentId}`, {
    //   method: "POST",
    //   body: JSON.stringify({ examId, answers }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    const details = {
      examId: examId,
      answers: answers.toString(),
    };
    const res = await fetch(`${BASE_URL}/admin/submitExam/${studentId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });

    // const data = await res.json();

    // if (!res.ok || data.err) {
    //   //throw new Error(data.err || "Failed to submit exam!");
    // }

    // return data;
  } catch (e) {
    throw e;
  }
};

export { getUser, submitExam };
