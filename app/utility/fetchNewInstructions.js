import "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

class Instructions {
  constructor(instructionsMap, link) {
    this.instructionsMap = instructionsMap;
    this.link = link;
  }
  toString() {
    return this.instructionsMap + ", " + this.link;
  }
}

const FirestoreDataConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Instructions(data.Instructions, data.Link);
  },
};

const db = getFirestore();

async function getDocumentFromFirestore(documentId) {
  const docRef = doc(
    db,
    "RecycleInstructionsRuleEngine_v2",
    documentId
  ).withConverter(FirestoreDataConverter);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const instructions = docSnap.data();
    const instrArray = instructions.instructionsMap;
    return instructions;
  } else {
    console.log("No such document!");
  }
}
export default {
  getDocumentFromFirestore,
};
