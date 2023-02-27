import { render, screen } from "@testing-library/react";
import React from "react";
import Champions from "../Champions";

describe("Header quotes", () => {
  it("should render the header quote", () => {
    render(
        <Champions />
    );
    const quote = screen.getByText(/-krotni mistrzowie/i);
    expect(quote).toBeInTheDocument();
  });
});
