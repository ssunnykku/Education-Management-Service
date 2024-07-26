
import styled, { keyframes } from "styled-components";
import Body from "../components/Body";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {useEffect, useState} from "react";
import * as Api from "../utils/api.js";

const CourseCardWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 1.0256rem;
    padding: 0 0.6153rem;
    margin: -0.6153rem 0;
  `;
const CourseTitle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 0.5128rem;
    & > h2{
      width: 100%;
      text-align: left;
      font-size: 0.8205rem;
      font-weight: bold;
      color: #999999;
    }
    & > h2.current{
      color: #5C7CFA;
    }
     & > h1{
      width: 100%;
      text-align: left;
      font-size: 0.9rem;
      font-weight: bold;

      word-break: keep-all;
      
     }
  `;

const ProgressWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    & > span{
      margin-left: 1rem;
      font-weight: bold;
    }
  `;

const CourseCard = ({ course }) => {
  const attendanceRate =
    (course.attendanceDays / course.totalTrainingDays) * 100;
  const statusKr =
    course.status == -1
      ? '수강 취소'
      : course.status == 0
      ? '현재 수강중'
      : '수료 완료';

  return (
    <Card>
      <CourseCardWrapper>
        <CourseTitle>
          <h2 className={course.status == 0 ? 'current' : ''}>{statusKr}</h2>
          <h1>
            {course.courseNumber}기 {course.courseName}
          </h1>
          <h2>
            {course.startDate} ~ {course.endDate}
          </h2>
        </CourseTitle>

        {course.status == 0 ? <ProgressWrapper><ProgressBar val={attendanceRate}></ProgressBar><span>{attendanceRate.toFixed(1)}%</span></ProgressWrapper> : null}

        <BasicInfoTable>
          <BasicInfoRow>
            <span>구분</span>
            <span>{course.courseType}</span>
          </BasicInfoRow>
          <BasicInfoRow>
            <span>교육 과목</span>
            <span>{course.subject}</span>
          </BasicInfoRow>
          <BasicInfoRow>
            <span>총 교육일수</span>
            <span>{course.totalTrainingDays}일</span>
          </BasicInfoRow>
          <BasicInfoRow>
            <span>일일 교육시간</span>
            <span>{course.trainingHoursPerDay}시간</span>
          </BasicInfoRow>
          <BasicInfoRow>
            <span>강사명</span>
            <span>{course.professorName}</span>
          </BasicInfoRow>
        </BasicInfoTable>
      </CourseCardWrapper>
    </Card>
  );
};

const progressAnimation = (val) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${val}%;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  border: 0.05128rem solid #999999;
  height: ${({ height }) => height}rem;
  border-radius: ${({ height }) => height}rem;

  div {
    height: 100%;
    width: 0%; /* Initial width */
    border-radius: ${({ height }) => height}rem;
    background-color: #5c7cfa;
    animation: ${({ val }) => progressAnimation(val)} 2s ease-out forwards; /* Adding 'forwards' to maintain final state */
  }
`;

const ProgressBar = ({ height = '1.0256', val }) => {
  return (
      <ProgressBarWrapper height={height} val={val}>
        <div></div>
      </ProgressBarWrapper>
  );
};

const CoursePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    Api.get('course-list').then((res) => {
      setCourses(res.result);
    });
  }, []);

  return (
    <>
      <Header title="수강 이력"></Header>
      <Body>
        {courses.map((course) => (
          <CourseCard course={course} key={course.courseNumber}></CourseCard>
        ))}
      </Body>
      <Footer currentPage="coursePage"></Footer>
    </>
  );
};

export default CoursePage;

const BasicInfoTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.5128rem;
  font-size: 0.8205rem;
`;
const BasicInfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & span:first-child {
    font-weight: bold;
  }
`;
