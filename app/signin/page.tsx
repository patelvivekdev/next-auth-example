import { signIn, providerMap } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default async function SignInPage() {
  return (
    <div className="flex flex-col gap-2">
      {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            "use server"
            await signIn(provider.id)
          }}
        >
          <Button type="submit">
            <span>Sign in with {provider.name}</span>
          </Button>
        </form>
      ))}
    </div>
  )
}