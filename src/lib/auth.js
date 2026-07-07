import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'

// CHANGE THIS LINE
import { auth, db } from '../firebase'

export const OWNER_CREDENTIALS = {
  uid: 'owner-bookmyturf',
  email: 'owner@bookmyturf.com',
  password: 'Owner@123',
}

const SESSION_KEY = 'bookmyturf_session'

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function firebaseErrorMessage(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Account already exists. Please login.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.'
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Invalid credentials. Please register first or check your password.'
    default:
      return error.message || 'Something went wrong. Please try again.'
  }
}

export async function registerUser({ name, email, password }) {
  try {
    const normalizedEmail = email.trim().toLowerCase()

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    )

    const userProfile = {
      uid: userCredential.user.uid,
      name: name.trim(),
      email: normalizedEmail,
      role: 'user',
      createdAt: serverTimestamp(),
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile)

    return { ok: true }
  } catch (error) {
    console.error('Firebase Error:', error)
    console.error('Code:', error.code)
    console.error('Message:', error.message)

    return {
      ok: false,
      message: firebaseErrorMessage(error),
    }
  }
}

export async function findUser(email, password) {
  try {
    const normalizedEmail = email.trim().toLowerCase()

    const userCredential = await signInWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    )

    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid))

    if (userDoc.exists()) {
      return userDoc.data()
    }

    return {
      uid: userCredential.user.uid,
      name: userCredential.user.displayName || 'Player',
      email: normalizedEmail,
      role: 'user',
    }
  } catch (error) {
    console.error('Firebase Error:', error)
    console.error('Code:', error.code)
    console.error('Message:', error.message)

    return null
  }
}

export function isOwnerLogin(email, password) {
  return (
    email.trim().toLowerCase() === OWNER_CREDENTIALS.email &&
    password === OWNER_CREDENTIALS.password
  )
}

export function createSession(user) {
  const session = {
    uid: user.uid || '',
    name: user.name,
    email: user.email,
    role: user.role,
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function getSession() {
  return safeParse(localStorage.getItem(SESSION_KEY), null)
}

export async function clearSession() {
  localStorage.removeItem(SESSION_KEY)

  if (auth.currentUser) {
    await signOut(auth)
  }
}