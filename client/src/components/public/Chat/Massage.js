import styled from "styled-components";

const StyledMassage = styled.li`
  margin: 0px 0px 10px 0px;

  span {
    font-size : 12px;
    font-weight: 300;
    display: inline-block;
    margin: 0px;
    background-color: gray;
    border-radius: 5px;
    padding: 10px;
  }

  span:last-child {
    margin 0px important;
  }

  p {
    margin : 0px;
    font-size : 11px;
    font-weight: 300;
  }
`;

const Massage = ({ data }) => {
  const user = 0;
  return (
    <StyledMassage className={user === data.send ? "send" : "to"}>
      <span>{data.massage}</span>
      <p>{data.time.split("-")[3]}</p>
    </StyledMassage>
  );
};

export default Massage;
