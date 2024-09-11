import "react-native";
import React from "react";
import index from "../app/index";
import renderer from "react-test-renderer";

test("test render snapshot", () => {
  const snapshot = renderer.create(<index />).toJSON();
  expect(snapshot).toMatchSnapshot();
});
