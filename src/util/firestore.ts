import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from '../../nfc-test-f8445-firebase-adminsdk-sm0ic-4b27ad9870.json';

initializeApp({ credential: cert(serviceAccount) });
export const db = getFirestore();
