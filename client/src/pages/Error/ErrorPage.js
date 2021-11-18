import React from "react";
import { ErrorContainer } from "../../components/common/Error";

export function ErrorPage() {
  document.title = "Error 404 | DevBuilder";

  return <ErrorContainer>Error 404 - Page Not Found</ErrorContainer>;
}
