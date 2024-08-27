import admin from 'firebase-admin'
import serviceAccount from './backend-empleados-c88f3-firebase-adminsdk-vogex-e4665ad5a2.json' with { type: 'json' }

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
export { db }