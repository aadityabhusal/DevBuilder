import styled from "styled-components";

const Container = styled.div`
  font-family: Georgia, sans-serif;
`;

export function GlobalContainer(props) {
  return <Container> {props.children}</Container>;
}
