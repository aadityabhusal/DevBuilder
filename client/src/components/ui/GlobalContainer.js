import styled from "styled-components";

const Container = styled.div`
  font-family: Verdana, Helvetica, sans-serif;
`;

export function GlobalContainer(props) {
  return <Container> {props.children}</Container>;
}
