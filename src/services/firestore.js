import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase";

/* ===========================
   USERS
=========================== */

export async function getUser(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/* ===========================
   TURFS
=========================== */

export async function addTurf(turf) {
  try {
    const docRef = await addDoc(collection(db, "turfs"), {
      ...turf,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Turf saved:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Firestore addTurf error:", error);
    throw error;
  }
}

export async function updateTurf(id, data) {
  try {
    await updateDoc(doc(db, "turfs", id), {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Firestore updateTurf error:", error);
    throw error;
  }
}

export async function deleteTurf(id) {
  try {
    await deleteDoc(doc(db, "turfs", id));
  } catch (error) {
    console.error("Firestore deleteTurf error:", error);
    throw error;
  }
}

export async function getAllTurfs() {
  try {
    const q = query(collection(db, "turfs"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getAllTurfs error:", error);
    throw error;
  }
}

export async function getTurfsByCity(city) {
  try {
    const q = query(collection(db, "turfs"), where("city", "==", city));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getTurfsByCity error:", error);
    throw error;
  }
}

export function listenOwnerTurfs(ownerId, callback) {
  const q = query(
  collection(db, "turfs"),
  where("ownerId", "==", ownerId)
);

  return onSnapshot(
    q,
    (snapshot) => {
      const turfs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Owner Turfs:", turfs);
      callback(turfs);
    },
    (error) => {
      console.error("listenOwnerTurfs error:", error);
      callback([]);
    }
  );
}
export function listenTurfs(callback) {
  const q = query(
    collection(db, "turfs"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    },
    (error) => {
      console.error(error);
      callback([]);
    }
  );
}

/* ===========================
   BOOKINGS
=========================== */

export async function createBooking(booking) {
  try {
    return await addDoc(collection(db, "bookings"), {
      ...booking,
      status: "Pending",
      paymentStatus: "Pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Firestore createBooking error:", error);
    throw error;
  }
}
export async function createOfflineBooking(booking) {
  try {
    const bookingId = `BK-${Date.now()}`;

    const docRef = await addDoc(collection(db, "bookings"), {
      bookingId,
      ownerId: booking.ownerId,
      turfId: booking.turfId || "",
      turfName: booking.turfName,
      turfImage: booking.turfImage || "",
      sportName: booking.sportName || "",
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      players: Number(booking.players || 0),
      bookingDate: booking.bookingDate,
      slot: booking.slot,
      price: Number(booking.price),
      bookingType: "Offline",
      paymentStatus: "Paid",
      status: "Confirmed",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Firestore createOfflineBooking error:", error);
    throw error;
  }
}
export async function updateBooking(id, data) {
  try {
    await updateDoc(doc(db, "bookings", id), {
      ...data,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Firestore updateBooking error:", error);
    throw error;
  }
}

export async function updateBookingStatus(id, status) {
  try {
    await updateDoc(doc(db, "bookings", id), {
      status,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Firestore updateBookingStatus error:", error);
    throw error;
  }
}

export async function getUserBookings(userId) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getUserBookings error:", error);
    throw error;
  }
}

export async function getOwnerBookings(ownerId) {
  try {
    const q = query(
      collection(db, "bookings"),
      where("ownerId", "==", ownerId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getOwnerBookings error:", error);
    throw error;
  }
}

export function listenOwnerBookings(ownerId, callback) {
  const q = query(collection(db, "bookings"));

  return onSnapshot(
    q,
    (snapshot) => {
      const bookings = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((booking) => booking.ownerId === ownerId)
        .sort((a, b) => {
          const aTime = a.createdAt?.seconds || 0;
          const bTime = b.createdAt?.seconds || 0;
          return bTime - aTime;
        });

      callback(bookings);
    },
    (error) => {
      console.error("listenOwnerBookings error:", error);
      callback([]);
    }
  );
}
export function listenUserBookings(userId, callback) {
  const q = query(
    collection(db, "bookings"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    (error) => {
      console.error("listenUserBookings error:", error);
    }
  );
}

/* ===========================
   EARNINGS
=========================== */

export async function addEarning(data) {
  try {
    return await addDoc(collection(db, "earnings"), {
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Firestore addEarning error:", error);
    throw error;
  }
}

export async function getOwnerEarnings(ownerId) {
  try {
    const bookings = await getOwnerBookings(ownerId);
    const confirmed = bookings.filter(
      (b) => b.status === "Confirmed" || b.status === "Completed"
    );
    return confirmed.reduce((sum, b) => sum + Number(b.price || 0), 0);
  } catch (error) {
    console.error("Firestore getOwnerEarnings error:", error);
    return 0;
  }
}

/* ===========================
   REVIEWS
=========================== */

export async function addReview(review) {
  try {
    return await addDoc(collection(db, "reviews"), {
      ...review,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Firestore addReview error:", error);
    throw error;
  }
}

export async function getTurfReviews(turfId) {
  try {
    const q = query(collection(db, "reviews"), where("turfId", "==", turfId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getTurfReviews error:", error);
    throw error;
  }
}

/* ===========================
   NOTIFICATIONS
=========================== */

export async function addNotification(notification) {
  try {
    return await addDoc(collection(db, "notifications"), {
      ...notification,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Firestore addNotification error:", error);
    throw error;
  }
}

export async function getNotifications(uid) {
  try {
    const q = query(collection(db, "notifications"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Firestore getNotifications error:", error);
    throw error;
  }
}

export function listenNotifications(uid, callback) {
  const q = query(
    collection(db, "notifications"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    },
    (error) => {
      console.error("listenNotifications error:", error);
    }
  );
}
/* ===========================
   INQUIRIES
=========================== */

export async function addInquiry(inquiry) {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      message: inquiry.message,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Firestore addInquiry error:", error);
    throw error;
  }
}