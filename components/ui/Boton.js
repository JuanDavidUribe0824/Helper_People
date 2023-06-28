import styled from "@emotion/styled";

const getColor = (props, isHover = false) => {
    const color = props.bgColor;
    if(! color) return isHover ? "current" : "white";
    return color == "red" ? (isHover ? "#FF6340" : "#FF8469") : (isHover ? "#0022A4" :"#2949c6")
};

const Boton = styled.a`
    display: block;
    font-weight: 700;
    text-transform: uppercase;
    border-radius: 30px;
    border: 1px solid #d1d1d1;
    padding: .8rem 2rem;
    margin: 2rem auto;
    text-align: center;
    margin-right: 10px;
    background-color:  ${props => getColor(props)};
    color: ${props => props.bgColor ? 'white' : '#000'};

    &:last-of-type {
        margin-right: 0;
    }

    &:hover {
        cursor: pointer;
        background-color:  ${props => getColor(props, true)};
    }

`;

export default Boton;