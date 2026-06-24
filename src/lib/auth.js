export const OWNER_CREDENTIALS = {
  email: 'owner@bookmyturf.com',
  password: 'Owner@123',
}

const USERS_KEY = 'bookmyturf_users'
const SESSION_KEY = 'bookmyturf_session'

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function getUsers() {
  return safeParse(localStorage.getItem(USERS_KEY), [])
}

export function registerUser({ name, email, password }) {
  const users = getUsers()
  const normalizedEmail = email.trim().toLowerCase()

  if (users.some((user) => user.email === normalizedEmail)) {
    return { ok: false, message: 'Account already exists. Please login.' }
  }

  const newUser = {
    id: crypto.randomUUID?.() || String(Date.now()),
    name: name.trim(),
    email: normalizedEmail,
    password,
    role: 'user',
  }

  localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]))
  return { ok: true }
}

export function findUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  return getUsers().find(
    (user) => user.email === normalizedEmail && user.password === password,
  )
}

export function isOwnerLogin(email, password) {
  return (
    email.trim().toLowerCase() === OWNER_CREDENTIALS.email &&
    password === OWNER_CREDENTIALS.password
  )
}

export function createSession(user) {
  const session = {
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

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}