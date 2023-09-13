import path from 'path'
import { google } from 'googleapis'

const SCOPES = [
  'https://www.googleapis.com/auth/drive'
]
const CREDENTIALS_PATH = path.join('src', 'config', 'credentials.json')

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES
})

export const googleDriveService = google.drive({
  version: 'v3',
  auth
})
