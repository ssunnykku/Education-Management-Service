import styled from "styled-components";
import Body from "../components/Body";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Palette from "../styles/Palette";
import {useEffect, useState} from "react";
import * as Api from "../utils/api.js";

const PointPage = () => {
  const [selected, setSelected] = useState('');
  const [courseInfo, setCourseInfo] = useState({});
  const [courseList, setCourseList] =  useState ([]);
  const [pointHistory, setPointHistory] = useState([]);


  useEffect(() => {
    Api.get('course-list').then((res)=> {
          setCourseList(res.result);
          if (res.result.length > 0) {
            setSelected(res.result[0].courseNumber);
            setCourseInfo(res.result[0]);
          }
    }
    )
  }, []);

  useEffect(()=>{

    Api.get('point-history?courseSeq='+courseInfo.courseSeq).then((res)=>{
      setPointHistory(res.result);
    })
  },[selected,courseInfo])


  const handleSelected = (e) => {
    setSelected(e.target.value);
    courseList.map((data)=>{
      e.target.value.slice(-3) == data.courseNumber ? setCourseInfo(data) : '';
    })
  }

  return <>
    <Header title={"포인트 조회"}></Header>
    <Body>
      <Card align="flex-start">
        <CourseWrapper>
          <select onChange={handleSelected} value={selected}>
            {
              courseList.map(course => (
                <option value={course.courseNumber} key={course.courseNumber} selected={course.selected}>{course.courseNumber}기</option>
              ))
            }
          </select>
          <h1>{courseInfo.courseName}</h1>
          <h2>{courseInfo.startDate} ~ {courseInfo.endDate}</h2>
        </CourseWrapper>
      </Card>
      <Card>
        <PointWrapper>
          <h1>포인트 적립내역</h1>
          <table>
            <thead>
              <tr>
                <td>적립일</td>
                <td>항목</td>
                <td>포인트</td>
              </tr>
            </thead>
            <tbody>
              {pointHistory.map((point, key) => (
                <PointRow date={point.date} category={point.category} point={point.point} key={key}></PointRow>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>총 적립액</td>
                <td></td>
                <td>{pointHistory.reduce((acc, point) => acc + point.point, 0)}</td>
              </tr>
            </tfoot>
          </table>
        </PointWrapper>
      </Card>
    </Body>
    <Footer currentPage="pointPage"></Footer>
  </>;
};

export default PointPage;


const PointRow = ({ date, category, point }) => {
  return (
      <tr>
        <td>{date}</td>
        <td>{category}</td>
        <td>{point}</td>
      </tr>
  )
}


const CourseWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: -0.6153rem;
    margin-bottom: -1.2307rem;
    row-gap: 0.5rem;
    & > select{
      box-sizing: border-box;
      width: 3.589rem;
      height: 1.5384rem;
      font-size: 0.6153rem;
      padding-left: .4rem;
      padding-top: .3rem;
      padding-bottom: .3rem;
      border: 0.01rem solid rgba(0,0,0, 0.2);
      border-radius: 10%;
    }
    & > h1{
      font-size: 1.0256rem;
      font-weight: bold;
    }
    & > h2{
      color: ${Palette.TextSecondary};
      font-size: 0.8205rem;
      font-weight: 500;
    }
  `;
const PointWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 0.8205rem;

    & > h1{
      margin-top: -0.6153rem;
      font-weight: bold;
      font-size: 1.0256rem;
    }

    & > table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.8205rem;
      overflow-y: scroll;
      
      thead td{
        background-color: #E7E7E7;
        border:none;
        padding: 0.5128rem 0;
        font-weight: bold;
      }

      & td{
        max-width: 5.3rem;
        padding: 0.5128rem 0;
      }


      & tr {
        border-bottom: 0.0512rem solid #E7E7E7;
      }
      tfoot tr{
        border-top: 0.1024rem solid #E7E7E7;
        border-bottom: 0.1024rem solid #E7E7E7;

        td{
          font-weight: bold;
        }
      }
    }
    `;
