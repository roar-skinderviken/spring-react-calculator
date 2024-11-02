import {NextAuthOptions} from "next-auth"
import "next-auth/jwt"
import {Provider} from "next-auth/providers/index"
import GitHubProvider, {GithubProfile} from "next-auth/providers/github"

const springBootProvider: Provider = {
    id: "next-app-client",
    name: "Vicx OAuth",
    clientId: "next-app-client",
    clientSecret: process.env.OIDC_CLIENT_SECRET || "secret",
    version: "2.0",
    type: "oauth",
    checks: ["pkce", "state"],
    idToken: true,
    authorization: {
        url: process.env.AUTHORIZATION_URL || "http://localhost:9000/oauth2/authorize",
        params: {scope: "openid"}
    },
    token: process.env.TOKEN_URL || "http://localhost:9000/oauth2/token",
    issuer: process.env.ISSUER || "http://localhost:9000",
    jwks_endpoint: process.env.JWKS_ENDPOINT || "http://localhost:9000/oauth2/jwks",

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    profile: (profile: any) => {
        return {
            id: profile.sub,
            name: profile.sub,
        }
    }
}

const providers = [springBootProvider]
if (process.env.GITHUB_ID) {
    providers.unshift(
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
            profile(profile: GithubProfile) {
                return {
                    id: profile.id.toString(),
                    name: profile.name,
                    userName: profile.login,
                    email: profile.email,
                    image: profile.avatar_url,
                }
            }
        })
    )
}

interface DefaultUser {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
    userName?: string | null
}

const authOptions = {
    providers: providers,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({token, account, user}) {
            if (account) {
                token.accessToken = account.access_token

                // login event
                if (user) {
                    return {...token, user}
                }
            }
            return token
        },

        async session({session, token}) {
            session.user = {...session.user, ...(token.user ?? {})}

            const sessionUser: DefaultUser = session.user
            if (!sessionUser.name) sessionUser.name = sessionUser.userName || sessionUser.id

            return session
        }
    }
} satisfies NextAuthOptions

export {authOptions}