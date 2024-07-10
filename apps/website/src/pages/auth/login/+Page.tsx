import { useAuth } from '#root/hooks/useAuth'
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
  const { providers, signinThirdParty } = useAuth()

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardBody>
        <ButtonGroup>
          {providers.map((provider) => (
            <Button
              color="primary"
              variant="ghost"
              size='lg'
              key={provider.name}
              onClick={() => {
                signinThirdParty(provider.id)
              }}
            >
              <img src={getProviderIcon(provider.id)} className="w-8 h-8 p-1 mr-2 rounded bg-white" />
              Log in with {provider.name}
            </Button>
          ))}
        </ButtonGroup>
      </CardBody>
    </Card>
  )
}
