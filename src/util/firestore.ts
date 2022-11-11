import { getFirestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import serviceAccount from '../../nfc-test-f8445-firebase-adminsdk-sm0ic-4b27ad9870.json';

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
export const db = getFirestore();
