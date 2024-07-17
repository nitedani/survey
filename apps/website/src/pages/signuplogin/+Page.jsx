import { useSupabase } from '#root/hooks/useSupabase'
import { Button, ButtonGroup, Card, CardBody } from '@nextui-org/react'

export default function Page() {
  const { login } = useSupabase()

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardBody>
        <ButtonGroup>
          <Button
            color="primary"
            size="lg"
            key={'google'}
            onClick={() => {
              login()
            }}
          >
            Sign up
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}
