import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPersonFill, BsTrash } from "react-icons/bs";
import useMemberListEffect from "hooks/member/useMemberListEffect";
import media from "lib/styles/media";
import useMemberHandleEffect from "hooks/member/useMemberHandleEffect";
import useModal from "hooks/common/useModal";
import MemberSearchModal from "./MemberSearchModal";
import MeetRequestModal from "./MeetRequestModal";
import { useSetRecoilState } from "recoil";
import { meetState } from "atoms/meetState";

const MembersList = () => {
  const { isModal, onToggleModal } = useModal();
  const { friends } = useMemberListEffect();
  const { onDeleteFriend } = useMemberHandleEffect();

  const [requestUser, setRequestUser] = useState<string>("");
  const setMeetForm = useSetRecoilState(meetState);
  const [isOpen, setIsOpen] = useState(false);
  const onToggleMeetModal = () => {
    setIsOpen(!isOpen);
  };

  const onRequestMeet = (name: string) => {
    setRequestUser(name);
    onToggleMeetModal();
    const nextForm = {
      title: `${requestUser} 1:1 대화`,
      description: `${requestUser}  1:1 대화`,
    };
    setMeetForm((prev) => ({ ...prev, ...nextForm }));
  };

  return (
    <MenberListBlock>
      {friends?.map((friend, index) => (
        <div key={index}>
          <List>
            <ListEle>
              <div className="profile">
                <BsFillPersonFill />
              </div>
              <div className="friendName">{friend.name}</div>
            </ListEle>
            <ListEle>
              <div className="call" onClick={() => onRequestMeet(friend.name)}>
                1:1 채팅신청
              </div>
              <div
                className="delFriend"
                onClick={() => onDeleteFriend(friend._id)}
              >
                <BsTrash size="22" />
              </div>
            </ListEle>
          </List>
        </div>
      ))}
      <List>
        <ListEle onClick={onToggleModal}>
          <div className="emptyProfile"></div>
          <div className="addName">Add New</div>
        </ListEle>
      </List>

      {isModal && (
        <MemberSearchModal isModal={isModal} onToggleModal={onToggleModal} />
      )}

      {isOpen && (
        <MeetRequestModal
          isModal={isOpen}
          onToggleModal={onToggleMeetModal}
          name={requestUser}
        />
      )}
    </MenberListBlock>
  );
};

const MenberListBlock = styled.div``;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  &:hover {
    background-color: rgb(240, 245, 249);
    .delFriend {
      color: rgb(142, 155, 164);
    }
  }
`;

const ListEle = styled.div`
  display: flex;
  align-items: center;
  .profile {
    width: 30px;
    height: 30px;
    background-color: #eeeeee;
    border-radius: 100%;
    text-align: center;
    margin: 0px 15px;
    line-height: 30px;
  }
  .friendName {
    font-weight: bold;
  }
  .addName {
    color: rgb(116, 144, 167);
  }
  .emptyProfile {
    cursor: pointer;
    border: 1px dashed #d5d3d3;
    width: 35px;
    height: 35px;
    margin: 0px 15px;
    border-radius: 100%;
    margin-right: 15px;
  }
  .call {
    width: 7em;
    height: 2rem;
    text-align: center;
    line-height: 2rem;
    background-color: rgb(230, 248, 240);
    color: rgb(74, 155, 124);
    border-radius: 18px;
    margin-right: 45px;
    cursor: pointer;
  }
  .delFriend {
    color: white;
    margin-right: 25px;
    cursor: pointer;
  }

  ${media.small} {
    .call {
      font-size: 13px;
    }
    .friendName {
      font-size: 13px;
    }
    .delFriend {
      color: rgb(142, 155, 164);
    }
  }
`;
export default MembersList;
