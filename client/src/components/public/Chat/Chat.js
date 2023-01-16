import { useState } from "react";
import styled from "styled-components";
import Input from "../Input";
import ChatRooms from "./ChatRooms";
import Chatting from "./Chatting";
import Friends from "./Friends";
import { chatLogData } from "../../../assets/dummyData/chatLogData";
import { friendsData } from "../../../assets/dummyData/friendsData";

const StyledChat = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 100%;
  padding: 21px 20px 0px 20px;
  gap: 20px;

  > p {
    font-size: 18px;
    font-weight: 600;
    margin: 0px;
  }

  > p::before {
    content: "";
    display: block;
    width: 400px;
    margin: 0px 0px 20px -20px;
    border-top: 1px solid #dbdbdb;
  }

  > .chat-area::before {
    content: "";
    display: block;
    width: 400px;
    margin: 0px 0px 20px -20px;
    border-top: 1px solid #dbdbdb;
  }
`;

const Chat = () => {
  const [curChat, setCurChat] = useState(null);
  const [chatLog, setChatLog] = useState(chatLogData);
  const [freinds, setFreinds] = useState(friendsData);

  const handleCurChat = (value) => {
    setCurChat(value);
  };

  return (  
    <>
      <StyledChat>
        <Input label={"채팅"} />
        {curChat ? (
          <>
            <Chatting
              handleCurChat={handleCurChat}
              curChat={curChat}
              chatLog={chatLog}
            />
            <ChatRooms
              handleCurChat={handleCurChat}
              chatLog={chatLog}
              freinds={freinds}
            />
          </>
        ) : (
          <>
            <ChatRooms
              handleCurChat={handleCurChat}
              chatLog={chatLog}
              freinds={freinds}
            />
            <Friends handleCurChat={handleCurChat} freinds={freinds} />
          </>
        )}
      </StyledChat>
    </>
  );
};

export default Chat;