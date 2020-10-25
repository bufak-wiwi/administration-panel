import { sortedConferenceList } from '../redux/conferenceRedux.js'

const today = {dateStart: new Date().toISOString().split('T')[0], dateEnd: new Date().toISOString().split('T')[0]}
const past = {dateStart: "2000-02-20", dateEnd: "2000-02-23"}
const future = {dateStart: "2100-11-20", dateEnd: "2100-11-23"}
const current =  {dateStart: "2020-10-20", dateEnd: "2099-12-31"}


test("Test sorted ConferenceList 1", () => {
    var expected = [past, future, current]
    var list = [current, future, past]
    expect(sortedConferenceList(list)).toEqual(expected)
})

test("Test sorted ConferenceList 2", () => {
    var expected = [past, future, current]
    var list = [future, current, past]
    expect(sortedConferenceList(list)).toEqual(expected)
})

test("Test sorted ConferenceList 3", () => {
    var expected = [past, future, current]
    var list = [past, future, current]
    expect(sortedConferenceList(list)).toEqual(expected)
})

test("Test sorted ConferenceList (today)", () => {
    var expected = [past, future, today]
    var list = [future, today, past]
    expect(sortedConferenceList(list)).toEqual(expected)
})