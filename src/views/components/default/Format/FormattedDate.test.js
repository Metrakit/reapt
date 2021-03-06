import React from "react";
import { render } from "enzyme";
import dayjs from "dayjs";

import FormattedDate from "./FormattedDate";

describe("Test FormattedDate Component", () => {
    it("Should render date with format 'DD MMM YYYY'", () => {
        const date = dayjs("2018-08-08");
        const wrapper = render(<FormattedDate value={date} />);
        expect(wrapper.text()).toBe("08 August 2018");
    });
});
