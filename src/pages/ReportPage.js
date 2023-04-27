import Page from 'components/Page';
import React, {  } from 'react';
import { useSelector } from "react-redux";

import UserPage from '../components/report/UserPage';

export default function ReportUserPage() {
  // select relevant redux state here
  //const conference = useSelector(state => state.conference.conference)
  const user = useSelector(state => state.auth.user)


  // if (!isAttendee()) {
  //   return (
  //     <Page title="Redeliste" >
  //       <Row>
  //         <Col>
  //           <Card>
  //             <CardBody>
  //               <Alert color="danger">Du bist nicht als Teilnehmer für die Konferenz hinterlget.</Alert>
  //             </CardBody>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Page>
  //   )
  // } else {
    return (
      <Page title="Redeliste" >
         <UserPage uid={user.uid}></UserPage>
      </Page>
    )
  //}
}