/**
 * Server-side Firebase ID token verification.
 * Uses Firebase's public REST endpoint — no Admin SDK required.
 * Returns the decoded uid on success, null on failure.
 */

interface FirebaseTokenPayload {
  uid: string;
  sub: string;
  email?: string;
  name?: string;
  picture?: string;
  exp: number;
  aud: string;
}

export async function verifyFirebaseToken(
  idToken: string
): Promise<{ uid: string; email?: string } | null> {
  try {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    if (!projectId) {
      console.error("NEXT_PUBLIC_FIREBASE_PROJECT_ID not set");
      return null;
    }

    // Firebase token verification endpoint
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const users = data.users as Array<{ localId: string; email?: string }>;

    if (!users || users.length === 0) return null;

    return { uid: users[0].localId, email: users[0].email };
  } catch {
    return null;
  }
}

/**
 * Extract and verify Firebase Bearer token from request headers.
 * Returns { uid, email } or null.
 */
export async function authenticateFirebaseRequest(
  request: Request
): Promise<{ uid: string; email?: string } | null> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.slice(7).trim();
  if (!token) return null;

  return verifyFirebaseToken(token);
}
