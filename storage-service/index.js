import { checkFolderExists } from './src/services/GoogleDriveStorageService.js'

console.log(await checkFolderExists({ folderName: 'test' }))
