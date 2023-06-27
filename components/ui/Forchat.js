import styled from "@emotion/styled";


export const Home = styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    border: 1px solid white;
    border-radius: 10px;
    width: 65%;
    height: 80%;
    display: flex;
    overflow: hidden;
    @include tablet {
    width: 90%;
    }
`;

export const SideBar = styled.div`
    flex: 1;
    background-color: #3e3c61;
    position: relative;
`;

export const Chat = styled.div`
    flex: 2;
`;

export const NavBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #2f2d52;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #ddddf7;
    span {
        font-weight: bold;
        @include tablet {
          display: none;
        }
`;
export const User = styled.div`
    display: flex;
    gap: 10px;

    img {
    background-color: #ddddf7;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    object-fit: cover;
    }
    button {
        background-color: #5d5b8d;
        color: #ddddf7;
        font-size: 10px;
        border: none;
        cursor: pointer;
        @include tablet {
          position: absolute;
          bottom: 10px;
        }
      }
`;

export const SearchUserChat = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;

    &:hover {
    background-color: #2f2d52;
    }
    
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
`;


export const SearchInput = styled.input`
    background-color: transparent;
    border: none;
    color: white;
    outline: none;

    &::placeholder {
    color: lightgray;
    }
`;

export const ChatInfo = styled.div`
    height: 50px;
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;
`;

export const ChatIcons = styled.div`
    display: flex;
    gap: 10px;

    img {
    height: 24px;
    cursor: pointer;
    }
`;

export const MesSages = styled.div`
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 160px);
    overflow: scroll;
`;

export const InpuT = styled.div`
    height: 50px;
    background-color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    input {
        width: 100%;
        border: none;
        outline: none;
        color: #2f2d52;
        font-size: 18px;

        &::placeholder {
          color: lightgray;
        }
      }
`;

export const Send = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    img {
    height: 24px;
    cursor: pointer;
    }

    button {
    border: none;
    padding: 10px 15px;
    color: white;
    background-color: #8da4f1;
    cursor: pointer;
    }
`;

export const MesSage = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
`;

export const MessageInfo  = styled.div`
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;

    img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    }
`;

export const MessageContent   = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
    background-color: white;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
    max-width: max-content;
    }

    img {
    width: 50%;
    }
`;
