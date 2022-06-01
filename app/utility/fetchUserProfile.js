import "firebase/firestore";
import { getFirestore, doc, getDoc } from "firebase/firestore";

class User {
  constructor(name, email, recycleActivity, userImage, goal) {
    this.name = name;
    this.email = email;
    this.recycleActivity = recycleActivity;
    this.userImage = userImage;
    this.goal = goal;
  }
  toString() {
    return (
      this.name +
      ", " +
      this.email +
      ", " +
      this.recycleActivity +
      ", " +
      this.userImage +
      ", " +
      this.goal
    );
  }
}

const FirestoreDataConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(
      data.name,
      data.email,
      data.recycleActivity,
      data.userImage,
      data.goal
    );
  },
};

const db = getFirestore();

async function getDocumentFromFirestore(UserUID) {
  const docRef = doc(db, "UserInfo", UserUID).withConverter(
    FirestoreDataConverter
  );
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const currentUser = docSnap.data();
    return currentUser;
  } else {
    console.log("No such document!");
  }
}
export default {
  getDocumentFromFirestore,
};
