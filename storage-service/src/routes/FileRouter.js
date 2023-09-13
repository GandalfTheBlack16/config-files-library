import { Router } from 'express'
import { downloadFile, cleanTempFile } from '../services/StorageService.js'

const fileRouter = Router()

fileRouter.get('/', async (req, res) => {
  const { id: fileId, name: fileName } = req.query
  if (!fileId || !fileName) {
    const errorMsg = 'File fetching error: Query params not provided'
    console.error(errorMsg)
    return res.status(400).json({
      status: 'KO',
      message: errorMsg
    })
  }
  try {
    const { filePath, mimeType } = await downloadFile({ fileId, fileName })
    res.set('Content-Type', mimeType)
    res.status(200).download(filePath)
    await cleanTempFile({ filePath })
  } catch (error) {
    console.error(error)
  }
})

export { fileRouter }
