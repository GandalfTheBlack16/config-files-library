import path from 'path'
import { google } from 'googleapis'

const SCOPES = [
  'https://www.googleapis.com/auth/drive.metadata'
]
const CREDENTIALS_PATH = path.join(path.resolve(), 'config', 'credentials.json')

const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: SCOPES
})

const googleDriveService = google.drive({
  version: 'v3',
  auth
})

export const checkFolderExists = async ({ folderName }) => {
  const res = await googleDriveService.files.list()
  if (res.statusText !== 'OK') {
    throw new Error('An error ocurred fetching data from Google Drive')
  }
  const { files } = res.data
  return !!files.find(file => file.name === folderName && file.mimeType === 'application/vnd.google-apps.folder')
}

export const downloadFile = async ({ fileId }) => {

}
