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

import { apiFetch, isAttendee } from '../utils/functions';
import UserPage from '../components/report/UserPage';

export default function ReportUserPage() {
  // select relevant redux state here
  const conference = useSelector(state => state.conference.conference)
  const user = useSelector(state => state.auth.user)


  if (!isAttendee()) {
    return (
      <Page title="Meldeseite" >
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Alert color="danger">Du bist nicht als Teilnehmer für die Konferenz hinterlget.</Alert>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    )
  } else {
    return (
      <Page title="Meldeseite" >
         <UserPage uid={user.uid}></UserPage>
      </Page>
    )
  }
}