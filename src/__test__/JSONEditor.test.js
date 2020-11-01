import React from 'react';
import JSONEditor from '../components/JSONEditor'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

let props;
beforeEach(() => {
    props = {
      value: JSON.stringify({
        key1: "value1",
        key2: "value2",
        key3: "value3",
        key4: "value4",
      }),
      disabled: false,
      onChange: (jsonString) => jsonString,
    };
});

test("Deleting an existing key", () => {
    const expected = JSON.stringify({
      key2: "value2",
      key3: "value3",
      key4: "value4",
    });
    const wrapper = shallow(<JSONEditor {...props} />);
    expect(wrapper.instance().deleteJSONPair("key1")).toEqual(expected)
})

test("Deleting an existing key2", () => {
  const expected = JSON.stringify({
    key1: "value1",
    key3: "value3",
    key4: "value4",
  });
  const wrapper = shallow(<JSONEditor {...props} />);
  expect(wrapper.instance().deleteJSONPair("key2")).toEqual(expected)
})

test("Updating Value", () => {
  const expected = JSON.stringify({
    key1: "value1",
    key2: "value2",
    key3: "updatedValue",
    key4: "value4",
  });
  var event = { currentTarget: { value: "updatedValue"}}
  const wrapper = shallow(<JSONEditor {...props} />);
  expect(wrapper.instance().updateJSONValue(event, "key3")).toEqual(expected)
})

test("Updating Value - Multiple", () => {
  const expected = JSON.stringify({
    key1: "value1",
    key2: "value2",
    key3: "updatedValue",
    key4: "updatedValuex2",
  });
  var event1 = { currentTarget: { value: "updatedValue"}}
  var event2 = { currentTarget: { value: "updatedValuex2"}}
  const wrapper = shallow(<JSONEditor {...props} />);
  wrapper.instance().updateJSONValue(event1, "key3")
  wrapper.instance().updateJSONValue(event1, "key4")
  expect(wrapper.instance().updateJSONValue(event2, "key4")).toEqual(expected)
})

test("Updating Key", () => {
  const expected = JSON.stringify({
    key1: "value1",
    key2: "value2",
    newKey: "value3",
    key4: "value4",
  });
  var event = { currentTarget: { value: "newKey"}}
  const wrapper = shallow(<JSONEditor {...props} />);
  expect(wrapper.instance().updateJSONKey(event, ["key3"])).toEqual(expected)
})


