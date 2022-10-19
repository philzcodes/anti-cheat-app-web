import { GetServerSideProps } from "next";
import { useEffect } from "react";
import Dashboard from "../../components/dashboard/dashboard";
import { getAssignedExams } from "../../helpers/api/exam-api";
import { useAppDispatch } from "../../hooks";
import { AssignedExam, examActions } from "../../store/exam-store";

interface DashboardPageProps {
  exams: AssignedExam[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ exams }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(examActions.setAssignedExams(exams));
  }, [dispatch, exams]);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

const getServerSideProps: GetServerSideProps = async (context) => {
  const assignedExams: AssignedExam[] = await getAssignedExams("1800760308");

  return {
    props: {
      exams: assignedExams,
    },
  };
};

export default DashboardPage;
export { getServerSideProps };