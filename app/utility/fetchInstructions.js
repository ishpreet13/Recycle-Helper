import "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

class Instructions {
  constructor(instructionsMap) {
    this.instructionsMap = instructionsMap;
  }
  toString() {
    return this.instructionsMap;
  }
}

const FirestoreDataConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Instructions(data.Instructions);
  },
};

const db = getFirestore();

async function getDocumentFromFirestore(documentId) {
  const docRef = doc(
    db,
    "RecycleInstructionsRuleEngine",
    documentId
  ).withConverter(FirestoreDataConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const instructions = docSnap.data();
    const instrArray = instructions.instructionsMap;
    return instrArray;
  } else {
    console.log("No such document!");
  }
}
export default {
  getDocumentFromFirestore,
};
