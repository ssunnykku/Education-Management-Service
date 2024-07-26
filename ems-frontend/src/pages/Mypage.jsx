import styled from 'styled-components';
import Body from '../components/Body';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Header from '../components/Header';
import FullPageModal from '../components/FullPageModal';
import InputBasic from '../components/InputBasic';
import { useEffect, useRef, useState } from 'react';
import * as Api from "../utils/api.js";
import * as Utils from "../utils/utils.js";

const TimeTable = ({ open, close }) => {

  const TimeTableWrapper = styled.div`
    display: flex;
    column-gap: 1rem;
    height: 2.6667rem;

    font-size: 0.8205rem;
  `;
  const TimeColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin: 0;
    div {
      padding: 0 0.48rem;
      margin: 0;
    }
    div:last-child{
      height: 0.0943rem;
    }
    hr {
      color: #e7e7e7;
    }
  `;
  return (
    <TimeTableWrapper>
      <TimeColumn>
        <div>입실</div>
        <hr />
        <div>{open}</div>
      </TimeColumn>
      <TimeColumn>
        <div>퇴실</div>
        <hr />
        <div>{close}</div>
      </TimeColumn>
    </TimeTableWrapper>
  );
};

const BlueBtn = styled.button`
  background-color: #5c7cfa;
  width: 5.128rem;
  height: 1.641rem;
  border-radius: 0.307rem;
  color: white;
  font-size: 0.7194rem;

  &.disabled{
    background-color: #999999;
  }
`;

// 모달
const EditStudentInfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & span {
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }
`;

const Mypage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let phoneNumber = formData.get("phoneNumber");
    formData.delete("phoneNumber");
    formData.append("phoneNumber", phoneNumber.replace(/-/g, ""));
    Api.put("student", formData).then(res => {
      if (res.result == false) {
        setErrorMessage("비밀번호가 잘못되었습니다.");
      }else{
        updateStudnetInfo();
        setErrorMessage("");
      }
    }).catch(err => console.error(err));

  }
  function updateStudnetInfo() {
    Api.get("student").then(res => {
      setStudent({
        name: res.result.name,
        hrdNetId: res.result.hrdNetId,
        birthDate: res.result.birth,
        phoneNumber: Utils.addHyphenToPhoneNumber(res.result.phoneNumber),
        bank: res.result.bank,
        accountNumber: res.result.account,
        email: res.result.email
      });
    })
  }
  function initAttendanceTimeCard() {
    const promises = [Api.get("current-course"), Api.get("time")];
    Promise.all(promises).then(([courseRes, timeRes]) => {
      if (courseRes.result == false) {
        throw new Error("현재 수강중인 과정이 없습니다.");
      }
      setCurrentCourse({
        courseName: courseRes.result.courseName,
        courseStartDate: courseRes.result.courseStartDate,
        courseEndDate: courseRes.result.courseEndDate
      });
      setTimes({
        inTime: timeRes.result.inTime,
        outTime: timeRes.result.outTime
      });
    }).catch(err => {
      //카드 비우기
    })
  }
  const [currentCourse, setCurrentCourse] = useState({
    courseName: "현재 수강중인 코스가 없습니다.",
    courseStartDate: "",
    courseEndDate: ""
  });
  const [times, setTimes] = useState({
    inTime: "",
    outTime: ""
  });
  const [student, setStudent] = useState(
    {
      name: "로그인 필요",
      hrdNetId: "로그인 필요",
      birthDate: "0000.00.00",
      phoneNumber: "01000000000",
      bank: "테스트은행",
      accountNumber: "000000000000",
      email: "test@test.com"
    }
  );
  function onChangeInput(e){
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }
  const [errorMessage, setErrorMessage] = useState();
  const ErrorMessage = styled.div`
    width: 100%;
    height: 1rem;
    font-size: 0.8rem;
    margin: 0.6rem 0 -0.6rem 0;
    color: red;
    display: flex;
    text-align: left;

  `;
  function handleAttendanceBtn() {
    //입실버튼
    if (times.inTime == null) {
      console.log("입실");
      Api.post("in-time").then(res => {
        if (res.result) {
          updateTimeStatus();
        } else {
          throw new Error("입실 등록에 실패하였습니다.");
        }
      })
    } else if (times.outTime == null) {
      Api.post("out-time").then(res => {
        if (res.result) {
          updateTimeStatus();
        } else {
          throw new Error("퇴실 등록에 실패하였습니다.");
        }
      })
    }
    //퇴실버튼
  }
  function updateTimeStatus() {
    Api.get("time").then(res => {
      setTimes({
        inTime: res.result.inTime,
        outTime: res.result.outTime
      })
    })
  }
  useEffect(() => {
    updateStudnetInfo();
    initAttendanceTimeCard();
  }, []);
  return (
    <>
      <Header title={'마이페이지'}></Header>
      <Body>
        <Card>
          <BasicInfoTable>
            <StudentInfoRow>
              <span>이름</span>
              <span>{student.name}</span>
            </StudentInfoRow>
            <StudentInfoRow>
              <span>HRD Net ID</span>
              <span>{student.hrdNetId}</span>
            </StudentInfoRow>
            <StudentInfoRow>
              <span>생년월일</span>
              <span>{student.birthDate}</span>
            </StudentInfoRow>
            <StudentInfoRow>
              <span>전화번호</span>
              <span>{Utils.addHyphenToPhoneNumber(student.phoneNumber)}</span>
            </StudentInfoRow>
          </BasicInfoTable>
          <EditBtn popovertarget="editModal">내 정보 수정하기</EditBtn>
        </Card>
        <Card>
          <Title>출석 입력</Title>
          <AttendanceCardBody>
            <div>
              <h1>{currentCourse.courseName}</h1>
              <h2>{currentCourse.courseStartDate} ~ {currentCourse.courseEndDate}</h2>
            </div>
            <TimeTable open={times.inTime && times.inTime.slice(0, -3)} close={times.outTime && times.outTime.slice(0, -3)}></TimeTable>
            <BlueBtn type='button' onClick={handleAttendanceBtn} className={times.outTime != null && 'disabled'} disabled={times.outTime != null}>{times.outTime != null ? "출석 완료" : times.inTime != null ? "퇴실" : "입실"}</BlueBtn>
          </AttendanceCardBody>
        </Card>
      </Body>
      <Footer currentPage="mypage"></Footer>

      <FullPageModal id="editModal">
        <Card>
          <BasicInfoTable>
            <EditStudentInfoRow>
              <span>이름</span>
              <span>{student.name}</span>
            </EditStudentInfoRow>
            <EditStudentInfoRow>
              <span>HRD Net ID</span>
              <span>{student.hrdNetId}</span>
            </EditStudentInfoRow>
            <EditStudentInfoRow>
              <span>생년월일</span>
              <span>{student.birthDate}</span>
            </EditStudentInfoRow>
          </BasicInfoTable>
        </Card>
        <Card>
          <form action='/mypage' onSubmit={handleSubmit}>
            <BasicInfoTable>
              <EditStudentInfoRow>
                <span>전화번호</span>
                <InputBasic
                  height="1.8461"
                  width="7.7rem"
                  value={Utils.addHyphenToPhoneNumber(student.phoneNumber)}
                  type="tel"
                  title="전화번호 입력 형식이 맞지 않습니다. 다시한번 확인하시고 직원에게 문의하여주십시오."
                  name="phoneNumber"
                  onChange={onChangeInput}
                  required
                ></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>은행</span>
                <InputBasic
                  height="1.8461"
                  width="7.7rem"
                  value={student.bank}
                  onChange={onChangeInput}
                  name="bank"
                  required
                ></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>계좌번호</span>
                <InputBasic
                  height="1.8461"
                  width="7.7rem"
                  value={student.accountNumber}
                  onChange={onChangeInput}
                  name="accountNumber"
                  type='bankAccount'
                  required
                ></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>이메일</span>
                <InputBasic
                  height="1.8461"
                  width="7.7rem"
                  value={student.email}
                  onChange={onChangeInput}
                  name="email"
                  type="email"
                  required
                ></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>현재 비밀번호</span>
                <InputBasic height="1.8461" type='password' width="7.7rem" name="currentPassword" required></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>새 비밀번호</span>
                <InputBasic height="1.8461" type='password' name="newPassword" width="7.7rem"></InputBasic>
              </EditStudentInfoRow>
              <EditStudentInfoRow>
                <span>비밀번호 확인</span>
                <InputBasic height="1.8461" type='password' width="7.7rem"></InputBasic>
              </EditStudentInfoRow>
            </BasicInfoTable>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <EditBtn>내 정보 수정하기</EditBtn>
          </form>
        </Card>
      </FullPageModal>
    </>
  );
};

export default Mypage;

const TimeTableWrapper = styled.div`
  display: flex;
  column-gap: 1rem;
  height: 2.6667rem;

  font-size: 0.8205rem;
`;
const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin: 0;
  div {
    padding: 0 0.48rem;
    margin: 0;
  }
  hr {
    color: #e7e7e7;
  }
`;

/* 학생정보 카드 */
const StudentInfoRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & span {
    font-weight: bold;
  }
`;

const BasicInfoTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 0.8205rem;
`;

const EditBtn = styled.button`
  width: 100%;
  border-radius: 0.7rem;
  padding: 0.5rem;
  margin-top: 1.7435rem;
  font-size: 0.85rem;
  background-color: #e7e7e7;
`;

/* 출석 입력 카드 */
const Title = styled.h1`
  font-weight: bolder;
  text-align: left;
  width: 100%;
  margin-top: -0.62rem;
`;
const AttendanceCardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.18rem;

  div {
    margin-bottom: 1.846rem;
    h1 {
      font-weight: bolder;
      font-size: 0.8rem;
      margin-bottom: 0.2rem;
    }
    h2 {
      font-size: 0.72rem;
      color: #999999;
    }
  }
`;
