import path from 'path'
import { appendFile, rm } from 'node:fs/promises'
import { googleDriveService } from '../providers/GoogleDriveServiceProvider.js'

const TEMP_PATH = path.join('temp')

export const checkFolderExists = async ({ folderName }) => {
  const res = await googleDriveService.files.list()
  if (res.statusText !== 'OK') {
    throw new Error('An error ocurred fetching data from Google Drive')
  }
  const { files } = res.data
  return !!files.find(file => file.name === folderName && file.mimeType === 'application/vnd.google-apps.folder')
}

export const downloadFile = async ({ fileId, fileName }) => {
  try {
    const res = await googleDriveService.files.get({
      fileId,
      alt: 'media'
    })
    if (res.statusText !== 'OK') {
      throw new Error('An error ocurred fetching file from Google Drive')
    }
    const { data, headers } = res
    const filePath = path.join(path.resolve(), TEMP_PATH, fileName)
    await appendFile(filePath, data)
    return {
      filePath,
      mimeType: headers['content-type']
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const cleanTempFile = async ({ filePath }) => {
  try {
    await rm(filePath)
  } catch (error) {
    console.error(error)
  }
}
