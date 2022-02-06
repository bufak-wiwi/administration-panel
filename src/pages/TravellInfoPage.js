import Page from 'components/Page';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Row,
  Col,
  Alert,
} from 'reactstrap'
import { useSelector } from "react-redux";
import { CircularProgress } from '@material-ui/core';
import DetailsHeader from '../components/DetailsHeader';
import DetailsBody from '../components/DetailsBody';
import { apiFetch, isAttendee } from '../utils/functions';

export default function TravelInformationPage() {
  // select relevant redux state here
  const conference = useSelector(state => state.conference.conference)
  const user = useSelector(state => state.auth.user)

  // you can use 'const dispatch = useDispatch()' to later call existing redux functions like "dispatch({ type: ConferenceTypes.GET_CONFERENCE })"
  // or just call async functions inside this component

  const [editing, setEditing] = useState(false)
  const [travelProperties, setTravelproperties] = useState([])
  const [data, setData] = useState({
    transportation: "",
    parkingSpace: false,
    arrivalPlace: "",
    arrivalTimestamp: "",
    departureTimestamp: "",
    extraNote: "",
    loading: true,
    empty: true
  })



  useEffect(() => {
    async function fetchData() {
      const result = await apiFetch(`travel/peruser/${user.uid}`, 'GET')
      if (result) {
        const { arrivalPlace, arrivalTimestamp, departureTimestamp, extraNote, transportation, parkingSpace } = result
        setData({
          arrivalPlace,
          arrivalTimestamp,
          departureTimestamp,
          extraNote,
          transportation,
          parkingSpace,
          loading: false,
          empty: false,
        })
      } else {
        setData({
          ...data,
          arrivalTimestamp: conference.dateStart + "T10:00",
          departureTimestamp: conference.dateEnd + "T17:00",
          loading: false,
          empty: true
        })
        setEditing(true)
      }
    }

    // wait for conference data
    if (conference && conference.conferenceID) {
      setTravelproperties([
        {
          name: "Anreiseort*", type: 'select', id: 'arrivalPlace', xs: 12, md: 6, options: [
            { value: "", name: "Anreiseort auswählen", disabled: true },
            ...(conference.travelArrivalPlaces || "").split(",").map(option => ({ value: option, name: option }))
          ]
        },
        { name: "Reiseart", type: 'text', id: 'transportation', xs: 12, md: 6 },
        {
          name: "Braucht ihr einen Parkplatz", type: 'select', id: 'parkingSpace', xs: 12, md: 6, options: [
            { value: false, name: "Nein" },
            { value: true, name: "Ja" },
          ]
        },
        { name: "Vor. Ankunftszeit", type: 'datetime-local', id: 'arrivalTimestamp', xs: 12, md: 6 },
        { name: "Vor. Abfahrtszeit", type: 'datetime-local', id: 'departureTimestamp', xs: 12, md: 6 },
        { name: "Sonstige Anmerkungen", type: 'textarea', id: 'extraNote', lg: 12, xs: 12 },
      ])
      fetchData()
    }
  }, [conference])


  const isValid = () => data.transportation && data.arrivalTimestamp && data.departureTimestamp && data.arrivalPlace

  const onCreate = async () => {
    setData({ ...data, loading: true, empty: false })
    const result = await apiFetch('Travel/Suggestion', 'POST', {
      ...data,
      conferenceID: conference.conferenceID,
      uid: user.uid
    })

    if (result) {
      setEditing(false)
      setData({ ...data, loading: false })
    } else {
      alert("Hier hat etwas nicht funktioniert... Versuche es später noch einmal")
      setData({ ...data, loading: false, empty: true })
    }
  }

  const onSave = async () => {
    alert("Call update endpoint here")
  }

  if (!isAttendee()) {
    return (
      <Page title="Reiseinformationen" >
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Alert color="danger">Die Reiseinformationen können erst eingetragen werden, wenn deine Anmeldung durch den Ausrichter angenommen wurde.</Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  } else {

    return (
      <Page title="Reiseinformationen" >
        <Card>
          {data.loading && <CircularProgress />}
          {!data.loading &&
            <div>
              <DetailsHeader
                title="Informationen zur Anreise"
                empty={data.empty}
                editing={editing}
                disabled={!isValid()}
                onSave={onSave}
                onCreate={onCreate}
                onEdit={() => setEditing(true)}
                onCancel={() => setEditing(false)}
              />
              <DetailsBody
                disabled={!editing}
                object={data}
                onChange={(id, value) => setData({ ...data, [id]: value })}
                properties={travelProperties}
              />
            </div>
          }
        </Card>
      </Page>
    )
  }
}