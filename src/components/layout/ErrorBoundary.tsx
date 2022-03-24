import { Alert, AlertTitle, Button, Card, Container } from '@mui/material'
import React, { useState } from 'react'
import { ErrorBoundary as Boundary } from 'react-error-boundary'

interface Props {
  children: React.ReactNode
}

interface ErrorState {
  error: Error | null
  componentStack: string
}

export default function ErrorBoundary({ children }: Props) {
  const [errorState, setErrorState] = useState<ErrorState>({ error: null, componentStack: '' })

  const handleError = (error: Error, componentStack: string) => {
    setErrorState({ error, componentStack })
    console.error(error, componentStack)
  }

  return (
    <Boundary
      fallbackRender={() => (
        <Container>
          <Card>
            <Alert severity="error">
              <AlertTitle>Ups... Etwas ist schief gelaufen</AlertTitle>
              Hier muss ein Fehler aufgetreten sein. Bitte versuchen Sie es später noch einmal oder
              kontaktieren Sie uns mit den folgenden Informationen
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {errorState.error && errorState.error.message}
              </pre>
              <Button
                size="small"
                color="inherit"
                variant="outlined"
                onClick={() => console.log('TODO: handle error loggin here')}
              >
                Fehler melden
              </Button>
            </Alert>
          </Card>
        </Container>
      )}
      onError={(error, { componentStack }) => handleError(error, componentStack)}
    >
      {children}
    </Boundary>
  )
}
