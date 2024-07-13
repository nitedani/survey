import { useSupabase } from '#root/hooks/useSupabase'
import { Button, ButtonGroup, Card, CardBody } from '@nextui-org/react'

function getProviderIcon(id: string) {
  switch (id) {
    case 'google':
      return '/google.svg'
    default:
      return ''
  }
}

export default function Page() {
  const { login } = useSupabase()

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardBody>
        <ButtonGroup>
          <Button
            color="primary"
            variant="ghost"
            size="lg"
            key={'google'}
            onClick={() => {
              login()
            }}
          >
            <img src={getProviderIcon('google')} className="w-8 h-8 p-1 mr-2 rounded bg-white" />
            Sign up with Google
          </Button>
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}
