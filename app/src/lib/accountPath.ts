// Where the person icon goes. supabase-js keeps the session in localStorage under
// sb-<project-ref>-auth-token, so we can check it without loading the Supabase client on every page.
const ref = import.meta.env.VITE_SUPABASE_URL?.split('//')[1]?.split('.')[0]

export function accountPath() {
  try {
    return ref && localStorage.getItem(`sb-${ref}-auth-token`) ? '/profile' : '/signup'
  } catch {
    return '/signup'
  }
}
